describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jari',
      username: 'jari123',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jari123')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('jari123 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mari112')
      cy.get('#password').type('koira123')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'jari123', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created, liked and deleted', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('some author')
      cy.get('#url').type('www.google.com')
      cy.get('#create-button').click()

      cy.contains('test title some author')

    })
    describe('When blog is created', function() {
      beforeEach(function() {
        cy.contains('create blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('some author')
        cy.get('#url').type('www.google.com')
        cy.get('#create-button').click()
      })
      it('A blog can be liked', function() {
        cy.contains('test title some author').click()
        cy.contains('like').click()
        cy.contains('test title some author').click()
        cy.contains('likes 1')
      })
      it('A blog can be deleted', function() {
        cy.contains('test title some author').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'test title some author')
      })
      it.only('blogs are sorted by likes', function() {
        cy.contains('create blog').click()
        cy.get('#title').type('kirja')
        cy.get('#author').type('tekija')
        cy.get('#url').type('www.google2.com')
        cy.get('#create-button').click()
        cy.contains('kirja tekija')

        cy.get('#blogs-list').first().should('contain', 'test title some author')
        cy.get('#blogs-list').last().should('contain', 'kirja tekija')


        cy.contains('kirja tekija').click().contains('like').click()

        cy.get('#blogs-list').first().should('contain', 'kirja tekija')




      })
    })
  })
})