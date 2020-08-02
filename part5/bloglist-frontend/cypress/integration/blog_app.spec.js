describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3007/api/testing/reset')
    cy.createUser({
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

        cy.get('@parentDiv')
          .find('#num-of-likes')
          .then((likes) => {
            const likesBeforeClick = parseFloat(likes.text())

            cy.get('@parentDiv')
              .find('#like-blog')
              .click()
              .then(() => {
                const likesAfterClick = parseFloat(likes.text())

                expect(likesAfterClick).to.eq(likesBeforeClick + 1)
              })
          })

        cy.get('@parentDiv').should('contain', 'likes 1')
        cy.get('.notice')
          .should('contain', 'Thanks for liking the post, \'redux with react\'!')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
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
            cy.createUser({
              username: 'userCannotDelete',
              name: 'User Owns Zero Blog',
              password: 'zeroBlog',
            })
            cy.login({ username: 'userCannotDelete', password: 'zeroBlog' })
            cy.get('.toggle')
              .should('contain', 'view')
              .click({ multiple: true })
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

      describe('Blogs are sorted', function () {
        it('by likes in descending order', function () {
          cy.get('.blogs').then((blogs) => {
            const [first, second, last] = blogs

            cy.wrap(first).find('.blog-title').invoke('text').as('First')
            cy.wrap(second).find('.blog-title').as('second_initialOrdering')
            cy.get('@second_initialOrdering').invoke('text').as('Second')
            cy.wrap(second)
              .find('#num-of-likes')
              .invoke('text')
              .as('Second_likes')

            cy.wrap(second).find('#like-blog').dblclick()
            cy.wrap(last).find('#like-blog').click()

            cy.get('@First').then((First) => {
              cy.get('.blogs').then((currentBlogOrder) => {
                // first blog (0 likes) moves to position 2 and the second blog (2 likes) moves to position 0
                cy.wrap(currentBlogOrder[2])
                  .find('.blog-title')
                  .invoke('text')
                  .as('firstBecomesLast')

                cy.wrap(currentBlogOrder[0])
                  .find('#num-of-likes')
                  .invoke('text')
                  .as('secondBecomesFirst_likes')

                cy.wrap(currentBlogOrder[0])
                  .find('.blog-title')
                  .invoke('text')
                  .as('secondBecomesFirst')

                cy.get('@firstBecomesLast').then((firstBecomesLast) => {
                  expect(First).to.eq(firstBecomesLast)
                })

                cy.get('@Second').then((Second) => {
                  cy.get('@secondBecomesFirst').then((secondBecomesFirst) => {
                    expect(Second).to.eq(secondBecomesFirst)
                  })
                })

                cy.get('@Second_likes').then((likes) => {
                  cy.get('@secondBecomesFirst_likes').then(
                    (secondBecomesFirst_likes) => {
                      expect(parseFloat(likes)).to.be.lessThan(
                        parseFloat(secondBecomesFirst_likes)
                      )
                    }
                  )
                })
              })
            })

            expect(blogs.length).to.eq(3)
            cy.get('.blogs')
              .find('.blog-title')
              .first()
              .contains('redux with react') // current position = first
            cy.get('@second_initialOrdering').should(
              'contain',
              'redux with react'
            ) // previous position = second
          })
        })
      })
    })
  })
})
