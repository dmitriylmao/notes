'use client'
import { useState } from 'react'
import styles from './Form.module.css'

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim() || !passwordConfirm.trim()) return alert('Заполните все поля')
    if (password !== passwordConfirm) return alert('Пароли не совпадают')
    alert(`Пользователь ${username.trim()} зарегистрирован!`)
    setUsername('')
    setPassword('')
    setPasswordConfirm('')
  }

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <h2>Регистрация</h2>
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
      <input
        type="password"
        placeholder="Подтверждение пароля"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}
