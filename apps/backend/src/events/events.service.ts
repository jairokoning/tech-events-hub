import { Injectable } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from './entities/event.entity'
import { Model } from 'mongoose'

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>
  ) {}

  async create(createEventDto: CreateEventDto) {
    const eventDoc = new this.eventModel(createEventDto)
    await eventDoc.save()
    return eventDoc
  }

  findAll() {
    return 'This action returns all events'
  }

  findOne(id: number) {
    return `This action returns a #${id} event`
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`
  }

  remove(id: number) {
    return `This action removes a #${id} event`
  }
}
