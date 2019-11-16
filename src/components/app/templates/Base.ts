import { StyleObject, Font, Colors, PageSizes } from './Interfaces'
import List from '@/resume/List'
import Section from '@/resume/Section'
import Header from '@/resume/Header'
import Contact from '@/resume/Contact'
import Reference from '@/resume/Reference'
import Education from '@/resume/Education'
import Skill from '@/resume/Skill'

export default class Base {
  public name: string = 'Base'
  public id: number = NaN
  public version: number = 1
  public pageSize = PageSizes.LETTER
  public font: Font = {
    name: 'Roboto',
    headingSize: 16,
    titleSize: 14,
    subtitleSize: 12,
    defaultSize: 11
  }
  public colors: Colors = {
    primary: '#00b8a9',
    secondary: '#212121',
    accent: 'grey'
  }
  public styles: StyleObject = {
    header: {},
    footer: {},
    heading: {},
    title: {},
    titleMargin: {},
    subtitle: {},
    subtitleMargin: {},
    listExtra: {},
    listExtraMargin: {},
    listMargin: {},
    soloListMargin: {},
    bold: {
      bold: true
    },
    skillMargin: {
      margin: [0, 7, 0, 0]
    },
    skillRating: {
      type: 'ellipse',
      width: 6,
      height: 6,
      x: 20,
      y: 13
    }
  }

  constructor(
    name: string,
    id: number,
    colors: Colors | object,
    font: Font | object,
    styles: StyleObject | object
  ) {
    this.setColors(colors)
    this.setFont(font)
    this.setStyles(styles)
  }

  get defaultStyle(): object {
    return {
      font: this.font.name,
      fontSize: this.font.defaultSize,
      color: this.colors.secondary
    }
  }

  public render(content: Section[], header: Header): object {
    console.log(content, header)
    return {
      pageSize: this.pageSize,
      header: this.renderPageHeader(header.name),
      content: [this.renderHeader(header), ...this.renderContent(content)],
      footer: this.renderPageFooter(),
      defaultStyle: this.defaultStyle,
      styles: this.styles,
      info: {
        title: `Resume - ${header.name}`,
        author: header.name,
        subject: 'Resume',
        keywords: '',
        creator: 'Resume Builder'
      }
    }
  }

  public setFont(font: Font | object) {
    this.font = { ...this.font, ...font }
  }

  public setColors(colors: Colors | object) {
    this.colors = { ...this.colors, ...colors }
  }

  public setStyles(styles: StyleObject | object) {
    this.styles = { ...this.styles, ...styles }
  }

  public setPageSize(pageSize: PageSizes) {
    this.pageSize = pageSize
  }

  public renderPageHeader(text: string): Function {
    const pageHeader = (
      currentPage: number,
      pageCount: number,
      pageSize: object
    ) => {
      if (currentPage !== 1) {
        return this.createPageHeader(text)
      }
      return []
    }
    return pageHeader
  }

  protected createPageHeader(text: string): object {
    return {
      text,
      style: ['heading', 'header'],
      margin: [40, 15, 40, 0],
      // Large heading sizes won't render, requiring an entire override
      fontSize: this.font.headingSize > 16 ? 16 : this.font.headingSize,
      color: this.colors.primary
    }
  }

  protected renderPageFooter(): Function {
    const pageFooter = (
      currentPage: number,
      pageCount: number,
      pageSize: object
    ) => {
      if (pageCount > 1) {
        return {
          text: currentPage,
          style: 'footer',
          margin: [15, 15, 15, 0]
        }
      }
      return []
    }
    return pageFooter
  }

  protected renderContent(sections: Section[]): any[] {
    let result: object[] = []
    sections.forEach((item: Section) => {
      if (item.type === 'List' || item.type === 'Text') {
        // result.push(this.renderListSection(item.title, item.elements))
        result = [
          ...result,
          ...this.renderListAndText(item.title, item.elements, item.type)
        ]
      } else if (item.type === 'Reference') {
        result = [
          ...result,
          ...this.renderReferences(item.title, item.elements)
        ]
      } else if (item.type === 'Skill') {
        result = [...result, ...this.renderSkills(item.title, item.elements)]
      } else if (item.type === 'Education') {
        result = [...result, ...this.renderEducation(item.title, item.elements)]
      } else if (item.type === 'pageBreak') {
        result = [...result, ...this.renderPageBreak()]
      }
    })
    return result
  }

  protected renderPageBreak(): any[] {
    return [{ text: '', pageBreak: 'before' }]
  }

  protected createTitle(title: string): object {
    return {
      text: title,
      style: ['title', 'titleMargin'],
      fontSize: this.font.titleSize,
      color: this.colors.primary,
      headlineLevel: 1
    }
  }

  protected renderHeader(header: Header): object {
    const address: any[] = this.createAddress(
      header.address,
      header.city,
      header.province,
      header.postalCode
    )
    const contactHeader: any[] = this.createContactHeader(header.contacts)

    return {
      stack: [
        {
          text: header.name,
          style: 'heading',
          fontSize: this.font.headingSize,
          color: this.colors.primary
        },
        [...address],
        ...[contactHeader]
      ],
      style: 'header'
    }
  }

