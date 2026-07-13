import { weddingConfig } from '../../config/wedding'
import { useInView } from '../../hooks/useInView'
import { YandexMap } from '../YandexMap'
import shared from '../../styles/shared.module.css'
import styles from './LocationSection.module.css'

export function LocationSection() {
  const { ref, isVisible } = useInView()
  const primary = weddingConfig.locations[0]
  const yandexLink = primary
    ? `https://yandex.ru/maps/?pt=${primary.coords[1]},${primary.coords[0]}&z=16&l=map`
    : null

  return (
    <section
      id="location"
      ref={ref}
      className={`${shared.section} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={shared.container}>
        <h2 className={shared.sectionTitle}>Локация</h2>

        <div className={styles.locationList}>
          {weddingConfig.locations.map((location) => (
            <div key={location.name} className={styles.locationItem}>
              <p className={styles.locationName}>{location.name}</p>
              <p className={styles.locationAddress}>{location.address}</p>
            </div>
          ))}
        </div>

        {yandexLink && (
          <div className={styles.mapButtonWrap}>
            <a className={shared.button} href={yandexLink} target="_blank" rel="noopener noreferrer">
              Место на карте
            </a>
          </div>
        )}

        <div className={shared.divider} />

        <YandexMap locations={weddingConfig.locations} />
      </div>
    </section>
  )
}
