'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './NavBar.module.css'

export default function NavBar() {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const username = localStorage.getItem('user') || 'Гость'
    setUser(username)

    const now = new Date()
    setDate(now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <nav className={styles.navbar}>
      <div>Пользователь: <b>{user}</b></div>
      <div>{date}</div>
      <button onClick={handleLogout} className={styles.logoutBtn}>Выйти</button>
    </nav>
  )
}
