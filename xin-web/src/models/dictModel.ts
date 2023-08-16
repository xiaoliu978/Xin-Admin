// 全局共享数据示例
import {useMemo, useState} from 'react';
import {gitDict} from "@/services/system";
import {useBoolean} from "ahooks";

interface DictItem {
  label:string
  value: string
  type?: 'badge' | 'tag'
  status?: 'success' | 'error' | 'default' | 'processing' | 'warning'
}

interface DictDate {
  code: string
  name: string
  type?: number
  dictItems: DictItem[]
}

const useUser = () => {

  const [dictionaryCache , setDictionaryCache ] = useState<Map<string,DictItem[]>>(new Map())
  const [cache,refreshCache ] = useBoolean();
  /**
   * 格式化字典
   * @param data
   */
  const setDictJson = (data: DictDate[]): Map<string,DictItem[]> => {
    let dictMap: Map<string,DictItem[]>= new Map()
    data.forEach((dict: DictDate) =>{
      dictMap.set(dict.code,dict.dictItems.map(a=>Object.assign(a,{type:dict.type})))
    })
    return dictMap
  }

  /**
   * 通过键值获取字典
   * @param key
   */
  const getDictionaryData = (key:string): DictItem[] => {
    if(!dictionaryCache.size && localStorage.getItem('dictMap')){
      console.log('-------获取字典缓存--------')
      setDictionaryCache(setDictJson(JSON.parse(localStorage.getItem('dictMap')!)))
    }
    return dictionaryCache.has(key)?dictionaryCache.get(key)!:[]
  }

  useMemo (()=>{
    let token = localStorage.getItem('token');
    if (token) {
      gitDict().then(res=>{
        let { success, data } = res
        if(success){
          localStorage.setItem('dictMap',JSON.stringify(data))
          setDictionaryCache(setDictJson(data))
        }
      })
    }
  },[cache])

  return {
    getDictionaryData,
    refreshCache
  };
};

export default useUser;
