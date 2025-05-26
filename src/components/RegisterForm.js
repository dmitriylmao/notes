'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase' // путь к твоему firebase.js
import styles from './Form.module.css'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim() || !passwordConfirm.trim())
      return alert('Заполните все поля')
    if (password !== passwordConfirm)
      return alert('Пароли не совпадают')

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert('Регистрация прошла успешно!')
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
    } catch (err) {
      console.error(err)
      alert('Ошибка регистрации: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <h2>Регистрация</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
