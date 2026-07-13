import { weddingConfig } from '../../config/wedding'
import { useInView } from '../../hooks/useInView'
import shared from '../../styles/shared.module.css'
import styles from './ProgramSection.module.css'

const icons = [
  '/decor/icon-welcome.png',
  '/decor/icon-dinner.png',
  '/decor/icon-cake.png',
  '/decor/icon-end.png',
]

export function ProgramSection() {
  const { ref, isVisible } = useInView()

  return (
    <section
      id="program"
      ref={ref}
      className={`${shared.section} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={shared.container}>
        <div className={styles.poster}>
          <img className={styles.hanging} src="/decor/hanging.png" alt="" aria-hidden="true" />
          <h2 className={styles.title}>Тайминг</h2>
          <div className={styles.wave} aria-hidden="true" />

          <div className={styles.grid}>
            {weddingConfig.program.map((item, index) => (
              <div key={item.time + item.title} className={styles.item}>
                <img
                  className={styles.icon}
                  src={icons[index % icons.length]}
                  alt=""
                  aria-hidden="true"
                />
                <p className={styles.time}>{item.time}</p>
                <p className={styles.label}>{item.title}</p>
                <p className={styles.place}>{item.place}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
