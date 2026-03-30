# Plan de implementacion: migracion del lenguaje visual de la home al resto de la app

## Objetivo

Tomar el lenguaje visual que hoy vive en [`components/home/HomeDashboard.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeDashboard.tsx) y convertirlo en una base reutilizable para el resto de la app, en lugar de dejarlo aislado en la home.

La idea no es “copiar el dashboard” a todas las pantallas, sino:

- extraer primitives visuales reutilizables;
- reemplazar el sistema viejo de clases sueltas;
- migrar pantallas y componentes por etapas;
- usar esa base nueva para los proximos features, en especial [`docs/ai-features/create-publicacion-unsaved-changes.md`](/Users/121455/Marc/dev/tecladistas/docs/ai-features/create-publicacion-unsaved-changes.md).

## Recomendacion de orden

No conviene hacer una migracion visual completa de toda la app antes de tocar funcionalidad.

Tampoco conviene implementar primero [`docs/ai-features/create-publicacion-unsaved-changes.md`](/Users/121455/Marc/dev/tecladistas/docs/ai-features/create-publicacion-unsaved-changes.md) sobre el lenguaje visual viejo, porque despues habria que tocar la pantalla otra vez.

La secuencia recomendada es:

1. extraer una base visual minima desde la home;
2. aplicar esa base a [`/crear-publicacion`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx) mientras se implementa `create-publicacion-unsaved-changes`;
3. migrar despues el resto de la app por familias de pantallas.

O sea: primero fundacion visual minima, despues `crear-publicacion`, despues expansion.

## Estado actual del proyecto

### 1. Ya existe un lenguaje visual nuevo en la home

En [`components/home/HomeDashboard.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeDashboard.tsx) y [`components/home/HomeSection.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeSection.tsx) ya hay una direccion visual mas consistente:

- paneles con profundidad suave;
- cards con borde y blur;
- chips y eyebrow labels consistentes;
- layouts respirados;
- mejor jerarquia tipografica;
- estados hover mas cuidados.

Ese lenguaje hoy se apoya en clases de [`app/globals.css`](/Users/121455/Marc/dev/tecladistas/app/globals.css):

- `.dashboard-panel`
- `.dashboard-card`
- `.dashboard-link-card`
- `.dashboard-eyebrow`
- `.dashboard-chip`

### 2. El resto de la app sigue usando un sistema visual anterior

Fuera de la home todavia predominan clases mas antiguas, tambien en [`app/globals.css`](/Users/121455/Marc/dev/tecladistas/app/globals.css):

- `.wide-form`
- `.form-title`
- `.submit-button`
- `.box-item`
- `.item`
- `.login-signup`

Eso se ve por ejemplo en:

- [`app/crear-publicacion/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx)
- [`app/entrar/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/entrar/page.tsx)
- [`app/contacto/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/contacto/page.tsx)
- [`components/Cards/ProductCard.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/ProductCard.tsx)

### 3. Hoy el problema no es solo estetico, sino de sistema

El repo tiene ahora dos dialectos visuales:

- uno nuevo, concentrado en la home;
- uno viejo, repartido por formularios, cards y detalles.

Si se sigue iterando sin unificar, cada feature nuevo va a tener que elegir entre:

- seguir el estilo viejo;
- copiar partes del nuevo;
- o mezclar ambos.

Eso vuelve mas caro cualquier cambio.

## Enfoque recomendado

## 1. No reutilizar `HomeDashboard` como componente de layout general

[`components/home/HomeDashboard.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeDashboard.tsx) resuelve contenido especifico de la home. No deberia convertirse en “template” del resto de pantallas.

Lo que si conviene extraer de ahi es su vocabulario visual:

- superficies;
- headers de seccion;
- botones;
- badges;
- formularios;
- cards de contenido.

## 2. Renombrar el sistema visual a nombres genericos

Las clases `dashboard-*` funcionaron para arrancar, pero si van a vivir fuera de la home conviene darles nombres mas amplios.

Ejemplos razonables:

- `.ui-panel` en lugar de `.dashboard-panel`
- `.ui-card` en lugar de `.dashboard-card`
- `.ui-link-card` en lugar de `.dashboard-link-card`
- `.ui-eyebrow` en lugar de `.dashboard-eyebrow`
- `.ui-chip` en lugar de `.dashboard-chip`

