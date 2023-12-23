// VFS fonts were rebuilt using instructions on https://pdfmake.github.io/docs/0.1/fonts/custom-fonts-client-side/vfs/
// Once the fonts were built I changed the top line of the created file from
// 'this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs =' to 'export const vfs ='
// so we wouldn't run into an error where 'this.pdfMake' is undefined
// All fonts available in vfs_fonts-2 are located in ./fonts here as well
// Currently Italic fonts re-use normal fonts but they are included in the vfs_fonts-2 build
// but no template uses italics right now as well.
const pdfMake = require('pdfmake/build/pdfmake')
const pdfFonts = require('./vfs_fonts-2')
pdfMake.vfs = pdfFonts.vfs

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

export type TemplateOptions = Teres | Cluo | Cogito
export const templateList = [new Teres(), new Cluo(), new Cogito()]

export const colorsList: Colors[] = [
  // Black and White
  {
    primary: '#EEE2D2',
    secondary: '#47474b',
    accent: '#dbdbdb'
  },
  {
    primary: '#C59855',
    secondary: '#47474b',
    accent: '#dbdbdb'
  },
  {
    primary: '#98FB98',
    secondary: '#47474b',
    accent: '#dbdbdb'
  },
  // Default
  {
    primary: '#AFEEEE',
    secondary: '#47474b',
    accent: '#dbdbdb'
  },
  // Default 2
  {
    primary: '#FF6961',
    secondary: '#47474b',
    accent: '#dbdbdb'
  },
  // Default 3
  {
    primary: '#000000',
    secondary: '#47474b',
    accent: '#dbdbdb'
  },
]