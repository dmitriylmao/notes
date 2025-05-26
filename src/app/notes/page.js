'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import NoteCard from '@/components/NoteCard'
import NoteModal from '@/components/NoteModal'
import FloatingButton from '@/components/FloatingButton'
import styles from './NotesPage.module.css'

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create') // 'create' or 'edit'
  const [selectedNote, setSelectedNote] = useState(null)
  const [editIndex, setEditIndex] = useState(null)

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

  const handleSave = (note) => {
    if (modalMode === 'create') {
      setNotes([...notes, note])
    } else {
      const updated = [...notes]
      updated[editIndex] = note
      setNotes(updated)
    }
  }

  const handleDelete = () => {
    if (editIndex !== null) {
      const updated = notes.filter((_, i) => i !== editIndex)
      setNotes(updated)
    }
  }

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.notesGrid}>
          {notes.map((note, index) => (
            <NoteCard
              key={index}
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
