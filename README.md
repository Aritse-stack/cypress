# Cypress E2E Automation Project

Este projeto implementa testes automatizados de ponta a ponta (E2E) para o sistema SauceDemo (https://www.saucedemo.com), utilizando Cypress com TypeScript. O foco é validar fluxos críticos da aplicação, como login, gerenciamento de carrinho e checkout, garantindo qualidade e estabilidade em diferentes cenários de usuário.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Git

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Aritse-stack/cypress.git
   cd cypress
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## ▶️ Execução

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
- Para testes de tipos de usuário: `npx cypress run --spec "cypress/e2e/user-types.cy.ts"`
- Para testes móveis: `npx cypress run --spec "cypress/e2e/mobile.cy.ts"`

### Executar com relatórios:
```bash
npx cypress run --reporter cypress-multi-reporters
```
Os relatórios serão gerados em `cypress/reports/`.

## 🏗️ Arquitetura Escolhida

O projeto segue uma estrutura organizada e escalável, inspirada nas melhores práticas do Cypress:

- **`cypress/e2e/`**: Contém os arquivos de teste (.cy.ts), separados por funcionalidades (login, cart, checkout, user-types, mobile) para facilitar manutenção e expansão.
- **`cypress/support/`**: Inclui comandos customizados (`commands.ts`) para reutilização de código, como `cy.login()`, `cy.loginAs()`, reduzindo duplicação e promovendo DRY.
- **`cypress/fixtures/`**: Armazena dados de teste (ex.: `users.json`) para cenários reutilizáveis e suporte a múltiplos tipos de usuário.
- **`cypress/reports/`**: Armazena relatórios HTML gerados com `cypress-mochawesome-reporter` e `cypress-multi-reporters` para melhor visualização de resultados.
- **`cypress.config.js`**: Configuração principal do Cypress, com setup para eventos de nó e geração de relatórios.
- **Raiz do projeto**: Arquivos de configuração (`package.json`, `tsconfig.json`, `jsconfig.json`) para TypeScript e dependências.

Essa arquitetura permite fácil adição de novos testes e manutenção, com separação clara de responsabilidades e suporte a escalabilidade.

## 🧪 Estratégia de Testes

A estratégia adotada é focada em fluxos críticos da aplicação, priorizando cenários de alto impacto e cobertura abrangente:

- **Cobertura**: Testes cobrem login (válido/inválido), adição/remoção de itens no carrinho, checkout completo, diferentes tipos de usuário (standard, locked_out, problem, error, etc.) e responsividade móvel.
- **Abordagem**: Uso de Page Object Model implícito via comandos customizados e seletores `data-test` para estabilidade e manutenção.
- **Cenários**: Inclui testes positivos (fluxos normais) e negativos (erros, como credenciais inválidas, conta bloqueada, problemas no checkout).
- **Execução**: Testes são independentes, com `beforeEach` para setup, garantindo isolamento e confiabilidade.
- **Dados**: Utiliza fixtures para dados estáticos `users.json`, facilitando mudanças sem alterar código e suportando múltiplos ambientes.
- **Relatórios**: Geração automática de relatórios HTML com screenshots e métricas para análise de resultados.

Essa estratégia garante validações robustas, focando em qualidade sobre quantidade, com suporte a testes de regressão visual e performance.

## 💡 Justificativas das Decisões Técnicas

- **Cypress + TypeScript**: Cypress foi escolhido por sua simplicidade em testes E2E, sem necessidade de WebDriver, oferecendo debugging integrado e execução rápida. TypeScript adiciona type safety, reduzindo bugs em tempo de desenvolvimento e melhorando a manutenibilidade do código.
- **Estrutura Organizada**: Separação em pastas evita acúmulo de arquivos, facilitando escalabilidade para projetos maiores e colaboração em equipe.
- **Código Reutilizável**: Comandos customizados encapsulam lógica comum, promovendo o princípio DRY (Don't Repeat Yourself) e facilitando refatoração e manutenção.
- **Seletores data-test**: Usados para maior estabilidade em testes, evitando quebras por mudanças de CSS ou estrutura HTML, seguindo as melhores práticas de teste.
- **Fixtures Estruturadas**: Uso de arquivo de fixture  `users.json` para tipos específicos permite testes flexíveis com diferentes usuários sem duplicação de código.
- **Relatórios Avançados**: Integração com `cypress-mochawesome-reporter` e `cypress-multi-reporters` para geração de relatórios detalhados, essenciais para CI/CD e análise de falhas.
- **GitHub**: Repositório público para compartilhamento, colaboração e conformidade com os requisitos do desafio técnico.

## 🔄 Pontos de Melhoria que Implementaria com Mais Tempo

Com mais tempo disponível, implementaria as seguintes melhorias para elevar ainda mais a maturidade do projeto:

- **CI/CD**: Integrar com GitHub Actions para execução automática de testes em pull requests, merges e deploys, com notificações via Slack/Discord.
- **Cobertura de Testes**: Adicionar ferramentas como `cypress/code-coverage` para medir cobertura de código e identificar lacunas nos testes.
- **Paralelização**: Configurar execução paralela em múltiplos containers para reduzir tempo de execução em suites grandes, utilizando serviços como Cypress Dashboard ou GitHub Actions matrix.
- **Page Objects Explícitos**: Implementar padrão Page Object completo para maior abstração, reutilização e separação de responsabilidades entre testes e lógica de página.
- **Integração com APIs**: Se a aplicação tivesse endpoints expostos, adicionar testes de API complementares usando `cy.request()` para validação end-to-end mais completa.
- **Configurações Avançadas**: Adicionar `baseUrl` no `cypress.config.js`, variáveis de ambiente para diferentes ambientes (dev/staging/prod) e configuração de retries automáticos.
- **Testes Visuais**: Integrar com ferramentas como Percy ou Applitools para testes de regressão visual automatizados, especialmente útil com usuários como `visual_user`.
- **Monitoramento e Alertas**: Configurar dashboards com métricas de teste (pass/fail rates, tempo de execução) e alertas para falhas críticas.

---

**Autor**: Valter Estevam Oliveira  
**Repositório**: [GitHub](https://github.com/Aritse-stack/cypress)  
**Licença**: sem licensa