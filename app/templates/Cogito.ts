import Base from './Base'
import { Colors, Font, StyleObject } from './Interfaces'
import { Header, Contact } from '../ResumeTypes'

export default class Cogito extends Base {
	constructor() {
    const colors: Colors = {
      primary: '#49494b',
      secondary: '#000000',
      accent: '#dbdbdb'
    }
    const font: Partial<Font> = {
			name: 'OpenSans',
			headingSize: 24
    }
    const styles: Partial<StyleObject> = {
      header: {
        alignment: 'right'
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
        alignment: 'left'
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
    super('Financieel', colors, font, styles)
	}

	protected renderHeader(header: Header): Record<string, unknown> {
    const address = this.createAddress(
      header.address,
      header.city,
      header.province,
      header.postalCode
    )
    const contactHeader = this.createContactHeader(header.contacts)

    return {
      columns: [
        {
					width: '50%',
          text: header.name,
          style: 'heading',
          fontSize: this.font.headingSize,
					color: this.colors.primary,
					alignment: 'left'
				},
				{
					width: '50%',
					stack: [...address, ...contactHeader],
					alignment: 'right'
				}
      ],
      style: 'header'
    }
  }

  protected createAddress(
    address: string,
    city: string,
    province: string,
    postalCode: string
  ): string[] {
    return [address, `${city} ${province} ${postalCode}`]
  }

  protected createContactHeader(contacts: Contact[]): any[] {
    const contactHeader: string[] = []
    contacts.forEach((contact: Contact) => {
      contactHeader.push(contact.value)
    })
    return contactHeader
  }

  protected createListTitleAndExtra(title: string, extra: string): Record<string, unknown> {
    return {
      text: [this.createListTitle(title), '  ', this.createListExtra(extra)],
      style: ['subtitle', 'subtitleMargin'],
    }
  }

  // protected createTitle(title: string): object {
  //   return {
  //     stack: [
  //       {
  //         canvas: [
  //           {
  //             type: 'line',
  //             x1: 0,
  //             x2: 100,
  //             y1: 10,
  //             y2: 10,
  //             lineWidth: 1,
  //             lineColor: this.colors.accent,
  //             lineCap: 'round'
  //           }
  //         ]
  //       },
  //       {
  //         text: title,
  //         style: ['title', 'titleMargin'],
  //         fontSize: this.font.titleSize,
  //         color: this.colors.primary,
  //         headlineLevel: 1
  //       }
  //     ],
  //     unbreakable: true
  //   }
  // }
}