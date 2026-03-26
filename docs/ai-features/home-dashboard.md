# Plan de implementacion: rediseno de home a dashboard

## Objetivo del feature

Convertir la home en un dashboard que funcione como:

- resumen rapido de la comunidad;
- galeria liviana de contenido visual;
- extracto navegable de las secciones principales de la web;
- punto de entrada mas util tanto para personas nuevas como para usuarias ya logueadas.

La idea no es reemplazar las paginas detalle, sino usarlas como destino natural desde una home mas informativa y accionable.

## Estado actual del proyecto

### 1. La home actual es una landing de texto largo

Hoy [`app/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/page.tsx) renderiza una pagina simple de "Sobre nosotrxs" con:

- texto introductorio;
- CTA de registro / login solo para visitantes;
- una imagen estatica;
- una cita larga sobre la comunidad;
- disclaimer legal;
- link a Cafecito.

Sirve como presentacion, pero no resume la actividad real del sitio ni ayuda a descubrir contenido.

### 2. La app ya tiene verticales claras para alimentar un dashboard

El header en [`components/Header.tsx`](/Users/121455/Marc/dev/tecladistas/components/Header.tsx) ya deja claro el mapa principal del producto:

- instrumentos;
- profesionales;
- estudios;
- fotos;
- partituras.

Eso da una base muy clara para construir una home tipo hub sin inventar una arquitectura nueva.

### 3. Ya existen fetchers server-side para casi todo el contenido clave

En [`utils/axios.tsx`](/Users/121455/Marc/dev/tecladistas/utils/axios.tsx) ya estan disponibles:

- `getProducts()`
- `getProfessionals()`
- `getStudios()`
- `getAllSheetMusic()`
- `getWhitelistedUsersCount()`

Conclusion practica:

- la primera version del dashboard puede salir sin crear endpoints nuevos;
- varias metricas pueden derivarse localmente a partir de arrays ya existentes.

### 4. Fotos ya tiene una fuente real, pero la UI actual es pesada para embebido

La seccion de fotos 2025 en [`app/fotos/2025/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/fotos/2025/page.tsx) usa `react-image-gallery` y consume [`app/api/photos/[year]/route.ts`](/Users/121455/Marc/dev/tecladistas/app/api/photos/[year]/route.ts).

Eso sirve para la pagina dedicada, pero no conviene reutilizar la galeria completa dentro de la home. Para el dashboard conviene una tira visual mas liviana y mas rapida.

### 5. Ya hay componentes reutilizables para previews

Ya existen:

