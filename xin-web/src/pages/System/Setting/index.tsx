import React, {useEffect, useState} from "react";
import {Button, Divider, Form, Input, TabsProps} from "antd";
import {gitSetting} from "@/services/system";


const onFinish = () => {

}

const buildTabs = (data: any[]): TabsProps['items'] => {
  let setting: TabsProps['items'] = [];
  console.log(data)
  data.forEach((setTabs)=>{
    let setData = JSON.parse(setTabs.values)
    let setGroup = Object.keys(setData)
    let children: React.ReactNode = (
      <>
        {setGroup.map((item)=>{
          console.log(setData[item])
          return (
            <>
              <Divider orientation="left">{item}</Divider>
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
              >
                {Object.keys(setData[item]).map((setItem,key) => {
                  console.log(setItem)
                  return <Form.Item
                    label={setItem}
                    name={setItem}
                    initialValue={setData[item][setItem]}
                    key={key}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input />
                  </Form.Item>
                })}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>

            </>
          )
        })}
      </>
    )


    setting!.push({
      label: setTabs.describe,
      key: setTabs.key,
      children
    })
  })


  return setting

  // let setObject = JSON.parse(data.values)
  // let setGroup = Object.keys(setObject)
  // let children: React.ReactNode = (
  //   <>
  //     {setGroup.map((item) => {
  //       let header =  <Divider orientation="left">{}</Divider>
  //
  //       return <></>
  //     })
  //     }
  //   </>
  // )
  //
  //
  // console.log(set)
  // setting!.push({
  //   label: item.describe,
  //   key: item.key,
  //   children: children
  // })
}

export default () => {

  const [setting,setSetting] = useState<TabsProps['items']>([]);

  useEffect( ()=> {
    gitSetting().then((res)=>{
      if(res.success && res.data instanceof Array){
        setSetting(buildTabs(res.data))
      }
    })
  },[])
  return <>

  </>
}