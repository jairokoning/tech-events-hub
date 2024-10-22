interface CreateEventRequest {
  short_description: string
  content: string
  organizer: string
  techs: string[]
  start_date: Date
  end_date: Date
}

export async function createEvent({
  short_description,
  content,
  organizer,
  techs,
  start_date,
  end_date,
}: CreateEventRequest) {
  await fetch('http://localhost:3333/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      short_description,
      content,
      organizer,
      techs,
      start_date,
      end_date,
    }),
  })
}
