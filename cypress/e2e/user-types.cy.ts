// Demonstração de testes com diferentes tipos de usuários do SauceDemo
// Objetivo: validar que a aplicação se comporta corretamente com cada tipo de usuário
describe('User Types - Error Handling', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.url().should('include', 'saucedemo.com')
  })

  // Usuário padrão: acesso completo, sem problemas
  it('Deve logar corretamente com o usuário standard', () => {
    cy.loginAs('validUser')
    cy.url().should('include', 'inventory')
    cy.get('[data-test="inventory-container"]').should('be.visible')
  })

  // Usuário com UI quebrada: login funciona, mas há bugs visuais
  // IMPORTANT: Este usuário causa bugs no rendering da página
  it('Deve logar corretamente com o usuário visual_user mas esperar problemas visuais', () => {
    cy.loginAs('visualUser')
    cy.url().should('include', 'inventory')
    
    // Note: elementos podem não renderizar corretamente com error_user
    // Por isso, este usuário é usado para testes de regressão visual
  })

  // Usuário bloqueado: login falha
  it('Deve mostrar erro ao tentar logar com o usuário locked_out_user', () => {
    cy.loginAs('lockedOutUser')
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'locked out')
  })

  // Usuário com problemas no carrinho: problemas após login bem-sucedido
  it('Deve logar corretamente com o usuário problem_user mas esperar problemas no carrinho e checkout', () => {
    cy.loginAs('problemUser')
    cy.url().should('include', 'inventory')
  })

  // Login funciona, mas há problemas no carrinho e checkout
  // Este usuário é usado para testar cenários de erro no carrinho e checkout
  it('Deve logar corretamente com o usuário error_user mas esperar problemas no carrinho e checkout', () => {
    cy.loginAs('errorUser')
    cy.url().should('include', 'inventory')
    cy.get('[data-test="inventory-list"]').should('exist')
  })

  // Usuário com performance lenta
  it('Deve lidar com tempos de carregamento lentos com o usuário performance_glitch_user', () => {
    cy.loginAs('performanceUser')
    cy.url().should('include', 'inventory')
    // Este usuário causa delays - use cy.intercept para simular ou aumentar timeout
  })
})
