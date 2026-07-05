export interface ProgramItem {
  time: string
  title: string
  place: string
}

export interface LocationItem {
  name: string
  address: string
  coords: [number, number]
}

export const weddingConfig = {
  couple: {
    bride: 'Юлия',
    groom: 'Дмитрий',
  },
  date: '2026-09-12T15:00:00+03:00',
  rsvpDeadline: '2026-08-15',
  story: {
    title: 'Наша история',
    paragraphs: [
      'Мы познакомились весной 2020 года на прогулке в парке. Сначала это была случайная встреча, потом — долгие разговоры и прогулки до поздней ночи.',
      'Через три года Дмитрий сделал предложение на закате у воды. Без лишней суеты — только мы, море и слова, которые мы будем помнить всю жизнь.',
      'Теперь мы приглашаем вас разделить с нами этот особенный день — день, когда мы станем семьёй.',
    ],
    imageUrl: '',
  },
  program: [
    {
      time: '15:00',
      title: 'Сбор гостей',
      place: 'Усадьба «Белая ROSA», терраса',
    },
    {
      time: '16:00',
      title: 'Церемония',
      place: 'Усадьба «Белая ROSA», сад',
    },
    {
      time: '18:00',
      title: 'Банкет',
      place: 'Усадьба «Белая ROSA», банкетный зал',
    },
    {
      time: '22:00',
      title: 'Танцы',
      place: 'Усадьба «Белая ROSA», банкетный зал',
    },
  ] satisfies ProgramItem[],
  locations: [
    {
      name: 'Церемония и банкет',
      address: 'Московская область, Одинцовский район, д. Лайково, ул. Садовая, 12',
      coords: [55.687, 37.203],
    },
  ] satisfies LocationItem[],
  dressCode: {
    description:
      'Мы будем рады, если вы поддержите нашу палитру: нежные оттенки ivory, sage green и тёплый золотистый. Костюм или платье — на ваш выбор, главное — комфорт и праздничное настроение.',
    colors: ['#FAF8F5', '#8B9E8B', '#C4A882', '#2C2C2C'],
  },
}

export const navItems = [
  { id: 'hero', label: 'Главная' },
  { id: 'story', label: 'История' },
  { id: 'program', label: 'Программа' },
  { id: 'location', label: 'Локация' },
  { id: 'dresscode', label: 'Дресс-код' },
  { id: 'rsvp', label: 'RSVP' },
] as const

export const drinkOptions = [
  { value: 'champagne', label: 'Шампанское' },
  { value: 'white_wine', label: 'Белое вино' },
  { value: 'red_wine', label: 'Красное вино' },
  { value: 'whisky', label: 'Виски' },
  { value: 'vodka', label: 'Водка' },
  { value: 'cognac', label: 'Коньяк' },
  { value: 'non_alcoholic', label: 'Безалкогольные' },
] as const

export type DrinkValue = (typeof drinkOptions)[number]['value']

export function formatWeddingDate(isoDate: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate))
}

export function formatDeadline(dateStr: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr + 'T23:59:59'))
}

export function isRsvpClosed(deadline: string): boolean {
  const deadlineDate = new Date(deadline + 'T23:59:59')
  return new Date() > deadlineDate
}
