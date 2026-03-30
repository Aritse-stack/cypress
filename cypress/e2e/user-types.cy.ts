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
  it('should login with error_user but expect UI glitches', () => {
    cy.loginAs('errorUser')
    cy.url().should('include', 'inventory')
    // Note: elementos podem não renderizar corretamente com error_user
    // Por isso, este usuário é usado para testes de regressão visual
    cy.get('[data-test="inventory-list"]').should('exist')
  })

  // Usuário bloqueado: login falha
  it('should show error when logging in with locked_out_user', () => {
    cy.loginAs('lockedOutUser')
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'locked out')
  })

  // Usuário com problemas no carrinho: problemas após login bem-sucedido
  it('should login successfully with problem_user but may encounter checkout issues', () => {
    cy.loginAs('problemUser')
    cy.url().should('include', 'inventory')
    // Este usuário é para testar cenários de erro no checkout
  })

  // Usuário com performance lenta
  it('should handle slow loading times with performance_glitch_user', () => {
    cy.loginAs('performanceUser')
    cy.url().should('include', 'inventory')
    // Este usuário causa delays - use cy.intercept para simular ou aumentar timeout
  })

})
