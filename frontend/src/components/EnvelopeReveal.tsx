import { formatShortDateLine, weddingConfig } from '../config/wedding'
import styles from './EnvelopeReveal.module.css'

interface EnvelopeRevealProps {
  showScrollHint?: boolean
}

export function EnvelopeReveal({ showScrollHint = false }: EnvelopeRevealProps) {
  const { bride, groom } = weddingConfig.couple
  const shortDate = formatShortDateLine(weddingConfig.date)

  return (
    <>
      <div className={styles.compose}>
        <img
          className={styles.envelope}
          src="/decor/opened-envelope.png"
          alt=""
          aria-hidden="true"
        />

        <img className={styles.jasmine} src="/decor/jasmine.png" alt="" aria-hidden="true" />

        <img className={styles.hanging} src="/decor/hanging.png" alt="" aria-hidden="true" />

        <div className={styles.scallopCard}>
          <p className={styles.namePrimary}>{groom}</p>
          <p className={styles.nameSecondary}>и {bride}</p>
          <p className={styles.dateLine}>— {shortDate} —</p>
        </div>
      </div>

      {showScrollHint && (
        <img
          className={styles.scrollHint}
          src="/decor/scroll-down.png"
          alt=""
          aria-hidden="true"
        />
      )}
    </>
  )
}
