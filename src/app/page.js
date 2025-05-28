'use client'
import { useState } from 'react'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import styles from './page.module.css' // Убедись, что стили импортированы

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className={styles.pageWrapper}> {/* ВОТ ОН, НОВЫЙ ВНЕШНИЙ КОНТЕЙНЕР */}
      <div className={styles.container}>
        <div className={styles.tabs}>
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
    </div>
  )
}