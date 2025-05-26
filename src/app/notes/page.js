'use client'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import NoteCard from '@/components/NoteCard'
import NoteModal from '@/components/NoteModal'
import FloatingButton from '@/components/FloatingButton'
import styles from './NotesPage.module.css'

import { fetchNotesByUserId, createNote, updateNote, deleteNote } from '@/firebase'
import { auth } from '@/firebase'


export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedNote, setSelectedNote] = useState(null)
  const [editIndex, setEditIndex] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    // Ждем авторизацию пользователя и загружаем заметки
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid)
        const userNotes = await fetchNotesByUserId(user.uid)
        setNotes(userNotes)
      } else {
        setUserId(null)
        setNotes([])
      }
    })
    return () => unsubscribe()
  }, [])

  const openCreateModal = () => {
    setModalMode('create')
    setSelectedNote(null)
    setShowModal(true)
  }

  const openEditModal = (note, index) => {
    setModalMode('edit')
    setSelectedNote(note)
    setEditIndex(index)
    setShowModal(true)
  }

  const handleSave = async (noteData) => {
    if (!userId) return alert('Пользователь не авторизован')

    if (modalMode === 'create') {
      // Добавляем созданную заметку в БД
      const newNote = {
        userId,
        title: noteData.title,
        text: noteData.text,
        createdAt: new Date()
      }
      const savedNote = await createNote(newNote)
      setNotes([...notes, savedNote])
    } else {
      // Обновляем заметку в БД
      const noteToUpdate = notes[editIndex]
      await updateNote(noteToUpdate.id, {
        title: noteData.title,
        text: noteData.text
      })
      const updatedNotes = [...notes]
      updatedNotes[editIndex] = { ...noteToUpdate, ...noteData }
      setNotes(updatedNotes)
    }
    setShowModal(false)
  }

  const handleDelete = async () => {
    if (editIndex !== null) {
      const noteToDelete = notes[editIndex]
      await deleteNote(noteToDelete.id)
      const updated = notes.filter((_, i) => i !== editIndex)
      setNotes(updated)
      setShowModal(false)
    }
  }

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.notesGrid}>
          {notes.map((note, index) => (
            <NoteCard
              key={note.id}
              title={note.title}
              onClick={() => openEditModal(note, index)}
            />
          ))}
        </div>
        <FloatingButton onClick={openCreateModal} />
        {showModal && (
          <NoteModal
            mode={modalMode}
            note={selectedNote}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  )
}
