
/*  
  Comando principal: realiza login com username e password fornecidos

  Comando auxiliar: realiza login utilizando um tipo de usuário definido na fixture users.json, facilitando a reutilização de dados de teste para diferentes cenários de login.

  Os comandos parsonalizados foram designados para serem mais determinístico usando dados controlados, validação explicita de visibilidade dos campos e evitando conteudo dinamico ou dependente do tempo,
    garantindo que os testes sejam mais confiáveis e menos propensos a falhas intermitentes. 
*/

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-test="username"]')
    .should('be.visible')
    .type(username)

  cy.get('[data-test="password"]')
    .should('be.visible')
    .type(password)

  cy.get('[data-test="login-button"]')
    .should('be.visible')
    .click()
})

// Login com qualquer tipo de usuário da fixture users.json
// Exemplo: cy.loginAs('validUser') ou cy.loginAs('lockedOutUser')
Cypress.Commands.add('loginAs', (userType: string) => {
  cy.fixture('users').its(userType).then((user) => {
    if (!user) {
      throw new Error(`User type "${userType}" not found in users.json`)
    }

    cy.login(user.username, user.password)
  })
})

Cypress.Commands.add('addFirstItemToCart', () => {
  cy.get('[data-test="inventory-item"]')
    .should('be.visible')
    .find('[data-test^="add-to-cart"]')
    .should('be.visible')
    .first()
    .click()

  cy.get('[data-test="shopping-cart-badge"]')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const itemCount = parseInt(text)
      expect(itemCount).to.be.greaterThan(0)
    })
})


Cypress.Commands.add('removeAllItemsFromCart', () => {
  cy.get('[data-test="shopping-cart-link"]')
    .should('be.visible')
    .click()

  cy.url()
    .should('include', 'cart')

  cy.get('[data-test="inventory-item"]')
    .should('be.visible')
    .each(($item) => {
      cy.wrap($item)
        .find('[data-test^="remove"]')
        .should('be.visible')
        .click()
    })

  cy.get('[data-test="shopping-cart-badge"]')
    .should('not.exist')
})  