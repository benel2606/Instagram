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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </article>
  )
}
