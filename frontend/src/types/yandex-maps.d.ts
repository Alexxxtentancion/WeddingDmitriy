declare global {
  interface Window {
    ymaps: typeof ymaps
  }
}

export interface YandexMaps {
  Map: new (
    element: string | HTMLElement,
    state: { center: number[]; zoom: number; controls?: string[] },
    options?: { suppressMapOpenBlock?: boolean },
  ) => {
    geoObjects: { add: (obj: unknown) => void }
    destroy: () => void
  }
  Placemark: new (
    coords: number[],
    properties: { balloonContent: string },
    options?: { preset?: string },
  ) => unknown
  ready: (callback: () => void) => void
}

declare const ymaps: YandexMaps

export {}
