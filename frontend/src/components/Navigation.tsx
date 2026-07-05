import { useCallback, useEffect, useState } from 'react'
import { navItems, weddingConfig } from '../config/wedding'
import styles from './Navigation.module.css'

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const { bride, groom } = weddingConfig.couple

  return (
    <nav className={styles.nav} aria-label="Основная навигация">
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.logo}
          onClick={() => scrollTo('hero')}
        >
          {bride} & {groom}
        </button>

        <ul className={styles.desktopLinks}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.id)
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className={styles.overlay} role="dialog" aria-modal="true">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