- [`components/Cards/ProductCard.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/ProductCard.tsx)
- [`components/Cards/StudioCard.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/StudioCard.tsx)
- [`components/Cards/ProfessionalCard.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/ProfessionalCard.tsx)
- [`components/DefensiveImage.tsx`](/Users/121455/Marc/dev/tecladistas/components/DefensiveImage.tsx)

Esto permite llegar rapido a una primera version reutilizando piezas reales en lugar de disenar todo desde cero.

### 6. No todos los modelos tienen la misma calidad de metadata para "destacados"

En [`types/index.ts`](/Users/121455/Marc/dev/tecladistas/types/index.ts):

- productos si tienen `createdAt`;
- profesionales tienen `ratings`, pero no `createdAt`;
- estudios no muestran `createdAt` ni una senal clara de ranking;
- partituras tienen `downloadCount`.

Consecuencia:

- instrumentos puede mostrar "recientes";
- profesionales conviene ordenarlos por rating y cobertura de rubros;
- estudios conviene mostrarlos como galeria curada en una primera version;
- partituras conviene ordenarlas por descargas.

## Objetivo de UX para la nueva home

La nueva home deberia responder rapido estas preguntas:

1. Que ofrece esta web.
2. Cuanto contenido hay hoy.
3. Que vale la pena mirar ahora.
4. Como entro a la seccion correcta en uno o dos clicks.
5. Que accion principal me conviene hacer segun este logueadx o no.

En terminos de tono, deberia dejar de sentirse como una pagina estatica y pasar a sentirse como el panel principal del proyecto.

## Alcance recomendado para la primera version

### Si entra en V1

- nuevo layout de home tipo dashboard;
- resumen numerico;
- accesos rapidos a las 5 verticales;
- preview de instrumentos;
- preview de profesionales;
- preview de estudios;
- preview de partituras;
- preview liviano de fotos;
- version compacta del texto institucional y del disclaimer;
- diferencias de CTA segun sesion iniciada o no.

### Mejor dejar fuera de V1

- personalizacion profunda por usuario;
- recomendaciones basadas en historial;
- analytics internos;
- carruseles complejos;
- endpoints agregados nuevos solo para la home.

## Propuesta de arquitectura de contenido

### 1. Hero-resumen superior

Primer bloque de la pagina.

Contenido:

- titulo corto que explique el valor del sitio;
- subtitulo mucho mas breve que el texto actual;
- dos CTAs principales;
- una mini banda de highlights o chips con links rapidos.

Comportamiento sugerido:

- visitante: `Registrarse` y `Entrar`;
- logueadx: `Ver instrumentos` y `Crear publicacion`.

Este bloque debe reemplazar los parrafos largos del home actual, no sumarse arriba de ellos.

### 2. Franja de metricas

Segundo bloque: tarjetas chicas de resumen.

Metricas recomendadas para V1:

- integrantes del grupo (`getWhitelistedUsersCount`);
- publicaciones activas de instrumentos;
- profesionales publicados;
- estudios activos;
- partituras disponibles.

Regla importante:

- donde no haya endpoint de conteo, derivar desde los arrays ya traidos;
- filtrar por `status === "active"` cuando aplique.

### 3. Mapa rapido de la web

Bloque de navegacion visual con 5 accesos:

- Instrumentos
- Profesionales
- Estudios
- Fotos
- Partituras

Cada tile deberia incluir:

- nombre;
- una linea de descripcion;
- contador o dato corto;
- CTA "Ver todo".

Este bloque cumple el pedido de "extracto de la web completa" sin depender solo del scroll.

### 4. Seccion "Instrumentos recientes"

Primer preview fuerte del dashboard.

Contenido recomendado:

- tabs o switch chico entre `venta` y `alquiler`, o una seleccion fija para V1;
- 4 items maximo;
- orden por `createdAt` descendente;
- link claro a [`/instrumentos`](/Users/121455/Marc/dev/tecladistas/app/instrumentos/page.tsx).

Implementacion pragmatica:

- reutilizar [`components/Cards/ProductCard.tsx`](/Users/121455/Marc/dev/tecladistas/components/Cards/ProductCard.tsx);
- si queda demasiado alto para home, crear una variante mas compacta en una segunda pasada.

### 5. Seccion "Profesionales destacados"

Objetivo:

- mostrar que la web no es solo marketplace;
- hacer visible la diversidad de rubros.

Propuesta V1:

- una fila o nube de rubros frecuentes basada en `skills`;
- 4 profesionales destacados ordenados por rating promedio;
- fallback razonable si no hay ratings: primeros profesionales del array.

Referencia:

- la logica base de skills ya existe en [`app/profesionales/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/profesionales/page.tsx) y en [`utils/utils.tsx`](/Users/121455/Marc/dev/tecladistas/utils/utils.tsx).

### 6. Seccion "Estudios en foco"

Objetivo:

- aportar galeria visual con contenido real del sitio;
- mostrar otra vertical distinta de instrumentos.

Propuesta V1:

- 3 cards maximo;
- usar imagen principal, nombre y ubicacion;
- CTA a [`/estudios`](/Users/121455/Marc/dev/tecladistas/app/estudios/page.tsx).

Como hoy no hay `createdAt` claro para estudios, conviene una seleccion estable y simple en vez de fingir "ultimos".

### 7. Seccion "Partituras mas descargadas"

Objetivo:

- exponer una vertical que hoy esta medio escondida;
- mostrar que la web tambien tiene recursos descargables.