No hace falta renombrarlo todo de golpe, pero si conviene que la base nueva ya nazca con naming reutilizable.

## 3. Extraer primitives antes de migrar pantallas

La mejor forma de llevar el diseño al resto no es abrir pantalla por pantalla y “decorarla”. Primero hay que crear primitives.

### Primitives recomendadas

#### Superficies

- `Panel`
- `Card`
- `LinkCard`

Responsabilidad:

- borde;
- radio;
- fondo;
- sombra;
- hover base.

#### Estructura de seccion

Extraer desde [`components/home/HomeSection.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeSection.tsx) una version generica, por ejemplo:

- [`components/ui/SectionPanel.tsx`](/Users/121455/Marc/dev/tecladistas/components/ui/SectionPanel.tsx)

Responsabilidad:

- eyebrow;
- titulo;
- descripcion;
- CTA secundaria.

#### Acciones

- boton primario;
- boton secundario;
- boton destructivo.

Hoy `.submit-button` y `.delete-button` existen, pero conviene modernizarlos en lugar de seguir extendiendolos.

#### Campos y formularios

- wrapper de campo;
- input base;
- textarea base;
- bloque de acciones de formulario;
- shell de formulario.

Esta parte importa especialmente para [`/crear-publicacion`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx), porque su refactor funcional ya va a tocar casi todos los fields.

#### Badges y metadata

- chip neutro;
- chip de estado;
- badge de listing `Venta` / `Alquiler`.

Hoy el dashboard ya tiene un buen punto de partida para esto.

## 4. Definir familias de pantallas para migrar

No conviene migrar “por archivo”. Conviene migrar por familia de UX.

### Familia A: formularios y auth

Incluye:

- [`app/crear-publicacion/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx)
- [`app/entrar/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/entrar/page.tsx)
- [`app/registrarse/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/registrarse/page.tsx)
- [`app/contacto/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/contacto/page.tsx)
- [`app/crear-usuario/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/crear-usuario/page.tsx)
- [`app/eliminar-usuario/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/eliminar-usuario/page.tsx)

Esta deberia ser la primera familia a migrar, porque:

- comparte patrones de layout;
- depende mucho de inputs y botones;
- se beneficia directamente del sistema nuevo.

### Familia B: cards y listados

Incluye:

- [`components/Cards/ProductCard.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/ProductCard.tsx)
- [`components/Cards/StudioCard.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/StudioCard.tsx)
- [`components/Cards/ProfessionalCard.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/ProfessionalCard.tsx)
- [`components/Cards/CardNew.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/CardNew.tsx)
- [`components/Products.tsx`](/Users/121455/Marc/dev/tecladistas/components/Products.tsx)

Esta familia deberia ir despues, porque varias piezas ya tienen equivalentes visuales en la home.

### Familia C: detalles

Incluye:

- [`app/instrumentos/[productId]/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/instrumentos/[productId]/page.tsx)
- [`app/estudios/[studioId]/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/estudios/[studioId]/page.tsx)
- [`app/profesionales/[professionalId]/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/profesionales/[professionalId]/page.tsx)

Esta capa puede venir tercera, cuando ya existan paneles, metadata blocks y botones consistentes.

### Familia D: secciones especiales

Incluye:

- fotos;
- partituras;
- paginas institucionales o mixtas.

Estas pantallas probablemente necesiten decisiones especificas y no son el mejor primer paso.

## 5. Usar `/crear-publicacion` como primer consumidor serio

Mi recomendacion concreta es que [`/crear-publicacion`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx) sea el primer caso real despues de extraer la base.

Motivos:

- ya necesita refactor funcional fuerte por [`docs/ai-features/create-publicacion-unsaved-changes.md`](/Users/121455/Marc/dev/tecladistas/docs/ai-features/create-publicacion-unsaved-changes.md);
- hoy usa mucho del sistema viejo;
- tiene dos variantes de formulario (`venta` y `alquiler`);
- si se hace primero con el diseño viejo, despues habria que tocarla otra vez.

Conclusión practica:

- primero base visual;
- despues `crear-publicacion` con feature funcional + adopcion visual;
- despues auth/contacto;
- despues listados y detalles.

## Propuesta tecnica

## 1. Crear una carpeta `components/ui`

Sugerencia:

