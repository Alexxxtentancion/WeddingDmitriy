import { useState, type FormEvent } from 'react'
import { submitRsvp, type DrinkChoice, type FoodChoice } from '../../api/rsvp'
import {
  drinkOptions,
  formatDeadline,
  isRsvpClosed,
  weddingConfig,
} from '../../config/wedding'
import { useInView } from '../../hooks/useInView'
import shared from '../../styles/shared.module.css'
import styles from './RsvpSection.module.css'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function RsvpSection() {
  const { ref, isVisible } = useInView()
  const closed = isRsvpClosed(weddingConfig.rsvpDeadline)

  const [name, setName] = useState('')
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guestsCount, setGuestsCount] = useState(1)
  const [food, setFood] = useState<FoodChoice | ''>('')
  const [drinks, setDrinks] = useState<DrinkChoice[]>([])
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const toggleDrink = (value: DrinkChoice) => {
    setDrinks((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    console.log("dcsdckmsoc")
    if (!name.trim()) {
      setErrorMessage('Пожалуйста, укажите имя и фамилию')
      setStatus('error')
      return
    }

    if (attending === null) {
      setErrorMessage('Пожалуйста, подтвердите или отклоните присутствие')
      setStatus('error')
      return
    }

    if (attending && !food) {
      setErrorMessage('Пожалуйста, выберите блюдо')
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      await submitRsvp({
        name: name.trim(),
        attending,
        guests_count: attending ? guestsCount : undefined,
        food: attending ? (food as FoodChoice) : undefined,
        drinks: attending ? drinks : [],
        comment: comment.trim() || undefined,
      })
      setStatus('success')
      setName('')
      setAttending(null)
      setGuestsCount(1)
      setFood('')
      setDrinks([])
      setComment('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Ошибка отправки')
    }
  }

  return (
    <section
      id="rsvp"
      ref={ref}
      className={`${shared.section} ${shared.fadeIn} ${isVisible ? shared.fadeInVisible : ''}`}
    >
      <div className={shared.container}>
        <h2 className={shared.sectionTitle}>Подтверждение присутствия</h2>
        <div className={shared.divider} />

        <p className={styles.deadline}>
          Пожалуйста, ответьте до {formatDeadline(weddingConfig.rsvpDeadline)}
        </p>

        {closed ? (
          <div className={styles.closedMessage}>
            К сожалению, срок подтверждения присутствия истёк. Если у вас изменились
            планы, свяжитесь с нами лично.
          </div>
        ) : status === 'success' ? (
          <div className={styles.bannerSuccess} role="status">
            Спасибо! Ваш ответ сохранён. Ждём вас на празднике!
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {status === 'error' && errorMessage && (
              <div className={styles.bannerError} role="alert">
                {errorMessage}
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="rsvp-name">
                Имя и фамилия <span className={styles.required}>*</span>
              </label>
              <input
                id="rsvp-name"
                className={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                required
                autoComplete="name"
              />
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                Присутствие <span className={styles.required}>*</span>
              </legend>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === true}
                    onChange={() => setAttending(true)}
                  />
                  Буду
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === false}
                    onChange={() => setAttending(false)}
                  />
                  Не смогу
                </label>
              </div>
            </fieldset>

            {attending && (
              <>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="rsvp-guests">
                    Количество гостей
                  </label>
                  <input
                    id="rsvp-guests"
                    className={styles.input}
                    type="number"
                    min={1}
                    max={5}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                  />
                </div>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    Еда <span className={styles.required}>*</span>
                  </legend>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="food"
                        checked={food === 'meat'}
                        onChange={() => setFood('meat')}
                      />
                      Мясо
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="food"
                        checked={food === 'fish'}
                        onChange={() => setFood('fish')}
                      />
                      Рыба
                    </label>
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>Напитки</legend>
                  <div className={styles.checkboxGroup}>
                    {drinkOptions.map((option) => (
                      <label key={option.value} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={drinks.includes(option.value)}
                          onChange={() => toggleDrink(option.value)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="rsvp-comment">
                Комментарий
              </label>
              <textarea
                id="rsvp-comment"
                className={styles.textarea}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Аллергии, пожелания..."
                rows={3}
              />
            </div>

            <div className={styles.submitWrapper}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
