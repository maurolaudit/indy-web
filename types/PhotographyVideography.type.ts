import { TicketFile } from './TicketFile.type'

export type PhotographyVideography = {
  id: number
  serviceType: string
  shootTitle: string
  shootDate: Date
  eventName: string
  bookingType: string
  outputs?: Array<string>
  backdrops?: string | null
  contactName?: string | null
  contactNumber?: string | null
  departmentManager?: string | null
  jobDescription?: string | null
  location?: string | null
  numberOfDishes?: string | null
  preferredDueDate: Date
  startTime?: string | null
  stylingRequired?: string | null
  shootType?: Array<string>
  files?: Array<TicketFile>
}
