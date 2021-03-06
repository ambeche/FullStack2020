const { node } = require('prop-types')

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3007/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('postBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3007/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedInUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3007/api/users', {
    username,
    name,
    password,
  })
})

Cypress.Commands.add('getText', ({ node, element, alias }) => {
  cy.wrap(node).find(element).invoke('text').as(alias)
})
