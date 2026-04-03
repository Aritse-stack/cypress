
/*
  Este teste de checkout é projetado para validar o processo de compra no site SauceDemo, garantindo que os usuários possam concluir suas compras com sucesso.
  O teste abrange cenários como tentativa de checkout com informações incompletas, preenchimento correto das informações de checkout e conclusão do processo de compra.

  Os testes são estruturados para serem determinísticos, utilizando dados controlados e validação explícita de visibilidade dos campos, evitando conteúdo dinâmico ou dependente do tempo.
*/
describe('Checkout', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.url()
      .should('include', 'saucedemo.com')

    cy.loginAs('validUser')
    cy.url()
      .should('include', 'inventory')

    // Estado inicial para os testes de checkout, garantindo que haja pelo menos um item no carrinho
    cy.addFirstItemToCart()

    cy.get('[data-test="shopping-cart-link"]')
      .should('be.visible')
      .click()
    cy.url()
      .should('include', 'cart')
  })

  it('Deve mostrar mensagem de erro quando as informações de checkout estão incompletas', () => {
    cy.get('[data-test="checkout"]')
      .click()
    cy.url()
      .should('include', 'checkout-step-one')

    cy.get('[data-test="continue"]')
      .click()
    cy.get('[data-test="error"]')
      .should('contain', 'is required')
  })

  it('Deve tentar preencher as informações de checkout e continuar', () => {
    cy.get('[data-test="checkout"]')
      .click()
    cy.url()
      .should('include', 'checkout-step-one')

    // Adicionar informações de checkout
    cy.get('[data-test="firstName"]')
      .type('John')
    cy.get('[data-test="lastName"]')
      .type('Doe')
    cy.get('[data-test="postalCode"]')
      .type('12345')

    // Continuar para a próxima etapa do checkout.
    cy.get('[data-test="continue"]')
      .click()
    cy.url()
      .should('include', 'checkout-step-two')
    cy.get('[data-test="inventory-item"]')
      .should('have.length.greaterThan', 0)
    cy.get('[data-test="subtotal-label"]')
      .should('be.visible')
      .invoke('text')
      .should('match', /Item total: \$\d+\.\d{2}/)

    // Terminar o processo de checkout e verificar a conclusão
    cy.get('[data-test="finish"]')
      .click()
    cy.url()
      .should('include', 'checkout-complete')
    cy.get('[data-test="complete-header"]')
      .and('contain', 'Thank you for your order!')

    // Voltando para a página de produtos
    cy.get('[data-test="back-to-products"]')
      .click()
    cy.url()
      .should('include', 'inventory')
  })
})
