# Playwright E2E and API

Suite de pruebas automatizadas con [Playwright](https://playwright.dev/), con dos tipos de pruebas:

- **E2E**: pruebas de UI que manejan un navegador real (login, navegación, formularios, modales).
- **API**: pruebas que llaman directamente a los endpoints HTTP, sin pasar por la UI.

Ambos tipos conviven en el mismo repo, organizados por módulo funcional.

## Sistema bajo prueba

Las pruebas corren contra **EventYa** (`https://167-99-7-152.sslip.io/eventya/`), una app de venta de entradas. El mock **Nandi** del principio quedó en `reference-nandi/` como ejemplo.

Usuarios de prueba: `tester01` a `tester15`, con contraseña `eventya01` a `eventya15`.

## Estructura del proyecto

```
sut/                      Mock de Nandi (prueba de humo inicial, ya no se usa): servidor Node + páginas HTML
  server.js               API + servidor estático (node sut/server.js)
  reset-data.js           Repone data.json a su estado inicial (usuarios + cursos de ejemplo)
  public/                 login.html, home.html y profile.html (ventana emergente)

reference-nandi/          Specs, POMs, Tasks y datasets de Nandi, de referencia (no se ejecutan)
  modules/                login, courses, sections, profile, shell (ejemplo)
  data/                   Datasets de los casos de Nandi (login.js, courses.js, sections.js, users.js)

tests/
  core/                   App, Element, Data, Env: la única capa que importa Playwright directo
  data/                   Datasets de casos de prueba de EventYa (users.js, y los que se sumen)
  fixtures/               base.fixture.ts: arma el fixture `app`; se van agregando POMs/Tasks por módulo
  modules/                Specs, Page Objects y Tasks de EventYa, organizados por módulo (en construcción)
```

## Variables de entorno

Copiá `.env.example` a `.env` y ajustá los valores si hace falta. Todas tienen un default razonable, así que la suite corre igual sin `.env`.

- `BASE_URL`: URL del sistema bajo prueba (por defecto, EventYa en `https://167-99-7-152.sslip.io/eventya/`).
- `BROWSER`: motor a usar (`chromium`, `firefox` o `webkit`).
- `HEADLESS`: `true` para correr sin ventana visible, `false` para ver el navegador.
- `SLOW_MO`: milisegundos de espera entre cada acción de Playwright.
- `TIMEOUT`: timeout máximo por test, en milisegundos.
- `HIGHLIGHT_CSS`: CSS a aplicar a elementos que se interactuen

## Antes de correr las pruebas

Instalar las dependencias del proyecto (solo hace falta la primera vez, o después de modificar `package.json`):

```bash
npm install
```

EventYa es un entorno remoto, así que no hace falta levantar nada local para correr la suite actual.

`npm run sut` solo es necesario si querés correr manualmente la suite de referencia de Nandi (`reference-nandi/`), apuntando `BASE_URL` de vuelta a `http://localhost:8000`.

Opcional (solo para Nandi): reiniciar los datos de ejemplo (usuarios + cursos) antes de una corrida limpia:

```bash
npm run reset-data
```

Instalar los navegadores que Playwright necesita (solo hace falta la primera vez, o después de actualizar `@playwright/test`):

```bash
npm run install:browsers
```

Ese script instala Chromium. Si `BROWSER` está en `firefox` o `webkit`, instalá ese en su lugar:

```bash
npx playwright install firefox
npx playwright install webkit
```

## Comandos disponibles

```bash
npm run test              # toda la suite
npm run show-report       # abrir el reporte HTML de la última corrida
npm run install:browsers  # instalar Chromium para Playwright
npm run lint              # eslint sobre todo el repo
npm run lint:fix          # eslint --fix
npm run prettier          # chequea formato sin modificar archivos
npm run prettier:fix      # aplica formato con Prettier
npm run format            # prettier:fix + lint:fix
```

## Reportes

Cada ejecución genera reportes en `reports/`, para abrir el reporte HTML de la última ejecución.

```bash
npm run show-report
```
