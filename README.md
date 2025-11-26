# Nest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Configuração do ambiente

Todas as variáveis ​​de tempo de compilação (URLs da API, versão, etc.) residem em `src/environments/`:

- `environment.ts`: desenvolvimento local (padrão para `ng serve`)
- `environment.stage.ts`: builds de teste (`ng build --configuration stage`)
- `environment.prod.ts`: builds de produção (`ng build --configuration production`)

O mecanismo de substituição de arquivos do Angular troca `src/environments/environment.ts` pelo arquivo correspondente à configuração selecionada, garantindo que cada build receba os metadados da API corretos.

Em tempo de execução, o ambiente ativo é exposto por meio do token de injeção `APP_ENVIRONMENT` para componentes/guards/serviços que precisam ler esses valores.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
