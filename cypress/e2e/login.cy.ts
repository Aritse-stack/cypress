
/*
  Testes de login para a aplicação SauceDemo utilizando Cypress.

  O teste de login é fundamental para garantir que os usuários possam acessar suas contas de forma segura e eficiente.
  Este conjunto de testes abrange cenários comuns, como login bem-sucedido, falha de login devido a credenciais inválidas e tentativa de login sem fornecer credenciais.
  Tambem inclui o processo de logout para garantir que os usuários possam sair de suas contas corretamente.

  Os testes foram projetados para serem determinísticos, utilizando dados controlados e validação explícita de visibilidade dos campos, evitando conteúdo dinâmico ou dependente do tempo.
  Isso garante que os testes sejam mais confiáveis e menos propensos a falhas intermitentes devido a dados de teste inconsistentes ou mal configurados.
*/

describe('Login', () => {

  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://www.saucedemo.com')

    cy.url()
      .should('include', 'saucedemo.com')
  })

  it('Deve logar e deslogar corretamente', () => {
    // Login utilizando o comando personalizado 'loginAs' para um usuário válido definido na fixture users.json
    cy.loginAs('validUser')
    cy.url()
      .should('include', 'inventory')

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

  it('Deve mostrar erro quando não for passar credenciais', () => {
    cy.get('[data-test="login-button"]')
      .click()
    cy.get('[data-test="error"]')
      .should('contain', 'Username')
  })
  
  it('Deve mostrar mensagem de erro com credenciais inválidas', () => {
    cy.loginAs('invalidUser')
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'do not match')
  })
})