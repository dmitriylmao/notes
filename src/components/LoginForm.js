'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import styles from './Form.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      toast.warning('Заполните все поля', { position: 'top-center' })
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }))
      toast.success('Успешный вход! Перенаправляем...')
      router.push('/notes')
    } catch (err) {
      let message = 'Ошибка входа'
      switch (err.code) {
        case 'auth/user-not-found':
          message = 'Пользователь с таким email не найден'
          break
        case 'auth/wrong-password':
          message = 'Неверный пароль. Попробуйте ещё раз'
          break
        case 'auth/invalid-email':
          message = 'Введён некорректный email'
          break
        case 'auth/too-many-requests':
          message = 'Слишком много попыток. Попробуйте позже'
          break
        case 'auth/invalid-credential':
          message = 'Неправильные данные для входа'
          break
        default:
          message = 'Что-то пошло не так. Попробуйте ещё раз'
      }
      toast.error(message, { position: 'top-center' })
    }
  }

  return (
    <>
      <form onSubmit={handleLogin} className={styles.form}>
        
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
        <button className={styles.buttonn} type="submit">Войти</button>
      </form>
      <ToastContainer theme="dark" />
    </>
  )
}
