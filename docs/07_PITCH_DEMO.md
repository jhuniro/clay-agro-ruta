# 07 — Pitch Demo 🎤

> **Proyecto:** AgroRuta Huánuco  
> **Evento:** Hackathon Clay 2026  
> **Tiempo:** 3 minutos máximo  
> **Área:** Agricultura y Medio Ambiente

---

## SCRIPT DE PITCH — 3 MINUTOS

---

### ⏱️ 00:00–00:20 — El Gancho (Problema)

> *"En Huánuco, cada año se pierden toneladas de alimentos.  
> No por falta de cosecha.  
> Sino porque un huaico, un derrumbe o un bloqueo corta la ruta  
> y el agricultor no puede sacar su producto a tiempo."*

**[Pausa breve]**

> *"El agricultor llama, nadie contesta. El comprador espera, nadie avisa.  
> El transportista parte, sin saber que la ruta está cortada."*

---

### ⏱️ 00:20–00:45 — Datos del Problema

> *"En la región Huánuco, más del 30% de la producción agrícola  
> se ve afectada anualmente por eventos climáticos e interrupciones viales.*  
>
> *Los productores de papa, maíz, café y frutas  
> pierden hasta el 40% de sus ingresos en temporadas de lluvias  
> por no poder coordinar a tiempo el traslado de su cosecha."*

---

### ⏱️ 00:45–01:30 — La Solución: AgroRuta Huánuco

> *"Por eso creamos **AgroRuta Huánuco**:  
> una aplicación web progresiva — disponible desde cualquier celular —  
> que conecta a los tres actores clave de la cadena agrícola."*

**[Mostrar pantalla inicial de la app]**

> *"El **agricultor** publica su cosecha y solicita transporte.*  
>
> *El **comprador** encuentra productos disponibles y coordina entregas.*  
>
> *El **transportista** acepta fletes y — esto es clave —  
> reporta incidencias en ruta en tiempo real.*  
> Un huaico reportado aparece en el mapa en segundos.  
> Todos ven la alerta. Todos pueden reaccionar."*

---

### ⏱️ 01:30–02:00 — Demostración (Demo en Vivo)

**[Navegar por la app mientras se habla]**

> *"Aquí vemos la pantalla de inicio. El usuario elige su rol.*
>
> *[clic en Agricultor]*  
> El agricultor entra a su dashboard, publica su cosecha de papa:  
> cantidad, precio, ubicación. Listo, ya está visible para compradores.*
>
> *[clic en Transportista]*  
> El transportista ve la solicitud de flete, la acepta.  
> El agricultor recibe la confirmación.*
>
> *Pero si el transportista encuentra un bloqueo en ruta...*  
> *[abrir mapa]*  
> Lo reporta aquí. El mapa se actualiza para todos.  
> Ruti, nuestro asistente, alerta a los demás usuarios y sugiere rutas alternativas."*

---

### ⏱️ 02:00–02:30 — Tecnología

> *"AgroRuta está construida con:*
> - ***React + TypeScript + Vite** para una interfaz rápida y moderna*
> - ***PWA** para que funcione sin conexión y se instale en cualquier celular*
> - ***Firebase** para autenticación y base de datos en tiempo real*
> - ***Leaflet + OpenStreetMap** para el mapa interactivo de rutas*
>
> *Y el diseño es **mobile-first** — pensado para el campo,  
> para pantallas pequeñas y conexiones lentas."*

---

### ⏱️ 02:30–02:50 — Impacto

> *"¿Qué logramos con AgroRuta?*
>
> *Reducimos pérdidas de cosecha por falta de coordinación.*  
> *Conectamos productores con compradores directamente, sin intermediarios.*  
> *Damos información de rutas en tiempo real a quienes más la necesitan.*  
> *Y lo hacemos desde un celular, sin necesidad de internet constante."*

---

### ⏱️ 02:50–03:00 — Cierre

> *"AgroRuta Huánuco:  
> porque ninguna cosecha debería perderse por falta de información.*
>
> *Gracias."*

---

## NOTAS PARA LA DEMO

### Preparar antes de subir al escenario
- [ ] App corriendo en `npm run dev` o en preview de producción
- [ ] Celular con la PWA instalada para mostrar modo móvil
- [ ] Datos de prueba cargados en Firestore (cosechas, incidencias)
- [ ] Conexión a internet estable o versión offline probada
- [ ] Pantalla del mapa con al menos 1 incidencia visible

### Orden de pantallas en la demo
1. Pantalla inicial → selección de rol
2. Dashboard Agricultor → publicar cosecha (formulario lleno)
3. Dashboard Transportista → ver flete → aceptar
4. Mapa → ver incidencia reportada
5. Asistente Ruti → abrir y mostrar mensaje de alerta

### Preguntas frecuentes del jurado
| Pregunta | Respuesta preparada |
|---|---|
| ¿Funciona sin internet? | "Sí, es una PWA. El usuario puede ver datos cacheados y reportar incidencias que se sincronizan cuando hay conexión." |
| ¿Por qué no usaron una app nativa? | "Una PWA se instala desde el navegador, sin App Store. Más accesible para el agricultor promedio." |
| ¿Tienen usuarios reales? | "Es un MVP de hackathon, pero el flujo está validado con el conocimiento del contexto de Huánuco." |
| ¿Cómo monetizan? | "En esta etapa, la app es gratuita. El modelo de negocio futuro puede ser comisión por flete o suscripción para compradores mayoristas." |
| ¿Qué pasa si no hay signal? | "Modo offline: el usuario puede consultar datos del caché y la app sincroniza cuando recupera conexión." |

---

## DATOS CLAVE PARA RECORDAR

| Dato | Valor |
|---|---|
| Nombre del proyecto | AgroRuta Huánuco |
| Área del hackathon | Agricultura y Medio Ambiente |
| Roles | Agricultor, Comprador, Transportista |
| Mascota / Asistente | Ruti 🌿 |
| Stack principal | React + TS + Vite + PWA + Firebase + Leaflet |
| Tiempo de pitch | 3 minutos |

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
