module.exports = {
  siteMetadata: {
    title: `Q-system`,
    siteUrl: `https://www.yourdomain.tld`
  },
  proxy: {
    prefix: "/",
    url: "https://d5d603o45jf9c91p4q4q.apigw.yandexcloud.net/",
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    {
      resolve: 'gatsby-plugin-styled-components'
    },
    ]
};