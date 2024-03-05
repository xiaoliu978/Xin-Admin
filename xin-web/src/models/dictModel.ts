// 全局共享数据示例
import { gitDict } from '@/services/admin/system';
import { useRequest } from 'ahooks';

interface DictItem {
  label: string;
  value: string;
  type?: 'badge' | 'tag';
  status?: 'success' | 'error' | 'default' | 'processing' | 'warning';
}

interface DictDate {
  code: string;
  name: string
  type?: number
  dictItems: DictItem[]
}

const useDict = () => {

  /**
   * 格式化字典
   * @param data
   */
  const setDictJson = (data: DictDate[]): Map<string, DictItem[]> => {
    let dictMap: Map<string, DictItem[]> = new Map();
    data.forEach((dict: DictDate) => {
      dictMap.set(dict.code, dict.dictItems.map(a => Object.assign(a, { type: dict.type })));
    });
    return dictMap;
  }

  const { data: dictionaryCache, refresh: refreshDict, refreshAsync: refreshDictAsync } = useRequest(async () => {
    let token = localStorage.getItem('token');
    if (token) {
      if (localStorage.getItem('dictMap')) {
        console.log('-------获取字典缓存--------');
        return setDictJson(JSON.parse(localStorage.getItem('dictMap')!));
      } else {
        let { data } = await gitDict();
        localStorage.setItem('dictMap', JSON.stringify(data));
        return setDictJson(data);
      }
    }
    return setDictJson([]);
  });

  /**
   * 通过键值获取字典
   * @param key
   */
  const getDictionaryData = async (key: string): Promise<DictItem[]> => {
    if (!dictionaryCache) {
      let res = await refreshDictAsync();
      return res.has(key) ? res.get(key)! : [];
    }
    return dictionaryCache.has(key) ? dictionaryCache.get(key)! : [];
  };

  return {
    refreshDict,
    getDictionaryData
  };
};

export default useDict;
