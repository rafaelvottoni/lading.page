//Menu
const menu = document.querySelector('.menu')
const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', () => {
  menu.classList.toggle('show')
})

const form = document.querySelector('form')
const input = document.querySelector('#link')

function error(message) {
  input.value = ''
  form.classList.add('error')
  input.classList.add('error')
  document.querySelector('.error-message').innerHTML = message
}

form.addEventListener('submit', async event => {
  let pageHtml = document.querySelector('body')
  pageHtml.style.cursor = 'wait'
  let linkToShort = input.value
  let url = `https://api.shrtco.de/v2/shorten?url=${linkToShort}`

  if (input.value === '') {
    event.preventDefault()
    error('O campo é obrigatório')
  } else {
    event.preventDefault()
    try {
      await shortenLink(url, linkToShort)
    } catch {
      error('Digite um link válido!')
    }
  }
  pageHtml.style.cursor = 'default'
})

async function shortenLink(linkAPI, linkToShort) {
  const data = await fetch(linkAPI)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })

  const shortenerLink = data.result.full_short_link

  if (!data.ok) {
    error('Digite um link Válido')
  } else {
    const shortenerLinkArea = document.querySelector('.shortened-link')

    shortenerLinkArea.innerHTML = `
      <div class="shortened-links">
        <a class="old-link" target="_blank" href="${linkToShort}">${linkToShort.substr(
      0,
      30
    )}...</a>
        <a class="new-link" target="_blank" href="${shortenerLink}">${shortenerLink}</a>
    </div>

    <button class="button button-copy">Copiar</button>
     `
  }
}
