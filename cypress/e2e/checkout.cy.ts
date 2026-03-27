
describe('Checkout', () => {

  beforeEach(() => {
    // Login before each test
    // problem_user
    // performance_glitch_user
    // standard_user
    
    cy.login('standard_user', 'secret_sauce')
    
    // Add item & go to cart
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test="shopping-cart-link"]').click()

    cy.url().should('include', 'cart')
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0)
  })

  it('should complete checkout successfully', () => {
    // Start checkout
    cy.get('[data-test="checkout"]').should('be.enabled').click()
    cy.url().should('include', 'checkout-step-one')

    // Fill in checkout information
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')

    // Verify checkout information is filled correctly
    cy.get('[data-test="firstName"]').should('have.value', 'John')
    cy.get('[data-test="lastName"]').should('have.value', 'Doe')
    cy.get('[data-test="postalCode"]').should('have.value', '12345') 

    // Continue to next step
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', 'checkout-step-two')
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0)
    cy.get('[data-test="subtotal-label"]').invoke('text').should('match', /Item total: \$\d+\.\d{2}/)

    // Finish checkout
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', 'checkout-complete')
    cy.get('[data-test="complete-header"]').should('be.visible').and('contain', 'Thank you for your order!')

    // Back to products
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('include', 'inventory')
  })
})
