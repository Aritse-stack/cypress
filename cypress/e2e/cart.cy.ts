
/*
  Os testes de carrinho foram projetados para validar o processo de adição e remoção de itens
    garantindo que o carrinho funcione corretamente em diferentes cenários,
    incluindo a página de inventário, a página de detalhes do produto e a página do carrinho,
    alem do teste de comparação dos itens adicionados com os itens disponíveis na página de inventário.

  Os testes foram projetados para serem determinísticos, utilizando dados controlados e validação explícita de visibilidade dos campos, evitando conteúdo dinâmico ou dependente do tempo.
*/

describe('Cart', () => {
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://www.saucedemo.com')
    cy.url()
      .should('include', 'saucedemo.com')

    // Login utilizando o comando personalizado 'loginAs' para um usuário válido definido na fixture users.json
    cy.loginAs('validUser')
    cy.url()
      .should('include', 'inventory')

    // Verificar se o carrinho está vazio antes de cada teste para garantir que os testes sejam independentes e não afetados por estados anteriores
    cy.get('[data-test="shopping-cart-badge"]')
      .should('not.exist')
    cy.get('[data-test^="add-to-cart"]')
      .should('have.length.greaterThan', 0)
  })

  it('Deve adicionar um item ao carrinho e removê-lo diretamente na pagina de inventário', () => {
    cy.addFirstItemToCart()

    cy.get('[data-test^="remove"]')
      .should('be.visible')
      .click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('not.exist')
    //cy.removeAllItemsFromCart()
  })

  it('Deve adicionar e remover um item pela página de detalhes do produto', () => {
    cy.get('[data-test="inventory-item-name"]')
      .first()
      .should('be.visible')
      .click()

    cy.url()
      .should('include', 'inventory-item')

    cy.get('[data-test^="add-to-cart"]')
      .should('be.visible')
      .click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('be.visible')
      .and('contain', '1')

    cy.get('[data-test^="remove"]')
      .should('be.visible')
      .click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('not.exist')
  })

  it('Deve adicionar um item ao carrinho e removê-lo na página do carrinho', () => {
    cy.addFirstItemToCart()

    cy.removeAllItemsFromCart()
  })

  it('Deve adicionar múltiplos itens ao carrinho, comparar se os produtos da página de inventário foram adicionados e removê-los', () => {
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
