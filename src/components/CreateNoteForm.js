'use client'
import { useState } from 'react'
import styles from './CreateNoteForm.module.css'

export default function CreateNoteForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !text.trim()) return
    onCreate({ title, text })
    setTitle('')
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Текст заметки"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Создать заметку</button>
    </form>
  )
}
