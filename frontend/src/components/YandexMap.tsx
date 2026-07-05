import { useEffect, useRef, useState } from 'react'
import type { LocationItem } from '../config/wedding'
import styles from './YandexMap.module.css'

// const API_KEY = import.meta.env.VITE_YANDEX_MAPS_KEY as string | undefined
const API_KEY = '8c5da3ab-7ae6-4959-b0fe-c4b8593d69f7'

interface YMapInstance {
  geoObjects: { add: (obj: unknown) => void }
  destroy: () => void
}

let scriptPromise: Promise<void> | null = null

function loadYandexMaps(): Promise<void> {
  if (window.ymaps) {
    return Promise.resolve()
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      if (!API_KEY) {
        reject(new Error('Карта недоступна: не указан ключ API'))
        return
      }

      const script = document.createElement('script')
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`
      script.async = true
      script.onload = () => {
        window.ymaps.ready(() => resolve())
      }
      script.onerror = () => reject(new Error('Не удалось загрузить Яндекс.Карты'))
      document.head.appendChild(script)
    })
  }

  return scriptPromise
}

interface YandexMapProps {
  locations: LocationItem[]
}

export function YandexMap({ locations }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!API_KEY) {
      setError('Карта недоступна: не указан ключ API')
      return
    }

    let mapInstance: YMapInstance | null = null

    loadYandexMaps()
      .then(() => {
        if (!mapRef.current) return

        const center = locations[0]?.coords ?? [55.75, 37.62]
        mapInstance = new window.ymaps.Map(mapRef.current, {
          center,
          zoom: 14,
          controls: ['zoomControl'],
        })

        locations.forEach((loc) => {
          mapInstance!.geoObjects.add(
            new window.ymaps.Placemark(
              loc.coords,
              { balloonContent: `<strong>${loc.name}</strong><br/>${loc.address}` },
              { preset: 'islands#greenDotIcon' },
            ),
          )
        })
      })
      .catch((err: Error) => {
        setError(err.message)
      })

    return () => {
      mapInstance?.destroy()
    }
  }, [locations])

  const primaryLocation = locations[0]
  const yandexLink = primaryLocation
    ? `https://yandex.ru/maps/?pt=${primaryLocation.coords[1]},${primaryLocation.coords[0]}&z=16&l=map`
    : null

  if (error) {
    return (
      <div className={styles.mapWrapper}>
        <div className={styles.mapPlaceholder}>{error}</div>
        {yandexLink && (
          <a
            href={yandexLink}
            className={styles.mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть в Яндекс.Картах
          </a>
        )}
      </div>
    )
  }

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapRef} className={styles.map} aria-label="Карта места проведения" />
      {yandexLink && (
        <a
          href={yandexLink}
          className={styles.mapLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть в Яндекс.Картах
        </a>
      )}
    </div>
  )
}
