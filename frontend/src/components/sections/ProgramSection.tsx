import { weddingConfig } from '../../config/wedding'
import { useInView } from '../../hooks/useInView'
import shared from '../../styles/shared.module.css'
import styles from './ProgramSection.module.css'

export function ProgramSection() {
  const { ref, isVisible } = useInView()

  return (
    <section
      id="program"
      ref={ref}
      className={`${shared.section} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={shared.container}>
        <h2 className={shared.sectionTitle}>Программа дня</h2>
        <div className={shared.divider} />

        <div className={styles.timeline}>
          {weddingConfig.program.map((item) => (
            <div key={item.time + item.title} className={styles.item}>
              <p className={styles.time}>{item.time}</p>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.place}>{item.place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
