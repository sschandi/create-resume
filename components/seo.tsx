import Head from 'next/head'

import Banner from '../images/create-resume-banner.png'

interface Props {
  title?: string
  description?: string
  image?: string
  type?: string
  // twitterCreator: string
}

const urlBase = 'https://createresu.me'

const defaults = {
  title: 'deBanenSite.nl',
  description: 'Maak gratis en binnen enkele minuten een professioneel cv zonder je privacy op te offeren.',
  image: Banner.src,
  type: 'website',
  // twitterCreator: ''
}

const SEO: React.FC<Props> = ({ description, title, image, type }) => {
  const fullTitle = title ? `${title} | ${defaults.title}` : defaults.title

  const metaDescription = description || defaults.description
  const metaImage = `${urlBase}${image || defaults.image}`

  return (
    <Head>
      <title>{fullTitle}</title>

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="icons/safari-pinned-tab.svg" color="#2d9cca" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} key="title" />
      <meta property="og:description" content={metaDescription} key="og:description" />
      <meta property="og:image" content={metaImage} key="og:image" />
      <meta property="og:site_name" content={defaults.title} key="og:site_name" />
      <meta property="og:type" content={type || defaults.type} key="og:type" />
      <meta property="twitter:card" content="summary_large_image" key="twitter:card" />
      {/* Future: add twitter handle? */}
      {/* {defaults.twitterCreator && <meta property="twitter:creator" content={defaults.twitterCreator} key="twitter:creator" />} */}
    </Head>
  )
}

export default SEO
