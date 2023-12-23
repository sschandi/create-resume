import { useContext } from 'react'
import UUID from 'uuid/v4'
import { AppContext } from '../contexts/AppContext'
import { Section, SectionTypes } from './ResumeTypes'
import { useTrail, animated } from '@react-spring/web'

type SectionNoId = Omit<Section, 'id'>

const selectOptions: SectionNoId[] = [
  {
    type: SectionTypes.TEXT,
    title: 'Profiel',
    elements: [
      { elements: ['Omschrijf profiel'] }
    ]
  },
  {
    type: SectionTypes.EDUCATION,
    title: 'Opleiding',
    elements: [
      { degree: '', program: '', university: '', date: '' }
    ]
  },
  {
    type: SectionTypes.SKILL,
    title: 'Vaardigheden',
    elements: [
      { name: 'Excel', levels: [ true, true, true, true, false ] },
    ]
  },
  {
    type: SectionTypes.EXPERIENCE,
    title: 'Werkervaring',
    elements: [
      {
        title: 'Bijv. Accountmanager', company: 'Bijv. deBanenSite.nl', extra: 'Jan. 2010 - Aug. 2016', elements: [
          'Bijv. Voerde een onderzoek uit naar de effectiviteit van producten door consumenten te interviewen en evaluatieformulieren te bekijken; de bevindingen hielpen de manager om verbeterpunten te identificeren',
          'Loste 25 telefoontjes van klanten per dag op door vragen over creditcardprogramma s te beantwoorden, wat resulteerde in een betere klantrelatie en minder klachten.'
        ],
      },
    ],
    date: true
  },
  {
    type: SectionTypes.EXPERIENCE,
    title: 'Vrijwilligerswerk',
    elements: [
      {
        title: 'Bijv. Donaties', company: 'Bijv. De Voedselbank', extra: 'Jan. 2010 - Aug. 2012', elements: [
          'Bijv. Werkte samen met 12 medewerkers aan het opzetten en uitvoeren van een donatiewedstrijd voor de voedselbank, wat resulteerde in een toename van 28% van het aantal donaties.',
        ],
      },
    ],
    date: true
  },
  {
    type: SectionTypes.LIST,
    title: 'Portfolio',
    elements: [
      {
        title: 'Bijv. Innovatie expert', extra: 'Bijv. Verbeterplannen maken', elements: [
          'Bijv. Ontwierp en implementeerde mijn verbeter project om het verzamelen van proefmonsters te versnellen, waardoor meer dan €100.000 per jaar wordt bespaard in vergelijking met handmatig verzamelen.'
        ],
      }
    ],
    date: false
  },
  {
    type: SectionTypes.LIST,
    title: 'Prestaties',
    elements: [
      {
        elements: ['Bijv. Een klantbehoud programma gestart, wat resulteerde in een 70% hoger retentie percentage.']
      }
    ],
    simple: true,
  },
  {
    type: SectionTypes.REFERENCE,
    title: 'Referenties',
    elements: [
      {
        name: 'Naam contactpersoon',
        occupation: 'Functie contactpersoon',
        company: 'Bedrijfsnaam',
        companyAddress: 'Bedrijfsadres',
        phone: 'Zakelijk telefoonnummer contactpersoon',
        email: 'E-mailadres contactpersoon',
      }
    ]
  }
]

const customSelectOptions = [
  {
    type: SectionTypes.LIST,
    title: 'Datalijst',
    elements: [{ title: '', extra: '', elements: [''] }],
    date: true
  },
  {
    type: SectionTypes.LIST,
    title: 'Titellijst',
    elements: [{ title: '', extra: '', elements: [''] }],
    date: false
  },
  {
    type: SectionTypes.LIST,
    title: 'Lijst',
    elements: [{ title: '', extra: '', elements: [''] }],
    simple: true
  },
  {
    type: SectionTypes.TEXT,
    title: 'Tekstblok',
    elements: [{ elements: [''] }]
  },
  {
    type: SectionTypes.SKILL,
    title: 'Competenties',
    elements: [
      { name: '', levels: [ true, true, true, true, false ] },
      { name: 'competenties', levels: [ true, true, true, false, false ] }
    ]
  },
  {
    type: SectionTypes.PAGEBREAK,
    title: 'Extra pagina',
    elements: [],
  }
]

const SelectContent: React.FC<{ scrollToBottom: () => void }> = ({ scrollToBottom }) => {
  const { addSection } = useContext(AppContext)
  const add = (section: SectionNoId) => {
    // Create unique copy of elements instead of passing reference
    const sectionWithIdElements = section.elements.map((el) => ({ ...el, id: UUID() }))
    const sectionWithId = { ...section, id: UUID(), elements: sectionWithIdElements }
    addSection(sectionWithId)
    scrollToBottom()
  }

  const springOptions = useTrail(selectOptions.length, {
    config: { mass: 2, tension: 4000, friction: 200 },
    opacity: 1,
    from: { opacity: 0 }
  })
  const springCustomOptions = useTrail(customSelectOptions.length, {
    config: { mass: 2, tension: 4000, friction: 200 },
    opacity: 1,
    from: { opacity: 0 }
  })

  return (
    <div className="content__select">
      <h3>CV opstellen</h3>
      <div className="content__select--items">
        {springOptions.map(({ ...rest }, index) => {
          return (
            <animated.button
              key={index}
              style={{ ...rest }}
              className="btn"
              onClick={() => add(selectOptions[index])}
            >
              {selectOptions[index].title}
            </animated.button>
          )
        })}
      </div>
      <h4></h4>
      <div className="content__select--items">
      {springCustomOptions.map(({ ...rest }, index) => {
          return (
            <animated.button
              key={index}
              style={{ ...rest }}
              className="btn"
              onClick={() => add(customSelectOptions[index])}
            >
              {customSelectOptions[index].title}
            </animated.button>
          )
        })}
      </div>
    </div>
  )
}

export default SelectContent