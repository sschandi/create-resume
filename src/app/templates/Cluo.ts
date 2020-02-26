import Base from './Base'
import { Colors, Font, StyleObject } from './Interfaces'
import { Contact } from '../ResumeTypes'

export default class Cluo extends Base {

  constructor() {
    const colors: Colors | object = {
      primary: '#ff5959',
      secondary: '#233142',
      accent: '#4f9da6'
    }
    const font: Font | object = {
      name: 'Roboto',
      headingSize: 18,
      titleSize: 16,
      subtitleSize: 12,
      defaultSize: 11
    }
    const styles: StyleObject | object = {
      header: {
        alignment: 'left'
      },
      footer: {
        alignment: 'right'
      },
      titleMargin: {
        margin: [0, 10, 0, 0]
      },
      listExtraMargin: {
        margin: [0, 1, 0, 3]
      },
      subtitleMargin: {
        margin: [0, 7, 0, 0]
      },
      soloListMargin: {
        margin: [0, 7, 0, 3]
      },
		}
    super('Cluo', colors, font, styles)
  }

  protected createAddress(
    address: string,
    city: string,
    province: string,
    postalCode: string
  ): any[] {
    return [`${address}, ${city}, ${province}, ${postalCode}`]
  }

  createContactHeader(contacts: Contact[]): any[] {
    const col1 = []
    const col2 = []
    for (let i = 0; i < contacts.length; i++) {
      if (i % 2 === 0) {
        col1.push({
          text: [
            { text: `${contacts[i].name.toLocaleUpperCase()}: `, style: 'bold'},
            contacts[i].value
          ],
        })
      } else {
        col2.push({
          text: [
            { text: `${contacts[i].name.toLocaleUpperCase()}: `, style: 'bold'},
            contacts[i].value
          ],
        })
      }
    }
    // contacts.forEach((contact: Contact) => {
    //   contactHeader.push(contact.value)
    // })
    const contactHeader: any[] = [
      {
        columns: [
          {
            width: '50%',
            stack: [...col1]
          },
          {
            width: '50%',
            stack: [...col2]
          }
        ]
      }
    ]
    return contactHeader
  }
}