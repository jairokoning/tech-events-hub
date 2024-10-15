import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type EventDocument = Event & Document

export type EventProps = {
  content: string
  screen_name: string
}

@Schema({ timestamps: true })
export class Event {
  constructor(props: EventProps) {
    Object.assign(this, props)
  }

  @Prop({ required: true })
  short_description: string

  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  organizer: string

  @Prop({ required: true })
  techs: Array<string>

  @Prop({ required: true })
  start_date: Date

  @Prop({ required: true })
  end_date: Date
}

export const EventSchema = SchemaFactory.createForClass(Event)
