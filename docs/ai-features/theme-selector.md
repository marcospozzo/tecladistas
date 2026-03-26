# Plan de implementacion: selector de theme (`system` / `light` / `dark`)

## Ubicacion elegida para estos planes

Voy a guardar este tipo de documentos en `docs/ai-features/`.

Motivos:

- queda fuera del codigo ejecutable;
- es facil de versionar y revisar en PRs;
- permite seguir una convencion simple: un archivo por feature, con nombre descriptivo.

Convencion sugerida para futuros archivos:

- `docs/ai-features/theme-selector.md`
- `docs/ai-features/home-redesign.md`
- `docs/ai-features/buscador-avanzado.md`

## Objetivo del feature

Agregar un selector de theme en la app para que la persona usuaria pueda elegir entre:

- `system`
- `light`
- `dark`

El selector debe:

- reflejar visualmente la opcion elegida;
- persistir la preferencia entre recargas;
- aplicar el mismo modo tanto a Tailwind como a MUI;
- evitar inconsistencias entre server render, hydration y primer paint.

## Estado actual del proyecto

### 1. MUI ya tiene theming, pero fijo en `dark`

Hoy [`components/ThemeRegistry.tsx`](/Users/121455/Marc/dev/tecladistas/components/ThemeRegistry.tsx) crea un theme de MUI con:

- `palette.mode = "dark"`
- `primary.main = "#445566"`

Eso significa que los componentes MUI ya estan bajo `ThemeProvider`, pero el modo no es configurable.

### 2. Tailwind usa clases `dark:*`, pero no esta preparado para un toggle manual

En [`app/globals.css`](/Users/121455/Marc/dev/tecladistas/app/globals.css) hay varias clases `dark:*`.

Sin embargo, en [`tailwind.config.ts`](/Users/121455/Marc/dev/tecladistas/tailwind.config.ts) no hay `darkMode: "class"`, por lo que Tailwind queda con el comportamiento por defecto basado en media query del sistema.

Consecuencia:

- `system` ya esta parcialmente cubierto;
- `light` y `dark` forzados por UI no van a funcionar bien sin migrar a modo `class`.

### 3. Ya existe un lugar natural para poner el selector

[`components/Header.tsx`](/Users/121455/Marc/dev/tecladistas/components/Header.tsx) tiene un menu de ajustes abierto desde el avatar. Ese es el lugar mas natural para ubicar el selector sin redisenar navegacion.

### 4. El layout raiz todavia no aplica ninguna marca explicita de theme al documento

[`app/layout.tsx`](/Users/121455/Marc/dev/tecladistas/app/layout.tsx) renderiza `<html lang="es">` y `<body>` sin clases o atributos de theme. Para que Tailwind y CSS reaccionen al selector, va a hacer falta aplicar estado al documento raiz.

## Enfoque recomendado

Implementar un sistema unico de theme en cliente que maneje dos conceptos:

- `themePreference`: la preferencia elegida por la persona usuaria (`system` | `light` | `dark`)
- `resolvedTheme`: el theme realmente aplicado (`light` | `dark`), que en caso de `system` se resuelve usando `prefers-color-scheme`

Ese estado debe ser la fuente unica de verdad para:

- clase `dark` en `html`;
- `color-scheme` del documento;
- theme de MUI;
- selector visual del header.

## Propuesta tecnica

### 1. Crear un provider propio de theme de aplicacion

Agregar un provider cliente, por ejemplo:

- [`components/theme/AppThemeProvider.tsx`](/Users/121455/Marc/dev/tecladistas/components/theme/AppThemeProvider.tsx)

Responsabilidades:

- leer la preferencia inicial desde `localStorage`;
- si no existe, usar `system`;
- escuchar cambios de `prefers-color-scheme` cuando la preferencia sea `system`;
- calcular `resolvedTheme`;
- exponer un contexto o hook con:
  - `themePreference`
  - `resolvedTheme`
  - `setThemePreference`
- aplicar side effects sobre `document.documentElement`.

### 2. Aplicar el theme al documento raiz

Cuando cambie `resolvedTheme`, el provider debe:

- agregar o remover la clase `dark` en `html`;
- opcionalmente setear `data-theme="light|dark"` para CSS mas explicito;
- setear `document.documentElement.style.colorScheme` a `light` o `dark`.

