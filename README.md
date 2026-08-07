# TaskList — Tablero Kanban tipo Trello

<p align="center">
  <img src="docs/screenshots/01_tablero_claro.png" alt="Tablero Kanban en modo claro" width="900">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/shadcn%2Fui-Radix-black" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/Capacitor-Android-119EFF?logo=capacitor&logoColor=white" alt="Capacitor">
  <img src="https://img.shields.io/badge/Licencia-Propietaria-red" alt="Licencia propietaria">
</p>

Tablero Kanban inspirado en Trello construido con **Next.js 14 (App Router)** y exportado como **sitio 100% estático**: sin backend, con persistencia en `localStorage`, **drag & drop**, búsqueda en tiempo real, filtros por estado, modo claro/oscuro y build nativo Android vía **Capacitor**.

## Funcionalidades

- **Drag & drop** con [@dnd-kit](https://dndkit.com/): reordenar tarjetas dentro de una lista y moverlas entre listas, con overlay visual al arrastrar y soporte de teclado.
- **Búsqueda en tiempo real** desde la barra superior, que filtra las tarjetas de todo el tablero.
- **Filtros por estado** (Por hacer / En proceso / Completado) con chips y **contador `visibles/total`** en cada lista.
- **Semáforo de estado** por tarjeta, cambiable desde un menú radio.
- CRUD completo de listas y tarjetas con validación (zod + react-hook-form) y confirmaciones de borrado.
- **Modo claro/oscuro** con next-themes.
- **Persistencia automática** en `localStorage` (con migración de datos de versiones anteriores).
- **App Android** generada con Capacitor a partir del export estático.
- **CI/CD** a Azure Static Web Apps con GitHub Actions.

## Interfaces

| Modo oscuro | Búsqueda filtrando en vivo |
|---|---|
| ![Modo oscuro](docs/screenshots/02_tablero_oscuro.png) | ![Búsqueda](docs/screenshots/03_busqueda.png) |

<p align="center">
  <img src="docs/screenshots/04_movil.png" alt="Vista móvil" width="320">
</p>

## Arquitectura

```mermaid
flowchart LR
    UI["Componentes<br/>shadcn/ui + Radix"] --> Ctx["Estado global<br/>useReducer + Context"]
    Ctx --> LS[("localStorage")]
    DND["dnd-kit<br/>DndContext + Sortable"] --> Ctx
    F["FilterContext<br/>búsqueda + estado"] --> UI
```

- **Estado**: `useReducer` + Context API propios (sin librerías de estado externas). El drag & drop aplica el nuevo orden mediante la acción `REPLACE` y un `useEffect` persiste cada cambio.
- **Filtros**: contexto separado (`FilterContext`) porque el buscador vive en el layout y el tablero en la página; el filtrado es 100% derivado y no altera los datos guardados.
- **IDs**: `crypto.randomUUID()` (con normalización de IDs numéricos antiguos al cargar).

## Decisiones de interfaz

- **Fondo sobrio en lugar de fotografía.** El tablero usaba una foto de paisaje a pantalla completa con `opacity-45`: competía visualmente con las tarjetas y hacía que el contraste del texto dependiera de la zona de la imagen que quedara detrás. Se sustituyó por un degradado lineal construido con tokens del tema (`--app-gradient-from` / `--app-gradient-to`), distinto en claro y en oscuro. Así el contraste es predecible y medible, y el archivo de imagen deja de viajar en el bundle estático.
- **Tres superficies, no una.** Fondo (degradado) para la página, `--panel` para la columna de cada lista y `--card` para la tarjeta. En modo oscuro la tarjeta es más clara que el panel y el panel más claro que el fondo, de modo que la jerarquía se lee sin depender de la sombra.
- **Texto de tarjeta sin cortes feos.** Antes la tarjeta tenía alto máximo fijo y el texto se recortaba a media línea. Ahora la tarjeta crece con su contenido, el texto parte por palabra (`break-words`) y solo las descripciones muy largas se limitan con `line-clamp`, que corta en un salto de línea; el texto completo queda accesible en el `title`.
- **Contraste AA verificado** en ambos temas para texto y controles: texto de tarjeta 19.8:1 en claro y 10.1:1 en oscuro, texto sobre panel por encima de 6:1 en ambos, y todos los controles con estado `hover` y `focus-visible` explícito.

## Ejecución local

```bash
git clone https://github.com/danielyatacoblas/trello-clone.git
cd trello-clone
npm install
npm run dev      # http://localhost:3000
```

No requiere variables de entorno ni servicios externos.

### Build y Android

```bash
npm run build    # export estático en /out
npx cap sync     # sincroniza con el proyecto Android
npx cap open android
```

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 App Router (`output: 'export'`) + React 18 |
| Lenguaje | TypeScript |
| UI | Tailwind CSS + shadcn/ui (Radix UI) + next-themes |
| Drag & drop | @dnd-kit/core + @dnd-kit/sortable |
| Formularios | react-hook-form + zod |
| Móvil | Capacitor 6 (Android) |
| CI/CD | GitHub Actions a Azure Static Web Apps |

## Diagramas

Ambos diagramas se generan con `scripts/render_diagrams.py` a partir de
`diagrams/architecture.json`, que es la fuente de verdad. Al cambiar la
arquitectura o el modelo de ramas se edita ese archivo y se vuelven a generar,
de modo que la documentacion no se desincroniza del proyecto.

### Flujo de la aplicacion

![Flujo de la aplicacion](diagrams/rendered/flujo.svg)

### Flujo de trabajo con Git

El repositorio sigue Git Flow: `main` siempre desplegable, `develop` como
integracion, y una rama por cambio. Los merges son `--no-ff` para que cada
funcionalidad quede como un bloque legible en el historial, y cada version
llega a `main` etiquetada.

Este es el historial real del repositorio, no un ejemplo:

```mermaid
gitGraph
   commit id: "Initial commit from Create Next App"
   commit id: "+6 commits mas"
   commit id: "ci: add Azure Static Web Apps workfl..."
   branch develop
   branch fix/ui-bugs
   commit id: "fix: correct theme typo and stray qu..."
   commit id: "fix: generate ids with crypto.random..."
   commit id: "+3 commits mas"
   checkout develop
   merge fix/ui-bugs
   branch feature/drag-and-drop
   commit id: "feat: add dnd-kit dependencies for d..."
   commit id: "feat: implement drag and drop for ca..."
   checkout develop
   merge feature/drag-and-drop
   branch feature/search-and-filters
   commit id: "feat: add filter context for card se..."
   commit id: "feat: add real-time card search inpu..."
   commit id: "+1 commits mas"
   checkout develop
   merge feature/search-and-filters
   branch fix/azure-deploy-output
   commit id: "ci: point Azure Static Web Apps to N..."
   checkout develop
   merge fix/azure-deploy-output
   branch docs/readme-and-license
   commit id: "docs: add proprietary license"
   commit id: "docs: add board screenshots (light, ..."
   commit id: "+1 commits mas (2)"
   checkout develop
   merge docs/readme-and-license
   checkout main
   merge develop tag: "portfolio release"
   checkout develop
   branch chore/remove-emojis
   commit id: "docs: remove emojis from README head..."
   checkout develop
   merge chore/remove-emojis
   branch feature/ui-polish
   commit id: "feat: replace photo background and r..."
   checkout develop
   merge feature/ui-polish
   branch docs/screenshots-ui-polish
   commit id: "docs: refresh screenshots after the ..."
   checkout develop
   merge docs/screenshots-ui-polish
   checkout main
   merge develop tag: "portfolio release"
   checkout develop
   branch chore/harden-gitignore
   commit id: "chore: harden gitignore against comm..."
   checkout develop
   merge chore/harden-gitignore
   checkout main
   merge develop tag: "gitignore hardening"
   checkout develop
   branch docs/diagrams
   commit id: "docs: add generated architecture and..."
   checkout develop
   merge docs/diagrams
   checkout main
   merge develop tag: "diagrams"
```

Regenerar despues de editar la especificacion:

```bash
python scripts/render_diagrams.py --render-png   # SVG, PNG y mermaid
python scripts/render_diagrams.py --check        # falla si quedaron desactualizados
```

## Autor

**Daniel Yataco Blas** — [GitHub](https://github.com/danielyatacoblas)

## Licencia

Proyecto de portafolio bajo **licencia propietaria**: el código puede verse con fines de evaluación profesional, pero no copiarse, redistribuirse ni reutilizarse sin autorización escrita. Ver [LICENSE](LICENSE).
