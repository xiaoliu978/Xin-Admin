import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import {Upload} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { FormInstance } from 'antd/lib/form';

interface PropsType {
  dataIndex: string;
  api: string;
  form: FormInstance;
}


const UploadImgItem: React.FC<PropsType> = (props) => {
  const {form,dataIndex, api} = props

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: '',
      status: 'done',
      url: form.getFieldValue(dataIndex),
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if(newFileList.length === 0){
      return
    }
    if(newFileList[0].status === 'done'){
      console.log(newFileList[0].response.data.url)
      form.setFieldValue(dataIndex ,newFileList[0].response.data.url)
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          maxCount={1}
          action={api}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          headers={{
            'Authorization': localStorage.getItem('token')!
          }}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>
    </>

  );
};

export default UploadImgItem;