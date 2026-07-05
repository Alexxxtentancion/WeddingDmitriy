import { weddingConfig } from '../../config/wedding'
import { useInView } from '../../hooks/useInView'
import { YandexMap } from '../YandexMap'
import shared from '../../styles/shared.module.css'
import styles from './LocationSection.module.css'

export function LocationSection() {
  const { ref, isVisible } = useInView()

  return (
    <section
      id="location"
      ref={ref}
      className={`${shared.section} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={shared.container}>
        <h2 className={shared.sectionTitle}>Локация</h2>
        <div className={shared.divider} />

        <div className={styles.locationList}>
          {weddingConfig.locations.map((location) => (
            <div key={location.name} className={styles.locationItem}>
              <p className={styles.locationName}>{location.name}</p>
              <p className={styles.locationAddress}>{location.address}</p>
            </div>
          ))}
        </div>

        <YandexMap locations={weddingConfig.locations} />
      </div>
    </section>
  )
}
