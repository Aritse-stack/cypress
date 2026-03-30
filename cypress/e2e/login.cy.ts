
// Realizando testes na pagina de login do site saucedemo.com utilizando o framework Cypress
// O objetivo é validar o processo de login, incluindo casos de sucesso e falha, garantindo que a aplicação se comporte conforme esperado.
// Usando uma abordagem mais deterministica, onde cada etapa do processo de login é verificada para garantir que os elementos estejam presentes e que as mensagens de erro sejam exibidas corretamente.
describe('Login', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.url().should('include', 'saucedemo.com')
  })
  
  // Teste de login com credenciais válidas usando dados do fixture
  it('should login with valid credentials from fixture', () => {
    cy.loginAs('validUser')
    cy.url().should('include', 'inventory')
  })

  it('should show error message with empty credentials', () => {
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('contain', 'Username')
  })
  
  it('should show error message with invalid credentials', () => {
    cy.loginAs('invalidUser')
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'do not match')
  })
})