
declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>
    loginAs(userType: string): Chainable<void>
    addFirstItemToCart(): Chainable<void>
    removeAllItemsFromCart(): Chainable<void>
  }
 }