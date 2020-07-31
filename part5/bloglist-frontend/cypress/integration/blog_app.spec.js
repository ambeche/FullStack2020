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
      cy.contains('log in').click()

      cy.contains('Tamanji Che is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name=username]').type('tamanji')
      cy.get('input[name=password]').type('wrong password')
      cy.contains('log in').click()

      cy.get('.notice')
        .should('contain', 'Wrong password or username')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'background-color', 'rgb(240, 240, 240)')

      cy.get('html').should('not.contain', 'Tamanji Che is logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tamanji', password: 'blogApp' })
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('input[name=title]').type('Learning end-to-end testing with cypress')
      cy.get('input[name=author]').type('Tamanji Che')
      cy.get('input[name=url]').type('https://github.com/ambeche/FullStack2020/tree/master/part5/bloglist-frontend')
      cy.get('#post-blog').click()

      cy.get('.blogs').contains('Learning end-to-end testing with cypress')
    })

    describe('and some blogs already exist', function() {
      beforeEach(function() {
        cy.postBlog({ title: 'end to end testing', author: 'Tamanji Che', url: 'http://localhost:3003/phonebook' })
        cy.postBlog({ title: 'redux with react', author: 'Moffi Ebite', url: 'http://localhost:3003/redux' })
      })
  
      it('A blog can be liked', function() {
        cy.contains('redux with react').parent().as('parentDiv')
        cy.get('@parentDiv').find('#toggle').click()
        cy.get('@parentDiv').should('contain', 'likes 0')

        cy.get('@parentDiv').find('#like-blog').dblclick()
        
        cy.get('@parentDiv').should('contain', 'likes 2')
      })
    })
  })
})
