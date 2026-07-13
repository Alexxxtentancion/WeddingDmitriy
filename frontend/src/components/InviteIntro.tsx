import { useEffect, useState } from 'react'
import { weddingConfig } from '../config/wedding'
import styles from './InviteIntro.module.css'

type IntroPhase = 'closed' | 'opening' | 'opened' | 'leaving'

interface InviteIntroProps {
  onOpenInvite: () => void
}

export function InviteIntro({ onOpenInvite }: InviteIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>('closed')
  const [hidden, setHidden] = useState(false)
  const { bride, groom } = weddingConfig.couple

  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [hidden])

  useEffect(() => {
    if (phase !== 'opening') return
    const openTimer = window.setTimeout(() => setPhase('opened'), 560)
    return () => window.clearTimeout(openTimer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'opened') return
    const leaveTimer = window.setTimeout(() => setPhase('leaving'), 1500)
    return () => window.clearTimeout(leaveTimer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return
    const doneTimer = window.setTimeout(() => {
      setHidden(true)
      onOpenInvite()
    }, 520)
    return () => window.clearTimeout(doneTimer)
  }, [phase, onOpenInvite])

  if (hidden) return null

  const handleOpen = () => {
    if (phase !== 'closed') return
    setPhase('opening')
  }

  const showOpened = phase === 'opening' || phase === 'opened' || phase === 'leaving'
  const showClosed = phase === 'closed' || phase === 'opening'

  return (
    <div className={`${styles.overlay} ${phase === 'leaving' ? styles.fadeOut : ''}`}>
      <div className={styles.inner}>
        {phase === 'closed' && <p className={styles.title}>Вам приглашение…</p>}

        <button
          type="button"
          className={`${styles.envelopeButton} ${showOpened ? styles.envelopeWide : ''}`}
          onClick={handleOpen}
          aria-label="Открыть приглашение"
          disabled={phase !== 'closed'}
        >
          {showClosed && (
            <img
              className={`${styles.envelopeImg} ${styles.closedImg} ${
                phase === 'opening' ? styles.closedLeaving : ''
              }`}
              src="/decor/envelope.png"
              alt=""
              loading="eager"
            />
          )}

          {showOpened && (
            <img
              className={`${styles.envelopeImg} ${styles.openedImg} ${
                phase === 'opening' ? styles.openedEntering : ''
              }`}
              src="/decor/opened-envelope.png"
              alt={`${bride} и ${groom}`}
            />
          )}
        </button>

        {phase === 'closed' && <p className={styles.hint}>Нажмите на конверт</p>}
      </div>
    </div>
  )
}
