const pdfMake = require('pdfmake/build/pdfmake')
const pdfFonts = require('./vfs_fonts')
pdfMake.vfs = pdfFonts
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Regular.ttf',
    bolditalics: 'Roboto-Regular.ttf'
  },
  OpenSans: {
    normal: 'OpenSans-Regular.ttf',
    bold: 'OpenSans-Bold.ttf',
    italics: 'OpenSans-Regular.ttf',
    bolditalics: 'OpenSans-Regular.ttf'
  },
  CrimsonText: {
    normal: 'CrimsonText-Regular.ttf',
    bold: 'CrimsonText-Bold.ttf',
    italics: 'CrimsonText-Regular.ttf',
    bolditalics: 'CrimsonText-Regular.ttf'
  },
  Quicksand: {
    normal: 'Quicksand-Regular.ttf',
    bold: 'Quicksand-Medium.ttf',
    italics: 'Quicksand-Regular.ttf',
    bolditalics: 'Quicksand-Regular.ttf'
  }
}
import { Colors } from './Interfaces'
import Teres from './Teres'
import Cluo from './Cluo'
import Cogito from './Cogito'

export const createPDF = pdfMake.createPdf

export const templateList = [new Teres(), new Cluo(), new Cogito()]

export const colorsList: Colors[] = [
  // Default Teres
  {
    primary: '#00b8a9',
    secondary: '#212121',
    accent: 'grey'
  },
  // Default Cluo
  {
    primary: '#ff5959',
    secondary: '#233142',
    accent: '#4f9da6'
  },
  // Default Cogito
  {
    primary: '#053f5e',
    secondary: '#393e46',
    accent: '#6effbf'
  }
]