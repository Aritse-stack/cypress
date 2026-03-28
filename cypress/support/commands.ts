
// Este é um comando personalizado para realizar login
// leve em consideaçao que nesta parte do projeto se espera que os dados de usuario e login sejam validos.
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-test="username"]').should('be.visible').type(username)
  cy.get('[data-test="password"]').should('be.visible').type(password)
  cy.get('[data-test="login-button"]').should('be.visible').click()
})
