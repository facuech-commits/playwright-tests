# Pruebas automatizadas de EventYa con Playwright

Este repositorio contiene las 15 pruebas end-to-end de EventYa escritas a mano en Playwright para el proyecto final del Diploma de Gerencia en Calidad y Testing de Software del Centro de Ensayos de Software (CES): *Evaluación y propuesta de mejora de la herramienta QA Intelligence*.

Las pruebas sirven como punto de comparación: los mismos 15 casos se generaron también con QA Intelligence, una herramienta que crea pruebas de Playwright a partir de pasos en lenguaje natural. **Los specs generados por QA Intelligence no están en este repositorio**; se guardaron, junto con sus reportes, en la carpeta compartida del proyecto (Apéndice C del informe).

Autores: Macarena Leal y Facundo Echevarría. Tutor: Álvaro Giménez.

## Estado actual (noviembre de 2026)

- Los 15 casos (CP01 a CP15) están escritos, revisados y ejecutados en macOS y en Windows.
- El resultado coincide con la ejecución manual de referencia (línea base) en los 15 casos.
- **Una ejecución correcta de la suite termina con 7 pruebas aprobadas y 8 fallidas.** Las 8 fallas son intencionales: cada una corresponde a un defecto conocido de EventYa, registrado en Mantis. Las pruebas verifican el comportamiento correcto según la especificación funcional, por lo que fallan mientras el defecto exista.
- Después de la revisión técnica se corrigieron CP09 y CP14 (pull request #14). CP09 sigue fallando por su defecto; CP14 dejó de fallar de forma intermitente.

| Caso | Escenario | Resultado esperado | Defecto de EventYa (Mantis) |
| --- | --- | --- | --- |
| CP01 | Login exitoso con usuario válido | Pasa | — |
| CP02 | Login con contraseña incorrecta | Pasa | — |
| CP03 | Cerrar sesión y no acceder a una página protegida | Pasa | — |
| CP04 | Filtrar eventos por categoría Gaming | Falla | El filtro muestra eventos de otras categorías (30996, 30997) |
| CP05 | Buscar un evento por nombre | Pasa | — |
| CP06 | Navegar la paginación del listado | Pasa | — |
| CP07 | El detalle de un evento coincide con su tarjeta | Falla | La búsqueda no se conserva al volver del detalle (31024) |
| CP08 | Límites de cantidad en el detalle del evento (1 a 4) | Falla | Permite elegir más de 4 entradas (30998, 30999) |
| CP09 | Un evento sin stock no se puede agregar al carrito | Falla | Permite agregar un evento sin stock (31000, 31001) |
| CP10 | Cálculo de subtotal y total en el carrito | Pasa | — |
| CP11 | Modificar la cantidad y vaciar el carrito | Falla | Al quitar una unidad, el total no baja (31002) |
| CP12 | Código promocional inválido | Falla | Un código inválido aplica un descuento de $50 (31003) |
| CP13 | Compra completa de punta a punta | Falla | Al comprar 2 entradas se muestra un solo código (31004) |
| CP14 | Pago sin identificador de tarjeta | Pasa | — |
| CP15 | La entrada no muestra datos sensibles de la tarjeta | Falla | La entrada muestra los datos de la tarjeta y otro titular (30995, 31025) |

La especificación completa de cada caso (precondiciones, pasos y resultado esperado) está en la planilla de seguimiento del proyecto (Apéndice A del informe).

## Sistema bajo prueba

EventYa es una aplicación web de venta de entradas provista por el CES: `https://167-99-7-152.sslip.io/eventya/` (hasta el 29/10/2026 estuvo en `https://eventos.ces.com.uy/eventya/`). Es un entorno remoto, así que no hay que levantar nada en el equipo para correr las pruebas.

Las pruebas usan el usuario `tester15` (contraseña `eventya15`). CP15 necesita que ese usuario tenga al menos una entrada comprada.

## Dónde está cada prueba

El proyecto parte de la plataforma de automatización del CES, que organiza el código en capas:

- **Page Objects** (carpetas `poms`): indican cómo ubicar los elementos de cada pantalla.
- **Tasks** (carpetas `tasks`): agrupan acciones y verificaciones que se repiten entre casos, como iniciar sesión.
- **Datos** (carpeta `tests/data`): la entrada y el resultado esperado de cada caso, separados del código de la prueba.

| Casos | Prueba | Datos |
| --- | --- | --- |
| CP01 a CP03 | `tests/modules/login/e2e/access.spec.ts` | `tests/data/access.js` |
| CP04 a CP07 | `tests/modules/events/e2e/catalog.spec.ts` | `tests/data/events.js` |
| CP08 a CP12 | `tests/modules/events/e2e/selection.spec.ts` | `tests/data/selection.js` |
| CP13 y CP14 | `tests/modules/cart/e2e/purchase.spec.ts` | `tests/data/purchase.js` |
| CP15 | `tests/modules/tickets/e2e/tickets.spec.ts` | `tests/data/tickets.js` |

```
tests/
  core/       Capa base (App, Element, Data, Env): la única que usa Playwright directamente
  data/       Datos de los casos y usuario de prueba
  fixtures/   base.fixture.ts: prepara los Page Objects y Tasks para cada prueba
  modules/    Pruebas (e2e), Page Objects (poms) y Tasks (tasks) por módulo:
              login, events, cart, tickets y shell (menú)
reference-nandi/  Ejemplos de la plataforma original del CES para Nandi (no se ejecutan)
sut/              Sistema simulado Nandi de la plataforma original (ya no se usa)
```

## Cómo ejecutar las pruebas

Requisitos: Node.js y Git.

```bash
git clone https://github.com/facuech-commits/playwright-tests.git
cd playwright-tests
npm install                 # dependencias (solo la primera vez)
npm run install:browsers    # navegador Chromium (solo la primera vez)
npm run test                # ejecuta los 15 casos
npm run show-report         # abre el reporte HTML de la última ejecución
```

Para ejecutar un solo caso, se filtra por su identificador:

```bash
npx playwright test -g "CP12"
```

Si el servidor de EventYa responde lento, alguna prueba puede cortarse por tiempo de espera al cargar el inicio de sesión. En la ejecución en macOS del informe se usó un reintento automático, que vuelve a ejecutar una vez cada prueba que falla:

```bash
npx playwright test --retries=1
```

Una falla por tiempo de espera no corresponde a un defecto de EventYa. Las 8 fallas esperadas ocurren en una verificación del caso (por ejemplo, CP12 falla porque el total muestra un descuento que no debería aplicarse).

## Configuración

Todas las variables tienen un valor por defecto, así que la suite corre sin configurar nada. Para cambiarlas, copiar `.env.example` a `.env`:

- `BASE_URL`: dirección de EventYa.
- `BROWSER`: navegador (`chromium`, `firefox` o `webkit`). Si no es Chromium, instalarlo con `npx playwright install firefox` o `npx playwright install webkit`.
- `HEADLESS`: `true` para ejecutar sin ventana visible, `false` para ver el navegador.
- `SLOW_MO`: milisegundos de espera entre acciones, útil para seguir la ejecución a simple vista.
- `TIMEOUT`: tiempo máximo por prueba, en milisegundos.
- `HIGHLIGHT_CSS`: estilo con el que se resaltan los elementos con los que interactúa la prueba.

## Reportes

Cada ejecución genera un reporte HTML en `reports/` (no se sube al repositorio). Incluye, para las pruebas que fallan, el mensaje de error, una captura de pantalla y un video. Los reportes de las ejecuciones citadas en el informe están en la carpeta compartida del proyecto (Apéndice C).

## Historial de cambios

Cada cambio se integró mediante una pull request, que puede consultarse en la pestaña *Pull requests*:

| Pull request | Cambio |
| --- | --- |
| #1 | Adaptación de la plataforma del CES de Nandi a EventYa |
| #2 | CP01 a CP05 (Macarena) |
| #3 a #13 | CP06 a CP15, una por caso (Facundo); la #4 ajusta CP01 a CP05 tras la revisión |
| #14 | Corrección de CP09 y CP14 tras la revisión técnica |

## Otros comandos

```bash
npm run lint          # revisa el código con ESLint
npm run lint:fix      # corrige lo que ESLint puede corregir solo
npm run prettier      # revisa el formato sin modificar archivos
npm run format        # aplica formato (Prettier) y correcciones de ESLint
```
