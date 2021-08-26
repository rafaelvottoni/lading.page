const axios = require('axios')

module.exports = {
  async open(req, res) {
    const data = null
    res.render('index', { data })
  },

  async shortener(req, res) {
    const link = req.query.link
    const arrayLink = Array.from(link)
    const sliceArrayLink = arrayLink.slice(0, 30)
    const resumedArrayLink = sliceArrayLink.join('')

    const { data } = await axios(`https://api.shrtco.de/v2/shorten?url=${link}`)

    res.render('index', {
      data: data,
      link: link,
      resumedArrayLink: resumedArrayLink
    })
  }
}
