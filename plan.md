# Plan FE: integración del endpoint /api/photos/dashboard

## Contexto real del código

El fetching de fotos para el dashboard vive en `components/home/home-data.ts`, función `getHomePhotos` (líneas 202–231). Es un Server Component: llama directamente al backend con `fetch`, no usa axios ni cliente.

Flujo actual:
1. `getHomePhotos("2025")` llama a `GET ${apiBaseUrl}/photos/2025` (endpoint general).
2. Recibe **todas** las fotos del año.
3. Aplica `getScatteredPhotosForToday(photos)` para elegir 6 fotos rotando por día.
4. Devuelve `{ heroPhoto: photos[0], photos: [6 fotos rotadas] }`.

El tipo `HomePhoto` ya tiene `{ original, thumbnail, ... }` — coincide exactamente con el formato que devolverá el nuevo endpoint.

La caché ya está en `cache: "no-store"` — no hay nada que corregir ahí.

La página `/fotos/2025` (`app/fotos/2025/page.tsx`) usa `axios.get("/api/photos/2025")` desde el cliente y **no se toca** (está fuera de scope según el plan del BE).

---

## Cambios a realizar

### 1 — Reemplazar `getHomePhotos` en `components/home/home-data.ts`

**Qué cambia:** URL del fetch y lógica posterior.

```ts
// Antes
const response = await fetch(`${apiBaseUrl}/photos/${year}`, {
  cache: "no-store",
  headers: { ... },
});
const photos = (await response.json()) as HomePhoto[];
return {
  heroPhoto: photos[0],
  photos: getScatteredPhotosForToday(photos),
};

// Después
const response = await fetch(
  `${apiBaseUrl}/photos/dashboard?year=${year}&limit=${DASHBOARD_FEATURED_PHOTOS}`,
  {
    cache: "no-store",
    headers: { ... },
  },
);
const photos = (await response.json()) as HomePhoto[];
return {
  heroPhoto: photos[0],
  photos,
};
```

El BE ya devuelve exactamente `DASHBOARD_FEATURED_PHOTOS` (6) fotos seleccionadas; no hay que hacer slice ni rotación.

### 2 — Eliminar `getScatteredPhotosForToday`

La función queda dead code. Eliminarla junto con su llamada.

### 3 — (Opcional) Fallback para URLs expiradas en `HomeDashboard.tsx`

`DefensiveImage` maneja src vacío en render, pero no errores de red en runtime (URL expirada después de 1 hora). La forma de agregar esto sería convertir `PhotosPreview` en un Client Component con `onError` en un `<img>` nativo, o extender `DefensiveImage` para aceptar un `onError` prop.

**Decisión:** Defer. El caso es edge (usuario con la página abierta > 1 hora sin recargar). Si se implementa, la solución más limpia es agregar `onError` a `DefensiveImage` y pasarlo desde `PhotosPreview`.

---

## Archivos a modificar

| Archivo | Cambio |
|---|---|
| `components/home/home-data.ts` | Cambiar URL en `getHomePhotos`, eliminar `getScatteredPhotosForToday` y su uso |
| `components/DefensiveImage.tsx` | (Opcional) Agregar soporte para prop `onError` |
| `components/home/HomeDashboard.tsx` | (Opcional) Pasar `onError` a `DefensiveImage` en `PhotosPreview` |

---

## Lo que NO cambia

- `app/fotos/2025/page.tsx` — usa el endpoint general, fuera de scope.
- Configuración de caché — ya es `no-store`.
- Tipo `HomePhoto` — ya es compatible con el nuevo formato.
- Todo el resto del dashboard.
