'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Form.module.css'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return alert('Заполните все поля')
    // Просто сохраняем юзера в localStorage для демо
    localStorage.setItem('user', username.trim())
    router.push('/notes')
  }

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h2>Вход</h2>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  )
}
