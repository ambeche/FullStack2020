describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3007/api/testing/reset')
    cy.request('POST', 'http://localhost:3007/api/users', {
      username: 'tamanji',
      name: 'Tamanji Che',
      password: 'blogApp',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('form').children().should('have.length', 3)
    cy.get('input[name=username]').parent().should('contain', 'Username')
    cy.get('input[name=password]').parent().should('contain', 'Password')
    cy.get('button').contains('log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name=username]').type('tamanji')
      cy.get('input[name=password]').type('blogApp')
      cy.get('button').should('contain', 'log in').click()

      cy.contains('Tamanji Che is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name=username]').type('tamanji')
      cy.get('input[name=password]').type('wrong password')
      cy.get('button').should('contain', 'log in').click()

      cy.get('.notice')
        .should('contain', 'Wrong password or username')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'background-color', 'rgb(240, 240, 240)')

      cy.get('html').should('not.contain', 'Tamanji Che is logged in')
    })
  })
})
