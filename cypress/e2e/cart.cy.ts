// Realizando testes na funcionalidade de carrinho de compras do site saucedemo.com utilizando o framework Cypress
// O objetivo é validar o processo de adicionar e remover itens do carrinho, garantindo que a aplicação se comporte conforme esperado.
describe('Cart', () => {

  // Login antes de cada teste
  // usando comando personalizado para login, onde se espera que os dados de usuario e login sejam validos.
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.url().should('include', 'saucedemo.com')

    cy.loginAs('validUser')
    cy.url().should('include', 'inventory')

    cy.get('[data-test="shopping-cart-link"]')
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
    cy.get('[data-test="remove"]').click()

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

  it('should attempt to add multiple items to the cart compare the names and them remove them', () => {
    // Coletar os nomes dos produtos disponíveis
    // Seletor alternativo [data-test^="item-"][data-test$="title-link"] || [data-test="inventory-item-name"]
    cy.get('[data-test="inventory-item-name"]').then(($links) => {
      const productsNames: string[] = []

      $links.each((index, link) => {
        productsNames.push(link.textContent?.trim() || '')
      })

      // Adicionar os produtos ao carrinho
      cy.get('[data-test^="add-to-cart"]').each(($button) => {
        cy.wrap($button).click()
      })

      // Verificar se os produtos adicionados correspondem aos produtos no carrinho
      cy.get('[data-test="shopping-cart-link"]').click()
      cy.url().should('include', 'cart')

      cy.get('[data-test="inventory-item-name"]').then(($cartItems) => {
        const cartNames = [...$cartItems].map(el => el.textContent?.trim())

        productsNames.forEach((name) => {
          expect(cartNames).to.include(name)
        })
      })

      // Remover os produtos do carrinho
      cy.get('[data-test^="remove"]').each(($button) => {
        cy.wrap($button).click()
      })
      cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    })
  })
})
