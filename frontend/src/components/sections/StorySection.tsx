import { weddingConfig } from '../../config/wedding'
import { useInView } from '../../hooks/useInView'
import shared from '../../styles/shared.module.css'
import styles from './StorySection.module.css'

export function StorySection() {
  const { ref, isVisible } = useInView()
  const { title, paragraphs, imageUrl } = weddingConfig.story

  return (
    <section
      id="story"
      ref={ref}
      className={`${shared.section} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={shared.container}>
        <h2 className={shared.sectionTitle}>{title}</h2>
        <div className={shared.divider} />

        <div className={styles.content}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        {imageUrl ? (
          <img src={imageUrl} alt="Фото пары" className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            Фото пары
          </div>
        )}
      </div>
    </section>
  )
}
