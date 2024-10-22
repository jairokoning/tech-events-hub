'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { createEvent } from '@/services/create-event'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

const createEventForm = z.object({
  short_description: z.string().min(1, 'Informe uma curta decrição do evento'),
  content: z.string().min(1, 'Informe o conteúdo'),
  organizer: z.string().min(1, 'Informe o do organizador'),
  techs: z.string().min(1, 'Informe as tecnologias (separado por virgulas)'),
  start_date: z.string().min(1, 'Informe a data início'),
  end_date: z.string().min(1, 'Informe a data final'),
})

type CreateEventForm = z.infer<typeof createEventForm>

export default function CreateEvent() {
  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateEventForm>({
      resolver: zodResolver(createEventForm),
    })

  async function handleCreateEvent(data: CreateEventForm) {
    await createEvent({
      short_description: data.short_description,
      content: data.content,
      organizer: data.organizer,
      techs: data.techs.split(','),
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
    })

    reset()
  }

  return (
    <div className="grid items-center justify-items-center p-4 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="min-w-[480px] flex flex-col gap-8 items-center ">
        <h1>Cadastro de Evento</h1>
        <form
          onSubmit={handleSubmit(handleCreateEvent)}
          className="w-full flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="short_description">
                Curta descrição sobre o evento
              </Label>
              <Input
                id="short_description"
                autoFocus
                placeholder="Semana da Imersão Node/React"
                {...register('short_description')}
              />
              {formState.errors.short_description && (
                <p className="text-sm text-red-400">
                  {formState.errors.short_description.message}
                </p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Input
                id="content"
                placeholder="Que tal construir um app Financeiro de ponta a ponta?"
                {...register('content')}
              />
              {formState.errors.content && (
                <p className="text-sm text-red-400">
                  {formState.errors.content.message}
                </p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="organizer">Organizador</Label>
              <Input
                id="organizer"
                placeholder="Top Tech"
                {...register('organizer')}
              />
              {formState.errors.organizer && (
                <p className="text-sm text-red-400">
                  {formState.errors.organizer.message}
                </p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="techs">Tecnologias (separe por virgulas)</Label>
              <Input
                id="techs"
                placeholder="node.js, react.js, next.js, prismaorm"
                {...register('techs')}
              />
              {formState.errors.techs && (
                <p className="text-sm text-red-400">
                  {formState.errors.techs.message}
                </p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="start_date">Início</Label>
              <Input
                id="start_date"
                placeholder="dd/mm/yyyy"
                {...register('start_date')}
                type="date"
                pattern="\d{2}-\d{2}-\d{4}"
              />
              {formState.errors.start_date && (
                <p className="text-sm text-red-400">
                  {formState.errors.start_date.message}
                </p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="end_date">Final</Label>
              <Input
                id="end_date"
                placeholder=""
                {...register('end_date')}
                type="date"
                pattern="dd/mm/yyyy"
              />
              {formState.errors.end_date && (
                <p className="text-sm text-red-400">
                  {formState.errors.end_date.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-8">
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
