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

function getDateStrip(targetIso: string): Array<{ day: number; isTarget: boolean }> {
  const target = new Date(targetIso)
  const start = new Date(target)
  start.setDate(target.getDate() - 5)
  const days: Array<{ day: number; isTarget: boolean }> = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push({ day: d.getDate(), isTarget: d.toDateString() === target.toDateString() })
  }
  return days
}

export function HeroSection() {
  const { ref, isVisible } = useInView()
  const countdown = useCountdown(weddingConfig.date)
  const { bride, groom } = weddingConfig.couple
  const dateStrip = getDateStrip(weddingConfig.date)

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
        <div className={styles.polaroidRow} aria-hidden="true">
          <div className={styles.polaroid}>
            <img className={styles.polaroidImg} src="/main_image.png" alt="" />
          </div>
        </div>

        <h1 className={styles.names}>
          {bride} & {groom}
        </h1>

        <p className={styles.subtitle}>Мы скажем друг другу “Да” через:</p>

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

        <p className={styles.dateLine}>{formatWeddingDate(weddingConfig.date)}</p>

        <div className={styles.dateStrip} aria-label="Календарь">
          {dateStrip.map((d) => (
            <div
              key={d.day}
              className={`${styles.dateCell} ${d.isTarget ? styles.dateCellActive : ''}`}
            >
              {d.day}
              {d.isTarget && (
                <img
                  className={styles.heartMark}
                  src="/decor/heart-olive.png"
                  alt=""
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div className={styles.ctaWrapper}>
          <button type="button" className={shared.button} onClick={scrollToRsvp}>
            Подтвердить присутствие
          </button>
        </div>
      </div>
    </section>
  )
}
