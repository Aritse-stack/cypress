
// Comando principal: realiza login com username e password fornecidos
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})

// Login com qualquer tipo de usuário da fixture users.json
// Exemplo: cy.loginAs('validUser') ou cy.loginAs('lockedOutUser')
Cypress.Commands.add('loginAs', (userType: string) => {
  cy.fixture('users').then((users) => {
    const user = users[userType]
    if (!user) {
      throw new Error(`User type "${userType}" not found in users.json`)
    }
    cy.login(user.username, user.password)
  })
})
