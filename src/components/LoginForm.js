'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import styles from './Form.module.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
  e.preventDefault()
  if (!email.trim() || !password.trim()) return alert('Заполните все поля')

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }))
    router.push('/notes')
  } catch (err) {
    let message = 'Произошла ошибка входа'
    switch (err.code) {
      case 'auth/user-not-found':
        message = 'Пользователь не найден'
        break
      case 'auth/wrong-password':
        message = 'Неверный пароль'
        break
      case 'auth/invalid-email':
        message = 'Некорректный email'
        break
      case 'auth/too-many-requests':
        message = 'Слишком много попыток входа. Попробуйте позже.'
        break
      default:
        message = 'Ошибка: ' + err.message
    }
    alert(message)
  }
}

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h2>Вход</h2>
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
      <button type="submit">Войти</button>
    </form>
  )
}
