# Nandi - Mock server (SUT)

## Ejecutar

```
node server.js
```

Por defecto corre en `http://localhost:8000`. Para usar otro puerto:

```
PORT=8123 node server.js
```

## Usuarios de prueba

| Usuario | Password    | Rol    |
| ------- | ----------- | ------ |
| Carlos  | VazFerreira | admin  |
| Mario   | Benedetti   | writer |

## Resetear datos

```
node reset-data.js
```

Vuelve a dejar `data.json` con los usuarios de prueba y tres cursos de ejemplo (uno sin secciones, otro con dos y otro con cinco).

## Nota sobre duplicación conocida en `server.js`

La validación de curso y de sección (`server.js`) repite el mismo bloque entre el alta
(`POST`) y la edición (`PUT`) de cada una. Es una duplicación real y se podría sacar a
funciones compartidas, pero se deja así a propósito: este servidor es el mock bajo prueba
para ejercitar la librería de testing, no código pensado para uso real, así que no vale la
pena invertir en deduplicarlo.
