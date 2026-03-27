
describe('Cart', () => {

  beforeEach(() => {
    // Login before each test
    // problem_user
    // performance_glitch_user
    // standard_user
    
    cy.login('standard_user', 'secret_sauce')
  })

  it('Should display available products and cart icon', () => {
    cy.get('[data-test="shopping-cart-link"]').should('be.visible')
    cy.get('[data-test^="add-to-cart"]').should('have.length.greaterThan', 0)
  })

  it('Should add an item to the cart', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()

    cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(Number).should('be.gte', 1)
  })

  it('Should remove an item from the cart in the inventory page', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test^="remove"]').first().click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })

  it('Should add an item to the cart in the product page and remove it in the cart page', () => {
    cy.get('[data-test="inventory-item-name"]').first().click()
    cy.url().should('include', 'inventory-item')
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="remove"]').should('be.visible').click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })

  it('Should add an item to the cart and remove it in the cart page', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', 'cart')

    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0)
    cy.get('[data-test^="remove"]').first().click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })
})
