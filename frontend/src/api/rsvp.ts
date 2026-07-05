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

export async function submitRsvp(data: RsvpFormData): Promise<void> {
  const response = await fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const detail = body.detail
    if (typeof detail === 'string') {
      throw new Error(detail)
    }
    if (Array.isArray(detail)) {
      throw new Error(detail.map((d: { msg: string }) => d.msg).join(', '))
    }
    throw new Error('Не удалось отправить ответ. Попробуйте позже.')
  }
}
