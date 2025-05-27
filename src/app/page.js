'use client'
import { useState } from 'react'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import styles from './page.module.css'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {/* Динамичный ползунок с изменением градиента */}
        <div
          className={`${styles.slider} ${
            activeTab === 'login' ? styles.loginGradient : styles.registerGradient
          } ${activeTab === 'register' ? styles.right : ''}`}
        />

        <button
          className={activeTab === 'login' ? styles.active : ''}
          onClick={() => setActiveTab('login')}
        >
          Вход
        </button>
        <button
          className={activeTab === 'register' ? styles.active : ''}
          onClick={() => setActiveTab('register')}
        >
          Регистрация
        </button>
      </div>

      <div className={styles.form}>
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  )
}