Esto resuelve:

- Tailwind `dark:*`;
- widgets nativos del navegador;
- coherencia visual general.

### 3. Refactorizar el bridge de MUI

Refactorizar [`components/ThemeRegistry.tsx`](/Users/121455/Marc/dev/tecladistas/components/ThemeRegistry.tsx) para que deje de usar un theme fijo y reciba el modo resuelto.

Opciones validas:

- que `ThemeRegistry` consuma el contexto del provider nuevo;
- o que `AppThemeProvider` envuelva internamente a `ThemeRegistry`.

Resultado esperado:

- `AppBar`, `Menu`, `Button`, `Avatar` y resto de componentes MUI cambian junto con Tailwind;
- se elimina la divergencia actual donde MUI esta siempre en `dark`.

### 4. Ajustar Tailwind para modo manual

Modificar [`tailwind.config.ts`](/Users/121455/Marc/dev/tecladistas/tailwind.config.ts) para usar:

- `darkMode: "class"`

Esto es necesario para que:

- `light` fuerce modo claro aunque el sistema sea oscuro;
- `dark` fuerce modo oscuro aunque el sistema sea claro;
- `system` siga funcionando a traves del calculo en cliente.

### 5. Revisar `globals.css` para no mezclar dos fuentes de verdad

Hoy [`app/globals.css`](/Users/121455/Marc/dev/tecladistas/app/globals.css) usa `:root` + `@media (prefers-color-scheme: dark)`.

Ese enfoque conviene migrarlo a una estructura controlada por clase o atributo, por ejemplo:

- `:root` para light;
- `html.dark` para dark.

Objetivo:

- que el selector tenga prioridad real;
- que no compita una media query con una preferencia guardada.

### 6. Agregar el selector al header

Agregar un componente nuevo, por ejemplo:

- [`components/theme/ThemeSelector.tsx`](/Users/121455/Marc/dev/tecladistas/components/theme/ThemeSelector.tsx)

Ubicacion:

- dentro del menu de ajustes en [`components/Header.tsx`](/Users/121455/Marc/dev/tecladistas/components/Header.tsx)

Comportamiento esperado:

- mostrar las tres opciones: `System`, `Light`, `Dark`;
- resaltar la opcion activa;
- cerrar el menu o dejarlo abierto segun convenga a la UX del menu actual;
- funcionar tanto en desktop como en mobile.

Implementacion sugerida:

- `MenuItem` de MUI;
- o `ToggleButtonGroup` si se quiere una UI mas explicita.

Para este repo, `MenuItem` probablemente implique menos friccion con el layout existente.

### 7. Evitar flash de theme incorrecto al cargar

Este es el punto mas sensible del feature.

Si el theme solo se aplica despues de hidratar React, puede aparecer un flash de modo incorrecto.

Plan recomendado:

- agregar un script muy chico en [`app/layout.tsx`](/Users/121455/Marc/dev/tecladistas/app/layout.tsx) que corra antes de hidratar;
- ese script debe:
  - leer `localStorage`;
  - resolver `system` con `matchMedia`;
  - aplicar clase `dark` y `color-scheme` al `<html>`;
- usar `suppressHydrationWarning` en `<html>` si hace falta para evitar warnings por diferencia entre server y cliente.

Este paso vale la pena aunque la primera version del feature sea simple, porque evita una regresion visual facil de notar.

## Archivos a tocar

### Nuevos archivos

- [`components/theme/AppThemeProvider.tsx`](/Users/121455/Marc/dev/tecladistas/components/theme/AppThemeProvider.tsx)
- [`components/theme/ThemeSelector.tsx`](/Users/121455/Marc/dev/tecladistas/components/theme/ThemeSelector.tsx)
- opcional: [`components/theme/theme.ts`](/Users/121455/Marc/dev/tecladistas/components/theme/theme.ts) para centralizar tipos, helpers y claves de storage

### Archivos existentes

- [`components/Provider.tsx`](/Users/121455/Marc/dev/tecladistas/components/Provider.tsx)
- [`components/ThemeRegistry.tsx`](/Users/121455/Marc/dev/tecladistas/components/ThemeRegistry.tsx)
- [`components/Header.tsx`](/Users/121455/Marc/dev/tecladistas/components/Header.tsx)
- [`app/layout.tsx`](/Users/121455/Marc/dev/tecladistas/app/layout.tsx)
- [`app/globals.css`](/Users/121455/Marc/dev/tecladistas/app/globals.css)
- [`tailwind.config.ts`](/Users/121455/Marc/dev/tecladistas/tailwind.config.ts)

