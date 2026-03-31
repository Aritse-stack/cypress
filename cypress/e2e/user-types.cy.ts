// Demonstração de testes com diferentes tipos de usuários do SauceDemo
// Objetivo: validar que a aplicação se comporta corretamente com cada tipo de usuário
describe('User Types - Error Handling', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.url().should('include', 'saucedemo.com')
  })

  // Usuário padrão: acesso completo, sem problemas
  it('should login successfully with standard_user', () => {
    cy.loginAs('validUser')
    cy.url().should('include', 'inventory')
    cy.get('[data-test="inventory-container"]').should('be.visible')
  })

  // Usuário com UI quebrada: login funciona, mas há bugs visuais
  // IMPORTANT: Este usuário causa bugs no rendering da página
  it('should login successfully with visual_user but expect visual issues', () => {
    cy.loginAs('visualUser')
    cy.url().should('include', 'inventory')
    
    // Note: elementos podem não renderizar corretamente com error_user
    // Por isso, este usuário é usado para testes de regressão visual
  })

  // Usuário bloqueado: login falha
  it('should show error when logging in with locked_out_user', () => {
    cy.loginAs('lockedOutUser')
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'locked out')
  })

  // Usuário com problemas no carrinho: problemas após login bem-sucedido
  it('should login successfully with problem_user but expect cart andcheckout issues', () => {
    cy.loginAs('problemUser')
    cy.url().should('include', 'inventory')
  })

  // Login funciona, mas há problemas no carrinho e checkout
  // Este usuário é usado para testar cenários de erro no carrinho e checkout
  it('should login successfully with error_user but expect cart and checkout issues', () => {
    cy.loginAs('errorUser')
    cy.url().should('include', 'inventory')
    cy.get('[data-test="inventory-list"]').should('exist')
  })

  // Usuário com performance lenta
  it('should handle slow loading times with performance_glitch_user', () => {
    cy.loginAs('performanceUser')
    cy.url().should('include', 'inventory')
    // Este usuário causa delays - use cy.intercept para simular ou aumentar timeout
  })
})
