import {
  formatWeekdayDateLine,
  getDateStrip,
  weddingConfig,
} from '../../config/wedding'
import { useInView } from '../../hooks/useInView'
import shared from '../../styles/shared.module.css'
import styles from './DateLocationSection.module.css'

export function DateLocationSection() {
  const { ref, isVisible } = useInView()
  const { textTail } = weddingConfig.invitation
  const dateStrip = getDateStrip(weddingConfig.date)
  const primary = weddingConfig.locations[0]
  const yandexLink = primary
    ? `https://yandex.ru/maps/?pt=${primary.coords[1]},${primary.coords[0]}&z=16&l=map`
    : null

  return (
    <section
      id="date-location"
      ref={ref}
      className={`${shared.page} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={styles.content}>
        <p className={styles.inviteText}>{textTail}</p>

        <p className={styles.weekdayLine}>{formatWeekdayDateLine(weddingConfig.date)}</p>

        <div className={styles.dateStrip} aria-label="Календарь">
          {dateStrip.map((d) => (
            <div
              key={d.day}
              className={`${styles.dateCell} ${d.isTarget ? styles.dateCellActive : ''}`}
            >
              {d.isTarget && (
                <img
                  className={styles.heartMark}
                  src="/decor/heart-olive.png"
                  alt=""
                  aria-hidden="true"
                />
              )}
              <span className={styles.dayNum}>{d.day}</span>
            </div>
          ))}
        </div>

        <h2 className={styles.locationTitle}>Локация</h2>

        {weddingConfig.locations.map((location) => (
          <div key={location.name} className={styles.locationBlock}>
            <p className={styles.locationName}>{location.name}</p>
            <p className={styles.locationAddress}>{location.address}</p>
          </div>
        ))}

        {yandexLink && (
          <div className={styles.mapButtonWrap}>
            <a
              className={`${shared.button} ${styles.mapButton}`}
              href={yandexLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Место на карте
            </a>
          </div>
        )}

        <div className={shared.divider} />
      </div>
    </section>
  )
}
