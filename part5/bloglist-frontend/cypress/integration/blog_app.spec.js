describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3007/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('form').children().should('have.length', 3)
    cy.get('input[name=username]').parent().should('contain', 'Username')
    cy.get('input[name=password]').parent().should('contain', 'Password')
    cy.get('button').contains('log in')
  })
})