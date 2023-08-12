import {useModel} from '@umijs/max';
import {Badge, Tag} from "antd";

const XinDict = (props: { value: any, dict: string }) => {
  const { value, dict } = props

  const { getDictionaryData } = useModel('global');
  const dictData = getDictionaryData(dict)

  const dictItem = dictData!.filter(d=>d.value ===value)[0]

  if(dictItem.type === 'badge'){
    return <Badge status={dictItem.status} text={dictItem.label} />
  }
  if(dictItem.type === 'tag'){
    return <Tag color={dictItem.status}>{dictItem.label}</Tag>
  }
  return <>{dictItem.label}</>
}

export default XinDict