'use client'
import { useState, useEffect } from 'react'
import styles from './NoteModal.module.css'

export default function NoteModal({ mode = 'create', note, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(note?.title || '')
  const [text, setText] = useState(note?.text || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !text.trim()) return
    onSave({ title, text })
    onClose()
  }

  const handleDelete = () => {
    if (confirm('Удалить заметку?')) {
      onDelete()
      onClose()
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{mode === 'create' ? 'Новая заметка' : 'Редактировать заметку'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
          />
          <textarea
            placeholder="Текст заметки"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textAreaField}
          />
          <div className={styles.actions}>
            <button type="submit" className={styles.button}>
              {mode === 'create' ? 'Создать' : 'Сохранить'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                className={`${styles.button} ${styles.delete}`}
              >
                Удалить
              </button>
            )}
            <button type="button" onClick={onClose} className={styles.button}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