## Secuencia de implementacion sugerida

1. Crear tipos y helpers de theme (`system`, `light`, `dark`).
2. Crear `AppThemeProvider` con estado, persistencia y resolucion del modo.
3. Conectar el provider en [`components/Provider.tsx`](/Users/121455/Marc/dev/tecladistas/components/Provider.tsx).
4. Refactorizar [`components/ThemeRegistry.tsx`](/Users/121455/Marc/dev/tecladistas/components/ThemeRegistry.tsx) para usar el modo resuelto.
5. Cambiar [`tailwind.config.ts`](/Users/121455/Marc/dev/tecladistas/tailwind.config.ts) a `darkMode: "class"`.
6. Ajustar [`app/globals.css`](/Users/121455/Marc/dev/tecladistas/app/globals.css) para que dependa de `html.dark` en lugar de `prefers-color-scheme`.
7. Agregar el script inicial de theme en [`app/layout.tsx`](/Users/121455/Marc/dev/tecladistas/app/layout.tsx).
8. Crear `ThemeSelector` y montarlo en [`components/Header.tsx`](/Users/121455/Marc/dev/tecladistas/components/Header.tsx).
9. Validar manualmente desktop/mobile y revisar hydration warnings.

## Criterios de aceptacion

El feature se considera correcto si:

- existe un selector visible y usable con `system`, `light` y `dark`;
- al elegir `light`, la app queda en claro aunque el sistema operativo este en oscuro;
- al elegir `dark`, la app queda en oscuro aunque el sistema operativo este en claro;
- al elegir `system`, la app sigue el modo del sistema operativo;
- la preferencia persiste al recargar;
- MUI y Tailwind cambian juntos;
- no hay flash evidente de theme incorrecto al entrar;
- no aparecen errores de hydration relacionados al theme.

## Validacion manual propuesta

### Caso 1: primera carga sin preferencia guardada

- borrar la clave de `localStorage`;
- abrir la app con sistema en claro;
- verificar que el sitio entre en claro;
- repetir con sistema en oscuro.

### Caso 2: preferencia explicita

- elegir `light`;
- recargar;
- verificar que siga en claro;
- elegir `dark`;
- recargar;
- verificar que siga en oscuro.

### Caso 3: modo system reactivo

- elegir `system`;
- cambiar el theme del sistema operativo;
- verificar que la app se actualice sin recarga.

### Caso 4: consistencia visual

- revisar header MUI;
- revisar cards y formularios con clases `dark:*`;
- revisar fondos, inputs, menus y textos.

### Caso 5: responsive

- verificar menu de header en mobile;
- verificar que el selector siga siendo accesible dentro del menu colapsado o del menu de usuario.

## Riesgos y puntos de atencion

### 1. MUI y Tailwind pueden quedar desincronizados

Si cada uno resuelve el modo por su cuenta, se va a notar enseguida. El plan evita eso con una sola fuente de verdad.

### 2. Flash de theme incorrecto

Si no se agrega un script inicial en layout, es probable ver un primer paint con el modo equivocado.

### 3. Migracion de `prefers-color-scheme` a `class`

Hay estilos globales que hoy dependen de media query. Conviene revisarlos con cuidado para no introducir regresiones visuales en fondos, inputs y bloques principales.

### 4. UX del selector dentro del menu actual

El menu de usuario hoy tiene pocas opciones. Agregar tres opciones de theme puede requerir separador visual o una etiqueta de seccion para que no quede confuso.

## Fuera de alcance para esta primera iteracion

- persistencia del theme en backend o por usuario autenticado;
- sincronizacion entre dispositivos;
- rediseno amplio de paletas o tokens visuales;
- soporte para themes custom adicionales.

## Resultado esperado de la implementacion

Al terminar, la app va a tener un sistema de theme consistente y extensible, con una base tecnica reutilizable para otros ajustes visuales. El cambio tambien va a ordenar la relacion entre MUI, Tailwind y estilos globales, que hoy esta parcialmente partida entre `dark` fijo, media queries y clases utilitarias.
