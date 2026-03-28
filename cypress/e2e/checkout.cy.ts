// Realizando testes no processo de checkout do site saucedemo.com utilizando o framework Cypress
// O objetivo é validar o processo de checkout, garantindo que a aplicação se comporte conforme esperado, incluindo a verificação de mensagens de erro e a conclusão bem-sucedida do processo de compra.
describe('Checkout', () => {

  beforeEach(() => {
    // Login antes de cada teste
    // usando comando personalizado para login, onde se espera que os dados de usuario e login sejam validos.
    // standard_user, performance_glitch_user, problem_user, error_user
    cy.login('standard_user', 'secret_sauce')
    
    // Estado inicial para os testes de checkout, garantindo que haja pelo menos um item no carrinho
    cy.get('[data-test^="add-to-cart"]').first().click()
    cy.get('[data-test="shopping-cart-link"]').click()

    cy.url().should('include', 'cart')
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0)
  })

  it('should complete checkout successfully', () => {
    cy.get('[data-test="checkout"]').should('be.enabled').click()
    cy.url().should('include', 'checkout-step-one')

    // Adicionar informações de checkout
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')

    // verificar se os campos estão preenchidos corretamente
    cy.get('[data-test="firstName"]').should('have.value', 'John')
    cy.get('[data-test="lastName"]').should('have.value', 'Doe')
    cy.get('[data-test="postalCode"]').should('have.value', '12345') 

    // Continuar para a próxima etapa do checkout.
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', 'checkout-step-two')
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0)
    cy.get('[data-test="subtotal-label"]').invoke('text').should('match', /Item total: \$\d+\.\d{2}/)

    // Terminar o processo de checkout e verificar a conclusão
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', 'checkout-complete')
    cy.get('[data-test="complete-header"]').should('be.visible').and('contain', 'Thank you for your order!')

    // Voltando para a página de produtos
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('include', 'inventory')
  })
})
