# 09 — Guía de Integración de Ramas 🔀

> **Proyecto:** AgroRuta Huánuco  
> **Área:** Workflow Git  
> **Rama:** feature/docs

---

## 1. Estructura de Ramas

```
main          ← Entrega final (solo merge desde dev, al final)
│
└── dev       ← Rama de integración y pruebas
    │
    ├── feature/frontend      ← UI, pantallas, componentes
    ├── feature/firebase      ← Auth, Firestore, servicios
    ├── feature/mapa-rutas    ← Leaflet, mapa, incidencias
    └── feature/docs          ← Documentación, README, pitch
```

### Reglas absolutas
- ✅ Trabajar siempre en tu rama `feature/`
- ✅ Hacer Pull Request hacia `dev`
- ✅ Verificar `npm run build` antes de cada PR
- ❌ Nunca hacer push directo a `main`
- ❌ Nunca hacer push directo a `dev`
- ❌ Nunca mergear a `main` sin que el equipo lo apruebe

---

## 2. Flujo de Trabajo Completo

### Paso 1 — Verificar que estás en tu rama
```bash
git branch
# Debe mostrar: * feature/tu-nombre
```

Si no estás en tu rama:
```bash
git checkout feature/tu-rama
```

---

### Paso 2 — Trabajar y hacer commits frecuentes
```bash
# Ver qué archivos modificaste
git status

# Agregar tus cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar formulario de publicar cosecha"
```

#### Formato de mensajes de commit recomendado
```
tipo: descripción breve en minúsculas

Tipos válidos:
  feat     → nueva funcionalidad
  fix      → corrección de bug
  docs     → solo cambios en documentación
  style    → cambios de formato o estilos
  refactor → refactorización sin cambiar funcionalidad
  chore    → configuración, dependencias
```

**Ejemplos:**
```bash
git commit -m "feat: crear dashboard del agricultor"
git commit -m "fix: corregir error de auth en login"
git commit -m "docs: agregar flujo del transportista"
git commit -m "style: ajustar colores mobile-first"
```

---

### Paso 3 — Actualizar tu rama con los cambios de dev
Antes de hacer tu Pull Request, sincroniza con `dev` para evitar conflictos:

```bash
# 1. Asegúrate de estar en tu rama feature
git checkout feature/tu-rama

# 2. Trae los últimos cambios de dev
git fetch origin dev

# 3. Rebase (recomendado) o merge
git rebase origin/dev
# o alternativamente:
# git merge origin/dev
```

Si hay conflictos durante el rebase:
```bash
# Ver los archivos con conflicto
git status

# Resolver los conflictos en tu editor de código
# Después de resolver:
git add archivo-con-conflicto
git rebase --continue
```

Si el conflicto es muy complejo:
```bash
# Cancelar el rebase y pedir ayuda al líder
git rebase --abort
```

---

### Paso 4 — Verificar que el build funciona
**Esto es obligatorio antes de hacer el PR:**

```bash
# Verificar tipos TypeScript
npm run type-check

# Build de producción (debe completar sin errores)
npm run build

# Probar el preview del build
npm run preview
```

Si el build falla, **no hagas el PR todavía**. Corrige primero.

---

### Paso 5 — Push de tu rama al repositorio remoto
```bash
git push origin feature/tu-rama

# Si es tu primer push en esa rama:
git push -u origin feature/tu-rama
```

---

### Paso 6 — Crear el Pull Request en GitHub

1. Ir al repositorio en GitHub: `github.com/jhuniro/clay-agro-ruta`
2. Aparecerá un banner "Compare & pull request" para tu rama
3. Hacer clic en ese banner
4. Configurar el PR:
   - **Base:** `dev` (destino)
   - **Compare:** `feature/tu-rama` (origen)
   - **Título:** descripción clara de qué estás integrando
   - **Descripción:** lista de cambios incluidos

**Ejemplo de PR:**
```
Título: feat: integrar dashboard del agricultor

Descripción:
- Pantalla Dashboard Agricultor con resumen de actividad
- Formulario PublicarCosecha con validación
- Estilos mobile-first aplicados
- Conectado a colección 'cosechas' de Firestore

Checklist:
[x] npm run build pasa sin errores
[x] npm run type-check sin errores
[x] Probado en móvil (responsive)
[x] No modifiqué archivos de otras ramas
```

---

### Paso 7 — Revisión del Pull Request

El **Líder / Docs** revisa el PR:
- Verifica que `npm run build` pase
- Revisa que no haya conflictos con otras ramas
- Comenta si hay algo a corregir
- Aprueba y mergea a `dev`

---

### Paso 8 — Merge a main (Solo al final, entrega)

Este paso lo hace SOLO el líder cuando toda la funcionalidad está integrada y probada en `dev`:

```bash
# Solo el líder ejecuta esto al momento de entrega final
git checkout main
git merge dev
git push origin main
```

---

## 3. Resolución de Conflictos Comunes

### Conflicto en `package.json`
```bash
# No cambiar las dependencias sin avisar al equipo
# Si dos personas agregan dependencias distintas:
# 1. Mantener AMBAS dependencias en el archivo
# 2. Ejecutar npm install
# 3. Verificar que npm run build funciona
```

### Conflicto en `src/App.tsx`
```bash
# Comunicar al líder
# No modificar el mismo archivo desde dos ramas sin coordinación
# Definir quién "dueño" de qué archivo al inicio del proyecto
```

### Conflicto en archivos de docs
```bash
# Los docs están en docs/ — solo los modifica feature/docs
# Las otras ramas no deberían tocar esa carpeta
```

---

## 4. Comandos de Emergencia

```bash
# Deshacer el último commit (sin perder cambios)
git reset --soft HEAD~1

# Deshacer cambios en un archivo (volver al estado del último commit)
git checkout -- nombre-del-archivo

# Ver historial de commits
git log --oneline -10

# Ver diferencias con la rama dev
git diff origin/dev

# Guardar cambios temporalmente sin commitear
git stash
git stash pop  # para recuperarlos
```

---

## 5. Checklist de Integración Final

Antes del merge `dev → main`:

```
□ Todas las ramas feature han sido mergeadas a dev
□ npm run build pasa sin errores en dev
□ npm run type-check sin errores
□ La app abre correctamente en npm run preview
□ Las 3 pantallas de rol funcionan
□ El mapa muestra incidencias
□ Firebase Auth permite login y registro
□ README.md está actualizado
□ Docs están completos
□ Pitch está listo y ensayado
□ Datos de prueba están cargados en Firestore
```

---

## 6. Referencia Rápida de Comandos

```bash
# Ver en qué rama estás
git branch

# Cambiar de rama
git checkout feature/tu-rama

# Ver cambios pendientes
git status

# Agregar todo y commitear
git add . && git commit -m "tipo: descripción"

# Subir tu rama
git push origin feature/tu-rama

# Actualizar con dev
git fetch origin dev && git rebase origin/dev

# Build de verificación
npm run build
```

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
