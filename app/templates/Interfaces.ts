export interface StyleObject {
	header: Styles
	footer: Styles
	heading: Styles
	title: Styles
	titleMargin: Styles
	subtitle: Styles
	subtitleMargin: Styles
	listExtra: Styles
	listExtraMargin: Styles
	bold: Styles
	skillMargin: Styles
	listMargin: Styles
	soloListMargin: Styles
	skillRating: SkillRating
  [key: string]: Styles | SkillRating
}

export interface Styles {
	color?: string
	margin?: number[]
	bold?: boolean
	alignment?: string
	fontSize?: number
	lineHeight?: number
}

interface SkillRating {
	// ellipse or rect
	type: 'ellipse' | 'rect'
	width: number
	height: number
	x: number
	y: number
	// only for rect
	radius?: number
}

export interface Font {
  name: string
  headingSize: number
  titleSize: number
  subtitleSize: number
  defaultSize: number
}

export interface Colors {
  primary: string
  secondary: string
  accent: string
  [key: string]: string
}

export enum PageSizes {
	A4 = 'A4',
	LETTER = 'LETTER',
	LEGAL = 'LEGAL',
}

export interface DefaultStyle {
	font: string
	fontSize: number
	color: string
}

export interface RenderResult {
	pageSize: PageSizes
	header: any
	content: any[]
	footer: any
	defaultStyle: DefaultStyle,
	styles: StyleObject,
	info: {
		title: string
		author: string
		subject: string
		keywords: string
		creator: string
		serialized: string
	}
}
