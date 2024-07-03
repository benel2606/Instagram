import React from "react"
import { UploadOutlined } from "@ant-design/icons"

import { Button, message, Upload } from "antd"

export function UploadFile() {
  const UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  return (
    <Upload {...UploadProps}>
      <Button type="primary">Select from computer</Button>
    </Upload>
  )
}
