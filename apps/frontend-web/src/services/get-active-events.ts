export type ActiveEventsResponse = {
  _id: string
  short_description: string
  content: string
  organizer: string
  techs: string[]
  start_date: Date
  end_date: Date
}

export async function getActiveEvents(): Promise<ActiveEventsResponse[]> {
  const response = await fetch('http://localhost:3333/events', {
    method: 'GET',
  })
  const data: ActiveEventsResponse[] = await response.json()
  return data
}
