describe(`As a user, I can click a movie, and see that movie’s details`, () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 200,
      fixture: 'movies'
    }).as('allMovies')
    .visit('http://localhost:3000')
  })

  it('should update url and display all of the extended movie info', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', {
        statusCode: 200,
        fixture: 'blackAdam.json'
      }).as('singleMovie1')

      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270/videos', {
        statusCode: 200,
        fixture: 'blackAdamVideos.json'
      }).as('singleMovieVideo1')

      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/934641', {
        statusCode: 200,
        fixture: 'wakeUpDead.json'
      }).as('singleMovie2')

      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/934641/videos', {
        statusCode: 200,
        fixture: 'wakeUpDeadVideos.json'
      }).as('singleMovieVideo2')

      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/820067', {
        statusCode: 200,
        fixture: 'quintuplets.json'
      }).as('singleMovie3')

      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/820067/videos', {
        statusCode: 200,
        fixture: 'quintupletsVideos.json'
      }).as('singleMovieVideo3')

    // Stubbing all POST requests:
    cy.intercept('POST', 'https://www.youtube-nocookie.com/api/stats/atr*', {
      statusCode: 200,
      body: 'Stubbed Response Data',
    }).as('xhrStub1');

    cy.intercept('POST', 'https://www.youtube-nocookie.com/youtubei/v1/*', {
      statusCode: 200,
      body: 'Stubbed Response Data',
    }).as('xhrStub2');

      cy.intercept('POST', 'https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/Create', {
        statusCode: 200,
        body: 'Stubbed Response Data',
      }).as('xhrStub3');

      cy.intercept('POST', 'https://play.google.com/log?format=json&hasfast=true&authuser=0', {
        statusCode: 200,
        body: 'Stubbed Response Data',
      }).as('xhrStub4');
    
    // Testing 1st Card - Happy Path
    cy.get('.card').first().click()
    .url().should('eq', 'http://localhost:3000/436270')
    cy.get('header').contains("h1", "RANCID TOMATILLOS")
    cy.get('.movie-title').contains("h1", "Black Adam, 2022")
    cy.get('.runtime').contains("p", "125 minutes")
    cy.get('.overview').contains("p", "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.")
    cy.get('.avg-rating').contains("p", "Average Rating: 4/10 🍅")
    cy.get('.genres').contains("p", "Action • Fantasy • Science Fiction")
    cy.get('iframe')
    .should('have.attr', 'src')
    .then((src) => {
      expect(src).to.equal('https://www.youtube-nocookie.com/embed/mkomfZHG5q4')
    })
        //Testing that '←' button navigates a user back to homepage
    cy.get('.back-to-main-btn').click()
    .url().should('eq', 'http://localhost:3000/')
    cy.wait(['@allMovies'])
    cy.get('.cards-container').children()
    .should('have.length', 5)

    // Testing Last Card - Happy Path
    cy.visit('http://localhost:3000')
    cy.get('.card').last().click()
    .url().should('eq', 'http://localhost:3000/934641')
    cy.get('header').contains("h1", "RANCID TOMATILLOS")
    cy.get('.movie-title').contains("h1", "The Minute You Wake Up Dead, 2022" )
    cy.get('.runtime').contains("p", "90 minutes")
    cy.get('.overview').contains("p", `A stockbroker in a small southern town gets embroiled in an insurance scam with a next-door neighbor that leads to multiple murders when a host of other people want in on the plot. Sheriff Thurmond Fowler, the by-the-book town sheriff for over four decades, works earnestly to try and unravel the town’s mystery and winds up getting more than he bargained for.`)
    cy.get('.avg-rating').contains("p", "Average Rating: 5/10 🍅")
    cy.get('.genres').contains("p", "Thriller • Crime")
    cy.get('iframe')
    .should('have.attr', 'src')
    .then((src) => {
      expect(src).contains('https://www.youtube-nocookie.com/embed/vv7XswnfSMk')
    })
         //Testing that 'RANCID TOMATILLOS' header text navigates a user back to homepage
         cy.get('.header-text').click()
         .url().should('eq', 'http://localhost:3000/')
         cy.wait(['@allMovies'])
         cy.get('.cards-container').children()
         .should('have.length', 5)

  // Testing Sad Path for if movie does not have a YouTube Trailer Key
  cy.get('.cards-container').children()
  .eq(1).click()
  .url().should('eq', 'http://localhost:3000/820067')
  cy.get('.info-and-video-container').children()
  .should('have.length', 1)
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