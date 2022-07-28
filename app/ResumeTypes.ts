export interface Header {
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  contacts: Contact[]
}

export interface Contact {
  name: string
  value: string
  id: string
}

export interface Education {
  degree: string
  program: string
  university: string
  date: string
  note?: string
  id: string
}

export interface List {
  title: string | null
  extra: string | null
  elements: string[]
  id: string
}

export interface Experience {
  title: string
  extra: string
  company: string
  elements: string[]
  id: string
}

export interface Skill {
  name: string
  levels: boolean[]
  id: string
}

export interface Reference {
  name: string
  occupation: string
  company: string
  companyAddress?: string
  phone?: string
  email?: string
  id: string
}

export interface PageBreak {}

export enum SectionTypes {
  LIST = 'List',
  EXPERIENCE = 'Experience',
  TEXT = 'Text',
  SKILL = 'Skill',
  EDUCATION = 'Education',
  REFERENCE = 'Reference',
  PAGEBREAK = 'PageBreak'
}

export type SectionOption = List | Experience | Skill | Education | Reference | PageBreak

export interface Section {
  title: string
  type: string
  elements: SectionOption[]
  id: string
  date?: boolean // Used for list extra (date or text)
  simple?: boolean // Used for list without title and subtitle
}

export interface SectionEl<T> extends Section {
  elements: T[]
}
