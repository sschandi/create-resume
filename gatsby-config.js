module.exports = {
  siteMetadata: {
    title: `Create Resume`,
    description: `Free, Private, Simple PDF Resume Generator`,
    author: `sschandi`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Create Resume`,
        short_name: `Create Resume`,
        start_url: `/`,
        background_color: `#39648A`,
        theme_color: `#39648A`,
        display: `minimal-ui`,
        icon: `src/images/cr-logo.inline.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#39648A`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
