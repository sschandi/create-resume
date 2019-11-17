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
}

export interface Section {
  title: string
  type: string
  elements: any[] // swap any type to list of possible options
}

export interface Education {
  degree: string
  program: string
  university: string
  date: string
}

export interface List {
  title: string | null
  extra: string | null
  elements: string[]
}

export interface Skill {
  name: string
  levels: boolean[]
}

export interface Reference {
  name: string
  occupation: string
  company: string
  companyAddress?: string
  phone?: string
  email?: string
}