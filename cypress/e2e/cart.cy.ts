// Realizando testes na funcionalidade de carrinho de compras do site saucedemo.com utilizando o framework Cypress
// O objetivo é validar o processo de adicionar e remover itens do carrinho, garantindo que a aplicação se comporte conforme esperado.
describe('Cart', () => {

  beforeEach(() => {
    // Login antes de cada teste
    // usando comando personalizado para login, onde se espera que os dados de usuario e login sejam validos.
    // standard_user, performance_glitch_user, problem_user, error_user
    cy.visit('https://www.saucedemo.com')
    cy.url().should('include', 'saucedemo.com')

    cy.login('standard_user', 'secret_sauce')

    cy.get('[data-test="shopping-cart-link"]').should('be.visible')
    cy.get('[data-test^="add-to-cart"]').should('have.length.greaterThan', 0)
  })

  it('should attempt to add item them remove it from inventory', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test^="remove"]').first().click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })

  it('should attempt to add an item to the cart from the product detail page and remove it', () => {
    cy.get('[data-test="inventory-item-name"]').first().click()
    cy.url().should('include', 'inventory-item')

    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="remove"]').should('be.visible').click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })

  it('should attempt to add an item to the cart and remove it in the cart page', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', 'cart')

    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0)
    cy.get('[data-test^="remove"]').first().click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })
})
