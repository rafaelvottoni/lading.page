const menu = document.querySelector('.menu')
const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', () => {
  menu.classList.toggle('show')
})

// const copyButton = document.querySelectorAll('.button-copy')

// copyButton.forEach(button => {
//   button.addEventListener('click', copy)
// })

// function copy() {
//   const linkToCopy = document.querySelector('#link-to-copy')

//   const textLinkToCopy = linkToCopy.textContent

//   textLinkToCopy.select()

//   document.execCommand('copy')
// }
