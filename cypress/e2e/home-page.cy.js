describe("home page user flow", () => {
  
    beforeEach(() => {
      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
        statusCode: 200,
        fixture: 'movies'
      }).as('allMovies')
      .visit('http://localhost:3000')
    })

    it('should display header', () => {
        cy.get('header')
          .contains('h1', 'RANCID TOMATILLOS 🍅')
        cy.location('pathname').should('eq', '/')
      })

    it('should display all movie posters', () => {
        cy.wait(['@allMovies'])
        cy.get('.cards-container').children()
        .should('have.length', 5)
        .get(':nth-child(1) > .movie-poster')
        .should('have.attr', 'alt')

        cy.get('.cards-container').children()
            .eq(2)
            .find('img')
            .should('be.visible')
            .invoke('attr', 'alt')
            .should('eq', 'Movie poster for R.I.P.D. 2: Rise of the Damned')

        cy.get('.cards-container').children()
            .eq(3)
            .find('img')
            .should('be.visible')
            .invoke('attr', 'src')
            .should('eq', 'https://image.tmdb.org/t/p/original//ps2oKfhY6DL3alynlSqY97gHSsg.jpg')
    })

    it('should display an error message for 500 error', () => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
            statusCode: 500,
    })
        cy.contains('p', 'Movies not found.')
        cy.get('p').click()
            .url().should('eq', 'http://localhost:3000/')
    })

    it('should display an error message for 400 error', () => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
            statusCode: 400,
        })
        cy.contains('p', 'Movies not found.')
        cy.get('p').click()
            .url().should('eq', 'http://localhost:3000/')
        })

    it('should display an error message for 300 response', () => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
            statusCode: 300,
        })
        cy.contains('p', 'Movies not found.')
        cy.get('p').click()
            .url().should('eq', 'http://localhost:3000/')
        })
})