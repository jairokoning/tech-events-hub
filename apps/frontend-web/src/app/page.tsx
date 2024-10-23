'use client'
import { University, GraduationCap, CalendarDays } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  type ActiveEventsResponse,
  getActiveEvents,
} from '@/services/get-active-events'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

export default function Home() {
  const [events, setEvents] = useState<ActiveEventsResponse[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await getActiveEvents()
      if (response) setEvents(response)
    })()
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {events.map(event => {
            const formattedStartDate = dayjs(event.start_date).format(
              'D[ de ]MMMM'
            )
            const formattedEndDate = dayjs(event.end_date).format('D[ de ]MMMM')
            return (
              <Card key={event._id} className="max-w-[350px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="size-6 text-gray-900" />
                      {event.short_description}
                    </div>
                    <div className="flex items-center gap-2">
                      <University className="size-6 text-gray-900" />
                      {event.organizer}
                    </div>
                    <div className="mt-1">
                      <hr />
                    </div>
                  </CardTitle>
                  <CardDescription>{event.content}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.techs.map(tech => (
                      <span key={tech}>
                        <Badge>{tech}</Badge>
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <CalendarDays className="size-6 text-gray-900" />
                    <div>
                      <p>de {formattedStartDate}</p>
                      <p>até {formattedEndDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-center items-end flex-grow justify-self-end">
                  <Button>Acessar página oficial</Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
