'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import styles from './Form.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      toast.error('Заполните все поля')
      return
    }
    if (password !== passwordConfirm) {
      toast.error('Пароли не совпадают')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('Регистрация прошла успешно!')
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
    } catch (err) {
      let message = 'Ошибка регистрации'

      switch (err.code) {
        case 'auth/email-already-in-use':
          message = 'Пользователь с таким email уже зарегистрирован'
          break
        case 'auth/invalid-email':
          message = 'Некорректный email'
          break
        case 'auth/weak-password':
          message = 'Пароль слишком простой. Минимум 6 символов'
          break
        case 'auth/too-many-requests':
          message = 'Слишком много попыток. Попробуйте позже.'
          break
        default:
          message = 'Ошибка: ' + err.message
      }

      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      
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
      <button className={styles.buttonn} type="submit">Зарегистрироваться</button>
      <ToastContainer position="top-center" autoClose={4000} theme="dark" />
    </form>
  )
}