Propuesta V1:

- tabla resumida o lista compacta de 5 items;
- nombre, genero/dificultad si suma, y descargas;
- CTA a [`/partituras`](/Users/121455/Marc/dev/tecladistas/app/partituras/page.tsx).

No hace falta embutir el `DataGrid` completo de [`app/partituras/SheetMusicGrid.tsx`](/Users/121455/Marc/dev/tecladistas/app/partituras/SheetMusicGrid.tsx) dentro de la home. Para el dashboard conviene una variante mucho mas liviana.

### 8. Tira de fotos 2025

Objetivo:

- sumar una galeria reconocible;
- mostrar vida comunitaria, no solo fichas y listados.

Propuesta V1:

- 6 thumbnails maximo;
- carga liviana;
- click hacia [`/fotos/2025`](/Users/121455/Marc/dev/tecladistas/app/fotos/2025/page.tsx);
- link secundario al Instagram de la fotografa si corresponde.

Implementacion recomendada:

- componente cliente chico, propio de home;
- no reutilizar `react-image-gallery` dentro de la portada.

### 9. Bloque institucional compactado

El texto actual del home no deberia desaparecer, pero si condensarse.

Propuesta:

- un bloque final corto con 2 o 3 parrafos maximo;
- mantener la idea de comunidad y el disclaimer;
- conservar el link a Cafecito sin que ocupe el centro de la pagina.

## Estrategia tecnica recomendada

### 1. Mantener [`app/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/page.tsx) como server component

Tiene sentido que la home siga siendo async server-side porque:

- ya consume sesion y datos de backend;
- evita duplicar fetchs en cliente;
- permite render inicial mas completo.

### 2. Armar un agregador de datos para home

Opciones razonables:

- resolver todo dentro de [`app/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/page.tsx);
- o crear un helper como `components/home/home-data.ts` o `app/home-data.ts`.

Recomendacion:

- sacar la logica de armado a un helper dedicado para que `app/page.tsx` quede mas declarativo.

### 3. Usar `Promise.allSettled` o helpers aislados

No conviene que un fallo en una vertical haga caer toda la portada.

En vez de un `Promise.all` rigido, usar:

- `Promise.allSettled`, o
- helpers con `try/catch` por bloque.

Objetivo:

- si falla fotos o partituras, el resto de la home igual renderiza;
- cada seccion puede degradar a estado vacio o CTA simple.

### 4. Derivar metricas sin endpoints nuevos en V1

Reglas sugeridas:

- productos: contar solo `status === "active"`;
- venta y alquiler: contar por `listingType`;
- estudios: contar `status === "active"`;
- profesionales: contar longitud total;
- partituras: contar longitud total;
- integrantes: usar `getWhitelistedUsersCount()`.

### 5. Separar SSR de previews cliente donde haga falta

La tira de fotos es el caso mas claro.

Plan sugerido:

- la home SSR renderiza todo lo demas;
- fotos va en un componente cliente aislado;
- si fotos falla, no bloquea el primer render ni rompe la home completa.

## Propuesta de componentes

### Nuevos archivos sugeridos

- [`components/home/HomeDashboard.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeDashboard.tsx)
- [`components/home/HomeHero.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeHero.tsx)
- [`components/home/HomeStats.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeStats.tsx)
- [`components/home/HomeSection.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeSection.tsx)
- [`components/home/HomeQuickLinks.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeQuickLinks.tsx)
- [`components/home/HomeProductsPreview.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeProductsPreview.tsx)
- [`components/home/HomeProfessionalsPreview.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeProfessionalsPreview.tsx)
- [`components/home/HomeStudiosPreview.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeStudiosPreview.tsx)
- [`components/home/HomeSheetMusicPreview.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomeSheetMusicPreview.tsx)
- [`components/home/HomePhotosStrip.tsx`](/Users/121455/Marc/dev/tecladistas/components/home/HomePhotosStrip.tsx)
- opcional: [`components/home/home-data.ts`](/Users/121455/Marc/dev/tecladistas/components/home/home-data.ts)

