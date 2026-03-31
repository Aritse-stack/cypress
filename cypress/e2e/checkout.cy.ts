// Realizando testes no processo de checkout do site saucedemo.com utilizando o framework Cypress
// O objetivo é validar o processo de checkout, garantindo que a aplicação se comporte conforme esperado, incluindo a verificação de mensagens de erro e a conclusão bem-sucedida do processo de compra.
describe('Checkout', () => {

  // Login antes de cada teste
  // usando comando personalizado para login, onde se espera que os dados de usuario e login sejam validos.
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.url().should('include', 'saucedemo.com')
    
    cy.loginAs('standard_user')
    cy.url().should('include', 'inventory')
    
    // Estado inicial para os testes de checkout, garantindo que haja pelo menos um item no carrinho
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test="shopping-cart-link"]').click()

    cy.url().should('include', 'cart')
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0)
  })

  // Teste genérico para validar mensagem de erro quando as informações de checkout estão incompletas
  it('should show error message when checkout information is incomplete', () => {
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', 'checkout-step-one')

    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('contain', 'is required')
  })

  it('should attempt to fill checkout information and continue', () => {
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', 'checkout-step-one')

    // Adicionar informações de checkout
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')
        
    cy.get('[data-test="continue"]').click()
    
    // Continuar para a próxima etapa do checkout.
    cy.url().should('include', 'checkout-step-two')
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0)
    cy.get('[data-test="subtotal-label"]').invoke('text').should('match', /Item total: \$\d+\.\d{2}/)

    // Terminar o processo de checkout e verificar a conclusão
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', 'checkout-complete')
    cy.get('[data-test="complete-header"]').and('contain', 'Thank you for your order!')

    // Voltando para a página de produtos
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('include', 'inventory')
  })
})
