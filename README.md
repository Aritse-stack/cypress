# Cypress E2E Automation Project

Este projeto implementa testes automatizados de ponta a ponta (E2E) para o sistema SauceDemo (https://www.saucedemo.com), utilizando Cypress com TypeScript. O foco é validar fluxos críticos da aplicação, como login, gerenciamento de carrinho e checkout, garantindo qualidade e estabilidade.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Aritse-stack/cypress.git
   cd cypress
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

   Certifique-se de que o Node.js (versão 16 ou superior) e npm estão instalados.

## Execução

### Executar todos os testes em modo headless (recomendado para CI/CD):
```bash
npx cypress run
```

### Executar testes em modo interativo (abre a interface do Cypress):
```bash
npx cypress open
```

### Executar testes específicos:
- Para testes de login: `npx cypress run --spec "cypress/e2e/login.cy.ts"`
- Para testes de carrinho: `npx cypress run --spec "cypress/e2e/cart.cy.ts"`
- Para testes de checkout: `npx cypress run --spec "cypress/e2e/checkout.cy.ts"`

## Arquitetura Escolhida

O projeto segue uma estrutura organizada e escalável, inspirada nas melhores práticas do Cypress:

- **`cypress/e2e/`**: Contém os arquivos de teste (.cy.ts), separados por funcionalidades (login, cart, checkout) para facilitar manutenção e expansão.
- **`cypress/support/`**: Inclui comandos customizados (commands.ts) para reutilização de código, como `cy.login()`, reduzindo duplicação.
- **`cypress/fixtures/`**: Armazena dados de teste (ex.: user.json) para cenários reutilizáveis.
- **`cypress.config.js`**: Configuração principal do Cypress, com setup básico para eventos de nó.
- **Raiz do projeto**: Arquivos de configuração (package.json, tsconfig.json, jsconfig.json) para TypeScript e dependências.

Essa arquitetura permite fácil adição de novos testes e manutenção, com separação clara de responsabilidades.

## Estratégia de Testes

A estratégia adotada é focada em fluxos críticos da aplicação, priorizando cenários de alto impacto:

- **Cobertura**: Testes cobrem login (válido/inválido), adição/remoção de itens no carrinho e checkout completo.
- **Abordagem**: Uso de Page Object Model implícito via comandos customizados e seletores data-test para estabilidade.
- **Cenários**: Inclui testes positivos (fluxos normais) e negativos (erros, como credenciais inválidas).
- **Execução**: Testes são independentes, com beforeEach para setup, garantindo isolamento.
- **Dados**: Utiliza fixtures para dados estáticos, facilitando mudanças sem alterar código.

Essa estratégia garante validações robustas sem overkill, focando em qualidade sobre quantidade.

## Justificativas das Decisões Técnicas

- **Cypress + TypeScript**: Cypress foi escolhido por sua simplicidade em testes E2E, sem necessidade de WebDriver. TypeScript adiciona type safety, reduzindo bugs e melhorando manutenibilidade.
- **Estrutura Organizada**: Separação em pastas evita acúmulo de arquivos, facilitando escalabilidade para projetos maiores.
- **Código Reutilizável**: Comandos customizados (ex.: login) encapsulam lógica comum, promovendo DRY (Don't Repeat Yourself) e facilitando refatoração.
- **Seletores data-test**: Usados para maior estabilidade em testes, evitando quebras por mudanças de CSS.
- **GitHub**: Repositório público para compartilhamento e colaboração, conforme requisitos.

## Pontos de Melhoria que Implementaria com Mais Tempo

--->  **CI/CD**: Integrar com GitHub Actions para execução automática de testes em pull requests e deploys.               <---> Pesquisar
---> **Cobertura de Testes**: Adicionar ferramentas como cypress/code-coverage para medir cobertura de código.            <---> Pesquisar
- **Mais Cenários**: Testar usuários alternativos (ex.: problem_user), cenários de performance e mobile responsiveness.   <---> Na lista de afazeres <--->
- **Relatórios**: Gerar relatórios HTML com mochawesome para melhor visualização de resultados.                           <---> Na lista de afazeres <--->
- **Paralelização**: Configurar execução paralela para reduzir tempo em suites grandes.                                   <---> Na lista de afazeres <--->
- **Page Objects**: Implementar padrão Page Object para maior abstração e reutilização.                                   <---> Na lista de afazeres <--->
- **Configurações Avançadas**: Adicionar baseUrl no cypress.config.js e variáveis de ambiente para diferentes ambientes (dev/staging/prod). <---> Pesquisar <--->
- **Integração com APIs**: Adicionar testes de API se a aplicação tivesse endpoints expostos.

---

**Autor**: Valter Estevam Oliveira  
**Repositório**: [GitHub](https://github.com/Aritse-stack/cypress)  
**Licença**: sem licensa