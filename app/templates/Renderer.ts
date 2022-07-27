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
    primary: '#000000',
    secondary: '#000000',
    accent: '#9c9c9c'
  },
  {
    primary: '#5a6d8b',
    secondary: '#868686',
    accent: '#e4c6be'
  },
  {
    primary: '#7cbfea',
    secondary: '#626262',
    accent: '#e3e3e3'
  },
  // Default Teres
  {
    primary: '#00b8a9',
    secondary: '#212121',
    accent: '#9c9c9c'
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
    accent: '#e3e3e3'
  },
]