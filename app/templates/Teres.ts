import Base from './Base'
import { Colors, Font, StyleObject } from './Interfaces'
import { Education } from '../ResumeTypes'

export default class Teres extends Base {
  constructor() {
    const colors: Colors= {
      primary: '#0050b8',
      secondary: '#000000',
      accent: '#dbdbdb'
    }
    const font: Partial<Font> = {
      name: 'Quicksand'
    }
    const styles: Partial<StyleObject> = {
      header: {
        alignment: 'center'
      },
      footer: {
        alignment: 'center'
      },
      titleMargin: {
        margin: [0, 7, 0, 0]
      },
      subtitle: {},
      subtitleMargin: {
        margin: [0, 7, 0, 3]
      },
      listExtra: {
        alignment: 'right'
      },
      listExtraMargin: {
        margin: [0, 7, 0, 3]
      },
      bold: {
        bold: true
      },
      skillMargin: {
        margin: [0, 7, 0, 0]
      },
      listMargin: {
        margin: [10, 0]
      },
      soloListMargin: {
        margin: [10, 7, 10, 3]
      }
    }
    super('Commercieel', colors, font, styles)
	}
	
	createListTitleAndExtra(title: string, extra: string): Record<string, unknown> {
    return {
      columns: [
        {
          width: '75%',
          ...this.createListTitle(title)
        },
        {
          width: '25%',
          ...this.createListExtra(extra)
        }
      ]
    }
  }

  protected renderEducation(title: string, elements: Education[]): any[] {
    const result = []
    result.push(this.createTitle(title))
    elements.forEach(element => {
      const stack = this.createEducation(element)
      result.push({ stack, style: 'subtitleMargin', unbreakable: true })
    })
    return result
  }

  createEducation(education: Education): any[] {
    const title = {
      columns: [
        { width: '50%', text: education.degree },
        { width: '50%', text: education.date, alignment: 'right' }
      ]
    }
    return [
      title,
      {
        text: education.program,
        style: ['bold']
      },
      education.university,
      ...education.note
        ? [ { text: education.note, style: { fontSize: this.font.defaultSize - 1 }, margin: [0, 1, 0, 0] }]
        : []
    ]
  }
}