### Archivos existentes a tocar

- [`app/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/page.tsx)
- [`app/globals.css`](/Users/121455/Marc/dev/tecladistas/app/globals.css)
- opcional: [`components/index.ts`](/Users/121455/Marc/dev/tecladistas/components/index.ts)

## Direccion visual sugerida

La home nueva deberia:

- mantener el fondo/textura general del sitio;
- reducir el bloque de texto inicial;
- usar una composicion mucho mas modular;
- alternar bloques de metricas, previews y visuales;
- verse bien apilada en mobile y respirada en desktop.

Puntos concretos:

- evitar un look de landing generica;
- usar densidad informativa moderada;
- mantener accesibilidad y legibilidad en `light` y `dark`;
- evitar sliders innecesarios en V1.

## Secuencia de implementacion sugerida

1. Relevar y definir la data exacta que consumira la home.
2. Crear helper de transformacion para conteos, slices y ordenes.
3. Reemplazar el contenido actual de [`app/page.tsx`](/Users/121455/Marc/dev/tecladistas/app/page.tsx) por un shell de dashboard.
4. Implementar hero y franja de metricas.
5. Implementar quick links a las 5 verticales.
6. Agregar preview de instrumentos.
7. Agregar preview de profesionales.
8. Agregar preview de estudios.
9. Agregar preview de partituras.
10. Agregar tira de fotos 2025.
11. Reinsertar texto institucional y disclaimer en version compacta.
12. Hacer pasada de responsive y theme review.
13. Validar estados vacios y fallbacks por seccion.

## Riesgos y decisiones a tomar

### 1. Fan-out de fetchs en home

La home puede terminar haciendo varias llamadas server-side al mismo tiempo.

Mitigacion:

- limitar slices;
- no pedir datos que no se muestren;
- manejar errores por seccion.

### 2. Demasiado contenido arriba del fold

Si intentamos mostrar todo con mucho detalle, la home se vuelve otra pagina larga.

Mitigacion:

- cada preview debe ser corto;
- el objetivo es invitar a entrar, no reemplazar la pagina destino.

### 3. Falta de criterio fuerte para estudios

Sin fecha ni ranking, "destacado" puede quedar arbitrario.

Mitigacion:

- en V1 presentarlo como "en foco" o "galeria" en lugar de "recientes";
- si luego hace falta, agregar metadata en backend.

### 4. Fotos puede sumar peso innecesario

Mitigacion:

- usar thumbnails simples;
- no cargar la galeria completa de la pagina dedicada.

## Criterios de aceptacion

- La home deja de ser una pagina solo institucional y pasa a resumir el producto.
- Se ven reflejadas las verticales principales de la web.
- Hay al menos un bloque de resumen, uno de galeria y varios de extracto navegable.
- Las personas no logueadas ven CTAs claros para registrarse o entrar.
- Las personas logueadas ven atajos utiles para operar dentro de la app.
- Cada preview tiene salida clara a su pagina completa.
- La home funciona bien en mobile y desktop.
- Si una fuente de datos falla, la home no colapsa entera.

## Validacion manual recomendada

1. Probar home logueadx y deslogueadx.
2. Probar `light`, `dark` y `system`.
3. Probar mobile, tablet y desktop.
4. Verificar que todos los CTAs lleven a rutas correctas.
5. Confirmar que previews no rompan layout cuando falten imagenes o datos.
6. Confirmar que el rendimiento inicial siga siendo razonable.

## Preguntas abiertas para revisar antes de ejecutar

1. Queres una home mas orientada a descubrimiento general o mas orientada a personas ya logueadas?
   - Quiero que según si están logueadas o no, muestre la mejor vista posible para ambos estados del usuario.
2. La tira de fotos deberia ser siempre 2025 o preferis que apunte al ultimo anio disponible?
   - Siempre al ultimo anio disponible
3. Queres que el bloque institucional siga visible arriba de todo en formato resumido o mejor moverlo casi al final?
   - Lo que te parezca mejor
