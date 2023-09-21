import {useModel} from '@umijs/max';
import {Badge, Tag} from "antd";
import {useEffect, useState} from "react";

interface DictItem {
  label:string
  value: string
  type?: 'badge' | 'tag'
  status?: 'success' | 'error' | 'default' | 'processing' | 'warning'
}

const XinDict = (props: { value: any, dict: string }) => {
  const { value, dict } = props

  const { getDictionaryData } = useModel('dictModel');
  const dictData: DictItem[] = getDictionaryData(dict)
  const [dictItem,setDictItem] = useState<DictItem>()
  useEffect(()=>{
    if(dictData){
      setDictItem(dictData.filter(d=>d.value ===value)[0])
    }
  },[dict,value])


  if(!dictItem || !dictItem.type || !dictItem.label){
    return <>null</>
  }


  if(dictItem.type === 'badge'){
    return <Badge status={dictItem.status} text={dictItem.label} />
  }
  if(dictItem.type === 'tag'){
    return <Tag color={dictItem.status}>{dictItem.label}</Tag>
  }
  return <>{dictItem.label}</>
}

export default XinDict