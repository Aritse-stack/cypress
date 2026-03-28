
// Realizando testes na pagina de login do site saucedemo.com utilizando o framework Cypress
// O objetivo é validar o processo de login, incluindo casos de sucesso e falha, garantindo que a aplicação se comporte conforme esperado.
// Usando uma abordagem mais deterministica, onde cada etapa do processo de login é verificada para garantir que os elementos estejam presentes e que as mensagens de erro sejam exibidas corretamente.
describe('Login', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.url().should('include', 'saucedemo')
    
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