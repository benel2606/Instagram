import { MessagePreview } from "./MessagePreview.jsx"

export function MessageList() {
  return (
    <header className="message-list">
      <MessagePreview id={1} />
      <MessagePreview id={2} />
      <MessagePreview id={3} />
      <MessagePreview id={4} />
    </header>
  )
}
