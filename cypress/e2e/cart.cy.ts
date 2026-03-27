
describe('Cart', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('problem_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('Should have itens and a cart', () => {
    cy.get('[data-test="shopping-cart-link"]').should('be.visible')
    cy.get('[data-test^="add-to-cart"]').should('have.length.greaterThan', 0)
  })

  it('Should add an item to the cart', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()

    cy.get('[data-test="shopping-cart-badge"]').should('exist')
  })
  
  it('Should remove an item from the cart in the inventory page', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()
    
    cy.get('[data-test^="remove"]').first().click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })

  it('Should add an item to the cart and remove it in the cart page', () => {
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test^="remove"]').first().click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })
})
