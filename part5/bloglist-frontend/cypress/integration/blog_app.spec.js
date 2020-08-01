describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3007/api/testing/reset')
    cy.createUser({ username: 'tamanji', name: 'Tamanji Che', password: 'blogApp' })
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tamanji', password: 'blogApp' })
    })

    it('A blog can be created', function () {
      cy.contains('create blog').click()
      cy.get('input[name=title]').type(
        'Learning end-to-end testing with cypress'
      )
      cy.get('input[name=author]').type('Tamanji Che')
      cy.get('input[name=url]').type(
        'https://github.com/ambeche/FullStack2020/tree/master/part5/bloglist-frontend'
      )
      cy.get('#post-blog').click()

      cy.get('.blogs').contains('Learning end-to-end testing with cypress')
    })

    describe('and some blogs already exist', function () {
      beforeEach(function () {
        cy.postBlog({
          title: 'end to end testing',
          author: 'Tamanji Che',
          url: 'http://localhost:3003/phonebook',
        })
        cy.postBlog({
          title: 'redux with react',
          author: 'Tamanji Che',
          url: 'http://localhost:3003/redux',
        })
        cy.postBlog({
          title: 'React Routers and Navigation',
          author: 'Tamanji Che',
          url: 'https://restaux.herokuapp.com',
        })
        
        cy.get('.toggle').should('contain', 'view').click({ multiple: true }) // toggles details view of blogs
      })

      it('A blog can be liked', function () {
        cy.contains('redux with react').parent().as('parentDiv')

        cy.get('@parentDiv').find('#num-of-likes')
        .then(likes => {
          const likesBeforeClick = parseFloat(likes.text())

          cy.get("@parentDiv").find("#like-blog").click()
            .then( () => {
              const likesAfterClick = parseFloat(likes.text())

              expect(likesAfterClick).to.eq(likesBeforeClick + 1)
            })
        })
        
        cy.get("@parentDiv").should("contain", "likes 1")
      })

      describe('a blog can be deleted', function () {
        it('delete button is shown to the blog creator, operation succeeds.', function () {
          cy.get('.blogs').should('have.length', 3) // 3 blogs counted initially
          cy.contains('React Routers and Navigation')
            .parent()
            .find('#delete-blog')
            .click()

          cy.get('.blogs').should('have.length', 2) // 2 blogs after deletion
          cy.get('html').should('not.contain', 'React Routers and Navigation')
          cy.get('.notice')
            .should('contain', 'Blog deletion successful')
            .and('have.css', 'color', 'rgb(0, 128, 0)')
        })

        describe('a new user cannot delete another users blog', function () {
          beforeEach(function () {
            cy.createUser({ username: 'userCannotDelete', name: 'User Owns Zero Blog', password: 'zeroBlog' })
            cy.login({ username: 'userCannotDelete', password: 'zeroBlog' })
            cy.get('.toggle').should('contain', 'view').click({ multiple: true })
          })

          it('delete button is invinsible to an unauthorized user', function () {
            cy.contains('User Owns Zero Blog is logged in')
            cy.get('.blogs').should('have.length', 3)
            cy.contains('React Routers and Navigation')

            cy.get('button').should('not.contain', 'delete')
            cy.get('#delete-blog').should('not.exist')
          })
        })
      })
    })
  })
})
