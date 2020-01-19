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

export interface Section {
  title: string
  type: string
  elements: any[] // swap any type to list of possible options
  id: string
}

export enum SectionTypes {
  LIST = 'List',
  TEXT = 'Text',
  SKILL = 'Skill',
  EDUCATION = 'Education',
  REFERENCE = 'Reference',
  PAGEBREAK = 'PageBreak'
}

export interface Education {
  degree: string
  program: string
  university: string
  date: string
  id: string
}

export interface List {
  title: string | null
  extra: string | null
  elements: string[]
  date?: boolean // Used for list extra (date or text)
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