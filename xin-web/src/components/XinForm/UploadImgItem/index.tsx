import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import {Input, Upload} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const UploadImgItem: React.FC<{config:any,form:any,schema:any}> = (props) => {
  const {config,form,schema} = props

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: '',
      status: 'done',
      url: config.value,
    },
  ]);
  console.log(config,form,schema)

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if(newFileList[0].status === 'done'){
      form.setFieldValue('avatar',newFileList[0].response.data.url)
      config.value = newFileList[0].response.data.url
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
      <Input placeholder="Basic usage" value={config.value} style={{display:'none'}}/>
      <ImgCrop rotationSlider>
        <Upload
          maxCount={1}
          action="/admin.php/system.file/upload"
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