- [`components/ui/Surface.tsx`](/Users/121455/Marc/dev/tecladistas/components/ui/Surface.tsx)
- [`components/ui/SectionPanel.tsx`](/Users/121455/Marc/dev/tecladistas/components/ui/SectionPanel.tsx)
- [`components/ui/Button.tsx`](/Users/121455/Marc/dev/tecladistas/components/ui/Button.tsx)
- [`components/ui/Field.tsx`](/Users/121455/Marc/dev/tecladistas/components/ui/Field.tsx)
- [`components/ui/Chip.tsx`](/Users/121455/Marc/dev/tecladistas/components/ui/Chip.tsx)

No hace falta construir un mini design system enorme. Solo lo suficiente para evitar seguir copiando clases.

## 2. Mover estilos a tokens y utilidades comunes

En [`app/globals.css`](/Users/121455/Marc/dev/tecladistas/app/globals.css) conviene:

- mantener temporalmente las clases viejas;
- agregar las nuevas genéricas;
- evitar borrar todo de una vez.

La migracion deberia ser progresiva:

- primero coexistencia;
- luego reemplazo de consumidores;
- despues limpieza.

## 3. Reducir dependencia de nombres legacy

Clases como:

- `.box-item`
- `.wide-form`
- `.login-signup`
- `.item`
- `.submit-button`

deberian dejar de ser la base del trabajo nuevo.

No hace falta eliminarlas inmediatamente, pero si marcar una regla:

- features nuevos no se construyen sobre esas clases.

## Secuencia recomendada de implementacion

### Fase 1: fundacion visual minima

1. Extraer primitives visuales desde la home.
2. Agregar clases o componentes genericos nuevos.
3. Mantener compatibilidad con `dashboard-*` mientras se migra.
4. No tocar todavia todas las pantallas.

### Fase 2: primer consumidor real

1. Implementar [`docs/ai-features/create-publicacion-unsaved-changes.md`](/Users/121455/Marc/dev/tecladistas/docs/ai-features/create-publicacion-unsaved-changes.md).
2. Al mismo tiempo, migrar [`app/crear-publicacion/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx) al sistema visual nuevo.
3. Usar esa pantalla para ajustar `Field`, botones, bloques de acciones y spacing.

### Fase 3: formularios hermanos

1. Migrar login.
2. Migrar registro.
3. Migrar contacto.
4. Migrar alta/baja de usuarios.

### Fase 4: cards y listados

1. Migrar product cards.
2. Migrar studio cards.
3. Migrar professional cards.
4. Ajustar grids y contenedores de listados.

### Fase 5: detalles

1. Migrar detalle de instrumento.
2. Migrar detalle de estudio.
3. Migrar detalle de profesional.

### Fase 6: limpieza

1. Detectar clases legacy sin uso.
2. Eliminar CSS viejo que ya no tenga consumidores.
3. Dejar documentada la convencion visual nueva.

## Criterios de aceptacion

La migracion se considera bien encaminada si:

- existe una base visual reutilizable fuera de la home;
- [`/crear-publicacion`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx) ya usa esa base;
- las pantallas nuevas dejan de depender de `.wide-form`, `.box-item` y `.submit-button`;
- la app empieza a verse como un mismo producto y no como dos etapas visuales mezcladas;
- la home sigue funcionando sin regresiones mientras se migra.

## Riesgos y notas

### 1. No conviene intentar “big bang redesign”

Si se intenta rehacer toda la app en una sola pasada, es facil mezclar:

- cambios visuales;
- cambios funcionales;
- regresiones de layout;
- inconsistencias entre mobile y desktop.

Mejor migracion incremental.

### 2. `create-publicacion` no deberia esperar al final

Esa pantalla es justamente donde mas valor tiene la nueva base visual, porque ya va a requerir refactor funcional.

Dejarla para despues haria mas trabajo, no menos.

### 3. El nombre `dashboard-*` ya quedo corto

Si el sistema nuevo va a expandirse al resto de la app, conviene empezar a hablar de UI compartida y no de estilos “del dashboard”.

## Conclusion recomendada

La mejor estrategia no es hacerlo “antes o despues” como bloques aislados.

La mejor estrategia es:

- primero una fundacion visual minima;
- despues [`docs/ai-features/create-publicacion-unsaved-changes.md`](/Users/121455/Marc/dev/tecladistas/docs/ai-features/create-publicacion-unsaved-changes.md) usando esa fundacion;
- despues el resto de la app por familias de pantallas.
