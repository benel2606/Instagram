import { useState, useEffect } from "react"
import { Modal, Button } from "antd"
import { UserDetails } from "../UserDetails"
import { StoryActionList } from "../StoryActionList"
import { storyService } from "../../services/story.service.local"
import {
  loadStories,
  loadStory,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
} from "../../store/story.actions"
import { useLocation } from "react-router-dom"
import { UploadFile } from "./UploadFile"

export function CreateModal({ setOpenCreateModal }) {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setOpenCreateModal(false)
  }
  return (
    <article className="create-modal">
      <Modal open={isModalOpen} onCancel={handleCancel} footer="">
        <div className="create-modal-content">
          <span className="title">Create new post</span>
          <span>
            <img src="img/utils/media-upload.png" />
            <div>Drag photos and videos here</div>
            <UploadFile />
          </span>
        </div>
      </Modal>
    </article>
  )
}
