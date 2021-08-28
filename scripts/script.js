//Menu
const menu = document.querySelector('.menu')
const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', () => {
  menu.classList.toggle('show')
})

//Validade form
const form = document.querySelector('form')

form.addEventListener('submit', event => {
  const input = document.querySelector('#link')
  if (input.value === '') {
    event.preventDefault()
    input.setAttribute('placeholder', 'Digite um link!')
    form.classList.add('error')
    input.classList.add('error')
  }
})
