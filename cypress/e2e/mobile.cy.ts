// Realizando teste utilizando viewport para simular um dispositivo móvel (iPhone 6) e validar o processo de checkout no site saucedemo.com utilizando o framework Cypress
// Objetivo é garantir que a aplicação em um viewport movel se comporte conforme esperado durante o processo de checkout, desde a adição de um item ao carrinho até a finalização da compra, incluindo a validação das mensagens de confirmação.
describe('Mobile - Checkout', () => {

  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('https://www.saucedemo.com')
    
    cy.loginAs('validUser')
    cy.url().should('include', 'inventory')
  })

  it('should complete checkout on mobile', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')

    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()

    cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!')
    
    // Voltando para a página de produtos
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('include', 'inventory')
  })
})