import { drinkOptions } from '../config/wedding'

export type FoodChoice = 'meat' | 'fish'

export type DrinkChoice =
  | 'champagne'
  | 'white_wine'
  | 'red_wine'
  | 'whisky'
  | 'vodka'
  | 'cognac'
  | 'non_alcoholic'

export interface RsvpFormData {
  name: string
  attending: boolean
  guests_count?: number
  food?: FoodChoice
  drinks: DrinkChoice[]
  comment?: string
}

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxOyEJMHLeEvy4D0pUPJ8zPp2owyRROjGwInBJZYcI79KHGO6kyP6O6bB9MQZTQXbIh8w/exec'


const drinkLabels = Object.fromEntries(
  drinkOptions.map((option) => [option.value, option.label]),
) as Record<DrinkChoice, string>

function formatDrinks(drinks: DrinkChoice[]): string {
  return drinks.map((value) => drinkLabels[value]).join(', ')
}

function formatFood(food?: FoodChoice): string {
  if (food === 'meat') return 'Мясо'
  if (food === 'fish') return 'Рыба'
  return ''
}

export async function submitRsvp(data: RsvpFormData): Promise<void> {
  if (!SCRIPT_URL) {
    throw new Error('Не настроен URL Google Apps Script (VITE_GOOGLE_SCRIPT_URL)')
  }
  console.log(SCRIPT_URL)
  const payload = {
    timestamp: new Date().toISOString(),
    name: data.name,
    attending: data.attending ? 'Буду' : 'Не смогу',
    guests_count: data.guests_count ?? '',
    food: data.attending ? formatFood(data.food) : '',
    drinks: data.attending ? formatDrinks(data.drinks) : '',
    comment: data.comment ?? '',
  }

  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })

  const body = await response.json().catch(() => null)

  if (!response.ok || !body?.success) {
    const message =
      typeof body?.error === 'string'
        ? body.error
        : 'Не удалось отправить ответ. Попробуйте позже.'
    throw new Error(message)
  }
}
