// Realizando teste utilizando viewport para simular um dispositivo móvel e validar o processo de checkout no site saucedemo.com utilizando o framework Cypress
// Objetivo é garantir que a aplicação em um viewport movel se comporte conforme esperado durante o processo de checkout, desde a adição de um item ao carrinho até a finalização da compra, incluindo a validação das mensagens de confirmação.
describe('Mobile - Checkout', () => {

  beforeEach(() => {
    // Simulando viewport de um dispositivo móvel (iPhone 6)
    cy.viewport('iphone-6')

    cy.visit('https://www.saucedemo.com')
    cy.loginAs('validUser')
    cy.url().should('include', 'inventory')
  })

  it('Deve deslogar corretamente', () => {
    // Logout utilizando o menu lateral para garantir que o processo de logout funcione corretamente
    cy.get('#react-burger-menu-btn')
      .should('be.visible')
      .click()
    cy.get('[data-test="logout-sidebar-link"]')
      .should('be.visible')
      .click()
    cy.url()
      .should('include', 'saucedemo.com')
  })

  it('Deve adicionar item ao carrinho e retirar o item do carrinho', () => {
    cy.url()
      .should('include', 'inventory')
    
    cy.get('[data-test^="add-to-cart"]')
      .should('be.visible')
      .first()
      .click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('contain', '1')

    cy.get('[data-test^="remove"]')
      .should('be.visible')
      .click()
    cy.get('[data-test="shopping-cart-badge"]')
      .should('not.exist')
  })

  it('Deve realizar o processo de checkout corretamente', () => {
    cy.get('[data-test^="add-to-cart"]')
      .should('be.visible')
      .first()
      .click()
    cy.get('[data-test="shopping-cart-badge"]')
      .should('contain', '1')

    cy.get('[data-test="shopping-cart-link"]')
      .should('be.visible')
      .click()
    cy.url()
      .should('include', 'cart')

    cy.get('[data-test="checkout"]')
      .should('be.visible')
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
      .should('be.visible')
      .click()
    cy.url()
      .should('include', 'checkout-step-two')
    cy.get('[data-test="inventory-item"]')
      .should('have.length.greaterThan', 0)

    // Validar o resumo do pedido, garantindo que o total seja exibido corretamente
    cy.get('[data-test="subtotal-label"]')
      .should('be.visible')
      .invoke('text')
      .should('match', /Item total: \$\d+\.\d{2}/)

    // Terminar o processo de checkout e verificar a conclusão
    cy.get('[data-test="finish"]')
      .should('be.visible')
      .click()
    cy.url()
      .should('include', 'checkout-complete')
    cy.get('[data-test="complete-header"]')
      .should('be.visible')
      .and('contain', 'Thank you for your order!')
    // Voltando para a página de produtos
    cy.get('[data-test="back-to-products"]')
      .should('be.visible')
      .click()
    cy.url()
      .should('include', 'inventory')
  })

  it('Deve mostrar mensagem de erro quando as informações de checkout estão incompletas', () => {
    cy.get('[data-test^="add-to-cart"]')
      .should('be.visible')
      .first()
      .click()
    cy.get('[data-test="shopping-cart-badge"]')
      .should('contain', '1')
    cy.get('[data-test="shopping-cart-link"]')
      .should('be.visible')
      .click()
    cy.url()
      .should('include', 'cart')
    cy.get('[data-test="checkout"]')
      .should('be.visible')
      .click()
    cy.url()
      .should('include', 'checkout-step-one')
    cy.get('[data-test="continue"]')
      .should('be.visible')
      .click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'is required')
  })

  it('Deve adicionar diversos, comparar se os produtos são adicionados corretamente e remover', () => {
    // Coletar os nomes dos produtos disponíveis na página de inventário para comparação posterior,
    // garantindo que o processo seja determinístico e baseado em dados controlados
    cy.get('[data-test="inventory-item-name"]')
      .then(($links) => {
      // Armazenar os nomes dos produtos em um array para comparação posterior
      const productsNames: string[] = []

      // Iterar sobre os elementos encontrados e extrair os nomes dos produtos.
      $links.each((index, link) => {
        productsNames.push(link.textContent?.trim() || '')
      })

      // Adicionar os produtos ao carrinho
      cy.get('[data-test^="add-to-cart"]')
        .each(($button) => {
          cy.wrap($button)
            .click()
      })
      
      // Verificar se os produtos no carrinho correspondem aos produtos da página de inventário, garantindo que o processo de adição seja correto e que os dados sejam consistentes
      cy.get('[data-test="shopping-cart-link"]')
        .click()
      cy.url()
        .should('include', 'cart')

      cy.get('[data-test="inventory-item-name"]')
        .then(($cartItems) => {
        const cartNames = [...$cartItems].map(el => el.textContent?.trim())

        productsNames.forEach((name) => {
          expect(cartNames).to.include(name)
        })
      })

      // Remover os produtos do carrinho
      cy.get('[data-test^="remove"]').each(($button) => {
        cy.wrap($button)
          .click()
      })
      cy.get('[data-test="shopping-cart-badge"]')
        .should('not.exist')
    })
  })
})