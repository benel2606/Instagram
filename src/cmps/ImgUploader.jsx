import { useState } from "react"
import { uploadService } from "../services/upload.service"

export function ImgUploader({ onUploaded = null, setIsImageUpload, setImage }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })

  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded?.(secure_url)
    setImage(secure_url)
  }
  function addNewStory() {
    console.log("addNewStory")
  }
  function getUploadLabel() {
    if (imgData.imgUrl) {
      console.log(imgData.imgUrl)
      setIsImageUpload(true)
      return "next"
    }
    return isUploading ? "Uploading...." : "Select from computer"
  }

  return (
    <div className="upload-preview">
      <label className="custom-file-upload" htmlFor="imgUpload">
        {getUploadLabel()}
      </label>
      {/* {!imgData.imgUrl ? (
        <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
      ) : (
        <input type="button" onClick={addNewStory} id="imgUpload" />
      )} */}
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />

      {/* {imgData.imgUrl && (
        <section className="add-story">
          <img src={imgData.imgUrl} />
          <section>aaa</section>
        </section>
      )} */}
    </div>
  )
}
