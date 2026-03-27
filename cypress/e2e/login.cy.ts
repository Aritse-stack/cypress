
describe('Login', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('Should connect to the website', () => {
    cy.url().should('include', 'saucedemo')
  })

  it('Should have the form visible', () => {
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible')
  })
  
  it('Should login with valid credentials', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', 'inventory')
  })

  it('Should show error message with empty credentials', () => {
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username is required')
  })
  
  it('Should show error message with invalid credentials', () => {
    cy.get('[data-test="username"]').type('invalid_user')
    cy.get('[data-test="password"]').type('invalid_password')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username and password do not match any user in this service')
  })
})