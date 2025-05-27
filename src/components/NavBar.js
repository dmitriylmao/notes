'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './NavBar.module.css'

export default function NavBar() {
  const router = useRouter()
  const [userDisplayName, setUserDisplayName] = useState('Гость')
  const [date, setDate] = useState('')

  useEffect(() => {
    const userString = localStorage.getItem('user'); 
    
    let displayName = 'Гость';
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        
        if (userData && typeof userData.email === 'string') {
          const userEmail = userData.email;
          const atIndex = userEmail.indexOf('@');
          if (atIndex !== -1) {
            displayName = userEmail.substring(0, atIndex);
          } else {
            displayName = userEmail; 
          }
        }
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
      }
    }
    
    setUserDisplayName(displayName);

    const now = new Date()
    setDate(now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <b>{userDisplayName}</b>
      </div>
      
      <div className={styles.centerSection}>
        {date}
      </div>

      <div className={styles.rightSection}>
        <button onClick={handleLogout} className={styles.logoutBtn}>Выйти</button>
      </div>
    </nav>
  )
}