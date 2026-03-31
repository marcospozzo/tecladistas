# Plan de implementacion: cambios sin guardar y validacion en `/crear-publicacion`

## Objetivo

Mejorar [`app/crear-publicacion/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx) para cubrir dos necesidades concretas:

- advertir cuando la persona usuaria intenta salir de la pantalla con cambios sin guardar;
- endurecer la validacion y el formateo de los datos antes de publicar o guardar cambios.

El alcance incluye tambien agregar un boton `Cancelar` al lado de la accion principal, con descarte explicito del formulario y navegacion a [`/instrumentos`](/Users/121455/Marc/dev/tecladistas/app/instrumentos/page.tsx).

## Estado actual de la pantalla

Hoy la pagina ya tiene una base visual consistente y un formulario funcional, pero el comportamiento todavia es basico.

### 1. La pantalla soporta dos flujos reales

La misma vista maneja:

- creacion de publicacion;
- edicion de publicacion via `?id=...`.

Ademas, el formulario cambia segun `listingType`:

- `sale`:
  - muestra `Canje`;
  - usa label `Precio`;
- `rent`:
  - oculta `Canje`;
  - usa label `Precio / día`.

Eso implica que el feature no puede tratar el form como una sola estructura plana: hay campos comunes y reglas que dependen de la variante.

### 2. El formulario ya tiene parte de la validacion visual, pero no una capa unificada

Actualmente la pantalla ya hace algunas cosas bien:

- `Título`, `Precio` y `Ubicación` se muestran como requeridos;
- `Ubicación` ya tiene limite de `20` caracteres;
- la imagen valida tipo y tamaño antes de enviar;
- `Foto` y `Confirmación` ya participan en el flujo de requeridos al crear.

Pero la validacion sigue repartida entre varios puntos:

- atributos HTML (`required`, `maxLength`);
- estado local de imagen;
- reglas condicionales por `listingType`;
- validaciones implicitas del backend.

Todavia falta una capa unica para:

- normalizar texto;
- validar numericos;
- resolver reglas de negocio;
- comparar si el formulario esta “dirty”.

### 3. No existe proteccion contra salida accidental

Hoy si la persona:

- refresca;
- cierra la pestaña;
- vuelve atras;
- navega a otra seccion;

la pantalla no muestra ninguna advertencia y el estado se pierde.

No existe:

- `beforeunload`;
- guard de cambios sin guardar;
- boton `Cancelar`.

### 4. El formulario sigue siendo dificil de comparar campo a campo

La pagina usa:

- `useReducer` para `data`;
- `useState` para `image`;
- `useState` para `imageError`;
- `useState` para `listingType`.

Ademas, [`components/EditableInput.tsx`](/Users/121455/Marc/dev/tecladistas/components/EditableInput.tsx) sigue teniendo una mecanica semieditable:

- renderiza un `button` cuando el campo ya tiene valor;
- pasa a `input` solo al entrar en modo edicion;
- usa `defaultValue` en vez de `value`.

Eso hace que el formulario hoy no sea una fuente de verdad totalmente controlada, y complica tres cosas:

- detectar cambios con precision;
- normalizar mientras la persona escribe o al salir del campo;
- mostrar errores por campo de manera consistente.

### 5. Hay detalles de copy y estructura que conviene ordenar dentro del mismo feature

El formulario hoy todavia arrastra algunas decisiones de nombres/copy mejorables:

- [`utils/utils.tsx`](/Users/121455/Marc/dev/tecladistas/utils/utils.tsx) sigue usando `placeholders.disclamer`;
- ese texto no es realmente un placeholder, sino el copy del checkbox de consentimiento.

No bloquea el feature, pero conviene corregirlo dentro de esta misma pasada para que la logica de formulario no siga montada sobre nombres ambiguos.

## Enfoque recomendado

## 1. Crear una capa de formulario especifica para publicaciones

Agregar un modulo nuevo, por ejemplo:

- [`utils/productForm.ts`](/Users/121455/Marc/dev/tecladistas/utils/productForm.ts)

Ese modulo deberia concentrar:

- el shape editable del formulario;
- el estado vacio inicial;
- la conversion desde `ProductProps` a estado editable;
- normalizadores;
- validadores;
- comparacion de cambios.

Objetivo:

- sacar logica de negocio de la pagina;
- evitar validaciones dispersas;
- tener una sola definicion de “estado inicial” y “estado actual”.

## 2. Dejar de usar `EditableInput` en esta pantalla y en todo el proyecto. Eliminarlo luedo de reemplazarlo.

No conviene seguir dependiendo de un input que alterna entre `button` e `input`.

- convertir [`components/EditableInput.tsx`](/Users/121455/Marc/dev/tecladistas/components/EditableInput.tsx) en un input controlado real;

Para advertencia de salida, normalizacion y errores por campo, un formulario totalmente controlado es mucho mas confiable.

## 3. Modelar el formulario como estado controlado

La pagina deberia consolidar todo en una sola estructura de estado, por ejemplo:

- `title`
- `description`
- `year`
- `price`
- `location`
- `exchanges`
- `listingType`
- `disclaimerAccepted`
- `image`

En editar:

- el estado inicial sale de la API;
- `listingType` viene del producto;
- la imagen puede seguir siendo un estado aparte si no se edita en esta version.

En crear:

- el estado inicial arranca vacio;
- `listingType` sale del hash o del default actual;
- imagen y disclaimer deben participar del dirty-state.

## 4. Definir reglas de normalizacion claras

La validacion no deberia limitarse a “required”.

Propuesta de normalizacion:

- `title`:
  - trim de extremos;
  - colapso de espacios internos;
  - capitalizacion en estilo titulo o sentence case definida en una sola funcion;
- `location`:
  - trim;
  - colapso de espacios;
  - respeto del limite de `20` caracteres luego de normalizar;
- `price`:
  - solo digitos;
  - sin separadores ni texto;
  - conversion segura a string numerico para el submit;
- `year`:
  - solo digitos;
  - vacio permitido;
  - validacion de longitud razonable;
- `description`:
  - trim;
  - preservacion de saltos de linea utiles;
  - sin dobles espacios innecesarios.

Estas reglas deberian vivir en helpers reutilizables, no embebidas ad hoc dentro de cada `onChange`.

## 5. Definir validacion por variante

Reglas sugeridas:

- comunes:
  - `title` requerido;
  - `price` requerido;
  - `location` requerido;
  - `disclaimerAccepted` requerido;
- solo en creacion:
  - `image` requerida;
- solo en venta:
  - `exchanges` visible y editable;
- solo en alquiler:
  - `exchanges` debe limpiarse a `false` al cambiar de variante.

Tambien conviene que la validacion final antes del submit sea una sola funcion, por ejemplo:

- `validateProductForm(state, mode)`

que devuelva:

- errores por campo;
- y, si hace falta, un error general para el toast.

## 6. Implementar deteccion de cambios sin guardar

La pagina necesita un `isDirty` confiable.

Ese valor deberia calcularse comparando:

- un snapshot inicial normalizado;
- el estado actual normalizado.

`isDirty` deberia contemplar:

- texto de todos los campos;
- `listingType`;
- `exchanges`;
- `disclaimerAccepted`;
- imagen seleccionada en crear;
- cambios cargados desde API en editar.

No conviene comparar el estado crudo porque:

- espacios extra;
- campos ocultos por variante;
- y valores no normalizados

pueden dar falsos positivos o falsos negativos.

## 7. Agregar advertencia nativa del navegador

Para refresh, cierre de pestaña y unload real, la solucion correcta es `beforeunload`.

Comportamiento esperado:

- si `isDirty` es `true`, registrar listener;
- si `isDirty` es `false`, no registrarlo;
- el navegador mostrara su mensaje generico estandar.

Importante dejar explicito en la implementacion:

- no se puede personalizar el texto del alert nativo;
- el texto final depende del navegador.

## 8. Cubrir navegacion interna relevante

`beforeunload` no cubre todos los casos de navegacion SPA del App Router.

Por eso, para esta pantalla, conviene cubrir al menos:

- el nuevo boton `Cancelar`;
- cualquier accion de navegacion disparada desde la propia pagina.

No intentaria un route blocker global para toda la app en esta iteracion.

La estrategia recomendada es:

- usar alert nativo donde existe soporte real;
- usar `window.confirm` o confirmacion equivalente en acciones internas controladas por la pantalla.

## 9. Agregar boton `Cancelar`

En el bloque final de acciones de [`app/crear-publicacion/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx):