  protected createAddress(
    address: string,
    city: string,
    province: string,
    postalCode: string
  ): any[] {
    return [address, `${city} ${province} ${postalCode}`]
  }

  protected createContactHeader(contacts: Contact[]): any[] {
    const contactHeader: string[] = []
    contacts.forEach((contact: Contact) => {
      contactHeader.push(contact.value)
    })
    return contactHeader
  }

  protected renderListAndText(
    title: string,
    elements: List[],
    type: string
  ): any[] {
    const result = []
    result.push(this.createTitle(title))
    elements.forEach(element => {
      const stack = []
      if (element.title && element.extra) {
        stack.push(this.createListTitleAndExtra(element.title, element.extra))
      } else if (element.title) {
        stack.push(this.createListTitle(element.title))
      } else if (element.extra) {
        stack.push(this.createListExtra(element.extra))
      }
      if (type === 'List') {
        stack.push({
          ul: [...element.elements],
          style:
            !element.title && !element.extra ? 'soloListMargin' : 'listMargin',
          markerColor: this.colors.primary
        })
      } else {
        stack.push({
          stack: [...element.elements],
          style:
            !element.title && !element.extra ? 'soloListMargin' : 'listMargin'
        })
      }
      result.push({ stack, unbreakable: true })
    })
    return result
  }

  protected createListTitle(title: string): object {
    return {
      text: title,
      style: ['bold', 'subtitle', 'subtitleMargin'],
      fontSize: this.font.subtitleSize
    }
  }

  protected createListExtra(extra: string): object {
    return {
      text: extra,
      style: ['listExtra', 'listExtraMargin']
    }
  }

  protected createListTitleAndExtra(title: string, extra: string): object {
    return {
      stack: [this.createListTitle(title), this.createListExtra(extra)]
    }
  }

  protected renderReferences(title: string, elements: Reference[]): any[] {
    const result = []
    result.push({
      ...this.createTitle(title),
      pageBreak: 'before'
    })
    elements.forEach(element => {
      const stack = this.createReference(element)
      result.push({ stack, style: 'subtitleMargin', unbreakable: true })
    })
    return result
  }

  protected createReference(reference: Reference): any[] {
    return [
      {
        text: reference.name,
        style: ['bold', 'subtitle'],
        fontSize: this.font.subtitleSize
      },
      reference.occupation,
      { text: reference.company, style: ['bold'] },
      reference.companyAddress,
      reference.phone,
      reference.email
    ]
  }

  protected renderEducation(title: string, elements: Education[]): any[] {
    const result = []
    result.push(this.createTitle(title))
    const educationLeft = []
    const educationRight = []
    for (let i = 0; i < elements.length; i++) {
      const stack = this.createEducation(elements[i])
      if (i % 2 === 0) {
        educationLeft.push({
          stack,
          style: 'subtitleMargin',
          unbreakable: true
        })
      } else {
        educationRight.push({
          stack,
          style: 'subtitleMargin',
          unbreakable: true
        })
      }
    }
    result.push({
      columns: [
        { width: '45%', stack: educationLeft },
        { width: '10%', text: '' },
        { width: '45%', stack: educationRight }
      ]
    })
    return result
  }

  protected createEducation(education: Education): any[] {
    return [
      education.degree,
      {
        text: education.program,
        style: ['bold']
      },
      education.university,
      education.date
    ]
  }

  protected renderSkills(title: string, elements: Skill[]): any[] {
    const result: any[] = []
    const skillsLeft: any[] = []
    const skillsRight: any[] = []

    result.push(this.createTitle(title))
    for (let i = 0; i < elements.length; i++) {
      const skillRatings = []
      for (let j = 0; j < elements[i].levels.length; j++) {
        const color = elements[i].levels[j]
          ? this.colors.primary
          : this.colors.accent
        const style = this.styles.skillRating
        skillRatings.push(
          this.createSkillRating(
            style.type,
            color,
            style.width,
            style.height,
            style.x * j,
            style.y,
            style.radius ? style.radius : 0
          )
        )
      }
      const skill = {
        columns: [
          {
            width: '45%',
            text: elements[i].name,
            style: ['skillMargin'],
            alignment: 'right'
          },
          { width: '10%', text: '' },
          {
            width: '45%',
            canvas: skillRatings
          }
        ]
      }
      if (i % 2 === 0) {
        skillsLeft.push(skill)
      } else {
        skillsRight.push(skill)
      }
    }
    const stack = [
      {
        columns: [
          {
            width: '50%',
            stack: [...skillsLeft]
          },
          {
            width: '50%',
            stack: [...skillsRight]
          }
        ]
      }
    ]
    result.push({ stack, unbreakable: true })
    return result
  }

  protected createSkillRating(
    type: string,
    color: string,
    width: number,
    height: number,
    x: number,
    y: number,
    radius: number
  ): object {
    if (type === 'ellipse') {
      return {
        type,
        x,
        y,
        color,
        r1: width,
        r2: height
      }
    } else if (type === 'rect') {
      return {
        type,
        x,
        y,
        color,
        w: width,
        h: height,
        r: radius
      }
    }
    return {}
  }
}
