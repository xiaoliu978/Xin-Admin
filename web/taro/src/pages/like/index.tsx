
import { Input, View } from '@tarojs/components'
import { Dialog, Cell } from '@antmjs/vantui'
import {useCallback, useState} from "react";

const Dialog_ = Dialog.createOnlyDialog()
export default function Demo() {
  const [value, setValue] = useState('')
  const alert = useCallback((title) => {
    Dialog_.alert({
      title: title || '',
      message: '弹窗内容',
    }).then((data) => {
      console.log('dialog result', data)
    })
  }, [])

  const confirm = useCallback(() => {
    Dialog_.confirm({
      title: '标题',
      message: (
        <Input
          placeholder="请输入内容"
          value={value}
          onInput={(e) => setValue(e.detail.value)}
        />
      ),
    }).then((data) => {
      console.log('dialog result', data)
    })
  }, [value])

  return (
    <View>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <Dialog_ />
      <Cell title="提示弹窗" onClick={() => alert('提示一下')} />
      <Cell title="提示弹窗（无标题）" onClick={() => alert('123')} />
      <Cell title="确认弹窗" onClick={confirm} />
    </View>
  )
}
