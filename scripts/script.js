//Menu
const menu = document.querySelector('.menu')
const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', () => {
  menu.classList.toggle('show')
})

const form = document.querySelector('form')
const input = document.querySelector('#link')

//array links
let links

form.addEventListener('submit', async event => {
  let pageHtml = document.querySelector('body')
  pageHtml.style.cursor = 'wait'
  input.style.opacity = '0.5'
  let linkToShort = input.value
  let url = `https://api.shrtco.de/v2/shorten?url=${linkToShort}`

  if (input.value === '') {
    event.preventDefault()
    error('O campo é obrigatório')
  } else {
    event.preventDefault()
    try {
      const newLink = await shortenLink(url)
      if (newLink) {
        saveLinksInLocalStorage(linkToShort, newLink)
      }
      showLinks()
    } catch {
      error('Digite um link válido!')
    }
  }
  pageHtml.style.cursor = 'default'
  input.style.opacity = '1'
})

function error(message) {
  input.value = ''
  form.classList.add('error')
  input.classList.add('error')
  document.querySelector('.error-message').innerHTML = message
}

async function shortenLink(linkAPI) {
  const data = await fetch(linkAPI)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })

  const shortenerLink = data.result.full_short_link

  return shortenerLink
}

function saveLinksInLocalStorage(oldLink, newLink) {
  if (localStorage.getItem('links') === null) {
    links = []
  } else {
    links = JSON.parse(localStorage.getItem('links'))
  }

  links.unshift({ oldLink: oldLink, newLink: newLink })
  localStorage.setItem('links', JSON.stringify(links))
}

function showLinks() {
  if (localStorage.getItem('links') === null) {
    links = []
  } else {
    links = JSON.parse(localStorage.getItem('links'))
  }

  //remove links html
  const isLinksInHTML = document.querySelectorAll('.shortened-link')
  if (isLinksInHTML) {
    isLinksInHTML.forEach(link => {
      link.remove()
    })
  }

  //add links html
  links.forEach(link => {
    const shortenerLinkArea = document.querySelector('#shortener .container')
    const divShortenedLink = document.createElement('div')
    divShortenedLink.innerHTML = `
    <div class="shortened-links">
      <a class="old-link" target="_blank" href="${
        link.oldLink
      }">${link.oldLink.substr(0, 30)}...</a>
      <a class="new-link" target="_blank" href="${link.newLink}">${
      link.newLink
    }</a>
  </div>

  <button class="button button-copy">Copiar</button>
   `

    divShortenedLink.className = 'shortened-link'
    shortenerLinkArea.appendChild(divShortenedLink)
  })
}

const buttonCopy = document.querySelector('#shortener .container')

buttonCopy.addEventListener('click', event => {
  const isButton = event.target.classList.contains('button-copy')
  const button = event.target
  if (isButton) {
    button.style.backgroundColor = 'var(--dark-violet)'
    button.innerText = `Copiado!`
    setTimeout(() => {
      button.style.backgroundColor = 'var(--cyan)'
      button.innerText = `Copiar`
    }, 5000)

    const linkToCopy =
      button.previousElementSibling.children[1].getAttribute('href')

    navigator.clipboard.writeText(linkToCopy)
  }
})

document.addEventListener('DOMContentLoaded', showLinks)