- mantener `Publicar` o `Guardar cambios`;
- agregar `Cancelar` al lado.

Comportamiento recomendado:

- si `isDirty` es `false`, navegar directo a [`/instrumentos`](/Users/121455/Marc/dev/tecladistas/app/instrumentos/page.tsx);
- si `isDirty` es `true`, pedir confirmacion;
- si confirma, descartar el estado local y navegar.

Mensaje sugerido:

- `Se van a perder los cambios no guardados.`

## 10. Corregir nombres semanticos del formulario

Dentro de esta misma pasada conviene ordenar los textos del formulario.

Minimo recomendado:

- reemplazar `placeholders.disclamer` por una clave correctamente escrita.

Mejor opcion:

- separar placeholders de textos de consentimiento, por ejemplo:
  - `placeholders.*`
  - `formText.disclaimerConsent`

No es un cambio de UI, sino una limpieza necesaria para que la logica de formulario no siga mezclando conceptos.

## Archivos a tocar

### Seguro

- [`app/crear-publicacion/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/crear-publicacion/page.tsx)
- [`utils/utils.tsx`](/Users/121455/Marc/dev/tecladistas/utils/utils.tsx)

### Muy probable

- [`components/EditableInput.tsx`](/Users/121455/Marc/dev/tecladistas/components/EditableInput.tsx)
- [`components/ui/Field.tsx`](/Users/121455/Marc/dev/tecladistas/components/ui/Field.tsx)
- [`types/index.ts`](/Users/121455/Marc/dev/tecladistas/types/index.ts)

### Nuevo archivo recomendado

- [`utils/productForm.ts`](/Users/121455/Marc/dev/tecladistas/utils/productForm.ts)

## Secuencia de implementacion

1. Crear helpers de normalizacion, validacion y comparacion en `utils/productForm.ts`.
2. Pasar `/crear-publicacion` a un estado de formulario controlado y explicito.
3. Integrar reglas comunes y reglas por variante (`sale` / `rent`).
4. Implementar `isDirty` contra snapshot inicial normalizado.
5. Agregar `beforeunload`.
6. Agregar `Cancelar` con confirmacion y navegacion a `/instrumentos`.
7. Ordenar copy/nombres de disclaimer y textos asociados.
8. Verificar crear, editar, cambio de variante y navegacion accidental.

## Riesgos

### 1. `EditableInput` hoy no acompaña bien este feature: se eliminará.

### 2. Crear y editar no comparten el mismo estado inicial

Si no se separa bien el flujo:

- crear puede marcar dirty demasiado pronto;
- editar puede considerar “cambio” algo que vino de backend.

### 3. `listingType` cambia reglas y campos visibles

Si no se limpia `exchanges` al pasar a alquiler, el formulario puede quedar con datos residuales invisibles.

### 4. La advertencia nativa no cubre todo

Es importante asumir desde el plan que:

- `beforeunload` resuelve bien unload real;
- navegacion cliente de Next necesita cobertura adicional en acciones locales.

## Criterios de aceptacion

- Si la persona cambia algo en `/crear-publicacion` y refresca o intenta cerrar la pestaña, aparece la advertencia nativa del navegador.
- Si la persona no hizo cambios, no aparece ninguna advertencia.
- Existe un boton `Cancelar` al lado de la accion principal.
- `Cancelar` pide confirmacion solo cuando hay cambios sin guardar.
- `Título`, `Precio` y `Ubicación` siguen siendo obligatorios y se validan tambien en la capa unificada del formulario.
- `Ubicación` sigue respetando el limite de `20` caracteres.
- Al cambiar entre `venta` y `alquiler`, el formulario conserva coherencia y no deja valores invalidos ocultos.
- Crear y editar quedan cubiertos por el mismo sistema de dirty-state y validacion.

## Verificacion manual sugerida

### Crear publicacion

- abrir `/crear-publicacion`;
- escribir en al menos un campo;
- intentar refrescar;
- intentar cerrar la pestaña;
- intentar cancelar;
- verificar que aparezcan las advertencias esperadas.

### Editar publicacion

- abrir `/crear-publicacion?id=...`;
- esperar carga inicial;
- cambiar un campo;
- intentar salir;
- guardar;
- verificar que luego de guardar no queden advertencias residuales.

### Cambio de variante

- pasar de `Venta` a `Alquiler`;
- verificar que `Canje` desaparezca y no quede valor basura;
- volver a `Venta`;
- confirmar que el formulario siga consistente.

### Validacion

- probar `price` con texto invalido;
- probar `year` con formato invalido;
- probar `location` en el limite de `20` caracteres;
- probar imagen con extension invalida y con exceso de tamaño.
