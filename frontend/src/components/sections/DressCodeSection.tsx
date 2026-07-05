import { weddingConfig } from '../../config/wedding'
import { useInView } from '../../hooks/useInView'
import shared from '../../styles/shared.module.css'
import styles from './DressCodeSection.module.css'

export function DressCodeSection() {
  const { ref, isVisible } = useInView()
  const { description, colors } = weddingConfig.dressCode

  return (
    <section
      id="dresscode"
      ref={ref}
      className={`${shared.section} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={shared.container}>
        <h2 className={shared.sectionTitle}>Дресс-код</h2>
        <div className={shared.divider} />

        <p className={styles.description}>{description}</p>

        <div className={styles.swatches} aria-label="Рекомендуемые цвета">
          {colors.map((color) => (
            <div
              key={color}
              className={styles.swatch}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
