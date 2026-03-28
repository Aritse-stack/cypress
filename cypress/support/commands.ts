
// Este é um comando personalizado para realizar login
// leve em consideaçao que nesta parte do projeto se espera que os dados de usuario e login sejam validos.
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('https://www.saucedemo.com')

  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})
