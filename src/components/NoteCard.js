'use client'
import styles from './NoteCard.module.css'

export default function NoteCard({ title, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{title}</h3>
    </div>
  )
}
