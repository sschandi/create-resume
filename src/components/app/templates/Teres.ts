import Base from './Base'
import { Colors, Font, StyleObject } from './Interfaces'
import { Education } from '../ResumeTypes'

export default class Teres extends Base {
  constructor() {
    const colors: Colors | object = {
      primary: '#00b8a9',
      secondary: '#212121',
      accent: '#9c9c9c'
    }
    const font: Font | object = {
      name: 'Quicksand'
    }
    const styles: StyleObject | object = {
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
    super('Teres', colors, font, styles)
	}
	
	createListTitleAndExtra(title: string, extra: string) {
    return {
      columns: [
        {
          width: '50%',
          ...this.createListTitle(title)
        },
        {
          width: '50%',
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

  createEducation(education: Education) {
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
    ]
  }
}
