'use client'
import { useState, useEffect } from 'react'
import styles from './NoteModal.module.css'

export default function NoteModal({ mode = 'create', note, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(note?.title || '')
  const [text, setText] = useState(note?.text || '')
  const [isSaving, setIsSaving] = useState(false)

  // Обновляем поля при смене note (например при редактировании другой заметки)
  useEffect(() => {
    setTitle(note?.title || '')
    setText(note?.text || '')
  }, [note])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !text.trim()) return
    setIsSaving(true)
    try {
      await onSave({ title, text })  // ждем сохранения
      onClose()
    } finally {
      setIsSaving(false)
    }
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
            disabled={isSaving}
          />
          <textarea
            placeholder="Текст заметки"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textAreaField}
            disabled={isSaving}
          />
          <div className={styles.actions}>
            <button type="submit" className={styles.button} disabled={isSaving}>
              {mode === 'create' ? 'Создать' : 'Сохранить'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                className={`${styles.button} ${styles.delete}`}
                disabled={isSaving}
              >
                Удалить
              </button>
            )}
            <button type="button" onClick={onClose} className={styles.button} disabled={isSaving}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
