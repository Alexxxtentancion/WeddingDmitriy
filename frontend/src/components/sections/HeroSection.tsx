import { formatWeddingDate, weddingConfig } from '../../config/wedding'
import { useCountdown } from '../../hooks/useCountdown'
import { useInView } from '../../hooks/useInView'
import shared from '../../styles/shared.module.css'
import styles from './HeroSection.module.css'

const countdownLabels = [
  { key: 'days' as const, label: 'Дней' },
  { key: 'hours' as const, label: 'Часов' },
  { key: 'minutes' as const, label: 'Минут' },
  { key: 'seconds' as const, label: 'Секунд' },
]

export function HeroSection() {
  const { ref, isVisible } = useInView()
  const countdown = useCountdown(weddingConfig.date)
  const { bride, groom } = weddingConfig.couple

  const scrollToRsvp = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={ref}
      className={`${shared.section} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={`${shared.container} ${styles.hero}`}>
        <h1 className={styles.names}>
          {bride}
          <span className={styles.ampersand}>&</span>
          {groom}
        </h1>
        <p className={styles.date}>{formatWeddingDate(weddingConfig.date)}</p>

        {countdown.isPast ? (
          <p className={styles.pastMessage}>Мы уже вместе!</p>
        ) : (
          <div className={styles.countdown} aria-label="Обратный отсчёт до свадьбы">
            {countdownLabels.map(({ key, label }) => (
              <div key={key} className={styles.countdownItem}>
                <span className={styles.countdownValue}>{countdown[key]}</span>
                <span className={styles.countdownLabel}>{label}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.ctaWrapper}>
          <button type="button" className={shared.button} onClick={scrollToRsvp}>
            Подтвердить присутствие
          </button>
        </div>
      </div>
    </section>
  )
}
