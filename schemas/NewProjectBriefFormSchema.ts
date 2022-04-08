import { array, mixed, number, object, SchemaOf, string } from 'yup'
import { NewProjectBriefForm } from '../interfaces/NewProjectBriefForm.interface'

export const NewProjectBriefFormSchema: SchemaOf<NewProjectBriefForm> = object().shape({
  services: array()
    .of(
      object()
        .shape({
          serviceId: number().required(),
          extras: array().of(string().required()).optional(),
        })
        .required()
    )
    .required()
    .min(1),
  date: string().required(),
  briefName: string().required(),
  content: string().required(),
  assets: mixed().required(),
})