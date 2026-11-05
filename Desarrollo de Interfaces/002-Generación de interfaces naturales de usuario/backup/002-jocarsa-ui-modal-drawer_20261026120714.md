# Reporte de proyecto

## Estructura del proyecto

```
/var/www/html/@CEAC/2DAM/Desarrollo de Interfaces/002-Generación de interfaces naturales de usuario/002-Interfaces naturales/002-jocarsa-ui-modal-drawer
├── css
│   ├── estilo.css
│   └── estilo_old.css
├── data
│   └── gamificacion.json
├── index.html
└── js
    ├── gamificacion.js
    └── ia-bot.js
```

## Código (intercalado)

# 002-jocarsa-ui-modal-drawer
**index.html**
```html
<!DOCTYPE html>
<html lang="es">
 <head>
  <meta charset="utf-8"/>
  <meta content="width=device-width,initial-scale=1" name="viewport"/>
  <title>
   bryanfghg | interfaz integrada
  </title>
  <link href="https://static.jocarsa.com/logos/white.svg" rel="shortcut icon" type="image/svg+xml"/>
  <link href="css/estilo_old.css" rel="stylesheet"/>
 </head>
 <body class="jocarsa-iu">
  <header>
   <div class="corporativo">
    <img alt="" src="https://static.jocarsa.com/logos/white.svg"/>
    <h1>
     bryanfghg | interfaz integrada
    </h1>
   </div>
   <div id="herramientas">
    <input id="buscador" placeholder="Buscar en clientes…" type="search"/>
    <button id="nuevo">
     + Nuevo
    </button>
   </div>
   <div id="usuario">
    <div class="imagen">
    </div>
    <div>
     <p>
      Bryan Glot Fong
     </p>
     <a href="login.html">
      Cerrar sesión
     </a>
    </div>
   </div>
  </header>
  <main>
   <nav id="navegacion">
    <div class="contenido-columna">
    </div>
    <button class="minimizar" title="Minimizar">
     ◀
    </button>
   </nav>
   <div class="separador" data-left="navegacion">
   </div>
   <section id="entidades">
    <div class="contenido-columna">
    </div>
    <button class="minimizar" title="Minimizar">
     ◀
    </button>
   </section>
   <div class="separador" data-left="entidades">
   </div>
   <div class="escenario" id="escenario">
   </div>
  </main>
  <template id="tpl-nav">
   <a href="#">
    <span class="ficha">
    </span>
    <span class="etiqueta">
    </span>
   </a>
  </template>
  <template id="tpl-card">
   <article draggable="true">
    <span class="ficha">
    </span>
    <span class="etiqueta">
    </span>
   </article>
  </template>
  <template id="tpl-fila">
   <tr>
   </tr>
  </template>
  <!-- Componentes flotantes globales -->
  <div class="ju-drawer-overlay" id="juDrawerOverlay" aria-hidden="true"></div>
  <aside class="ju-drawer" id="juDrawer" aria-hidden="true" aria-label="Editor lateral">
   <div class="ju-drawer-resizer" id="juDrawerResizer" title="Arrastra para redimensionar"></div>
   <header class="ju-drawer-header">
    <div>
     <small id="juDrawerMode">CREAR</small>
     <h2 id="juDrawerTitle">Nuevo registro</h2>
    </div>
    <button class="ju-drawer-close" id="juDrawerClose" type="button" aria-label="Cerrar">×</button>
   </header>
   <div class="ju-drawer-body" id="juDrawerBody"></div>
  </aside>

  <div class="ju-modal-layer" id="juModal" aria-hidden="true">
   <div class="ju-modal-backdrop" data-modal-close></div>
   <section class="ju-modal-window" role="dialog" aria-modal="true" aria-labelledby="juModalTitle">
    <header class="ju-modal-header">
     <h2 id="juModalTitle">Ventana modal</h2>
     <button class="ju-modal-close" type="button" data-modal-close aria-label="Cerrar">×</button>
    </header>
    <div class="ju-modal-body" id="juModalBody"></div>
   </section>
  </div>


<!-- ===== V8 · Gamificación + Bot IA ===== -->
<section class="ju-hud" id="juHud" aria-label="Panel de personaje"></section>

<button class="ju-ia-fab" id="juIaFab" type="button" aria-label="Abrir asistente IA">
  <span class="ju-ia-fab-icon">✦</span>
  <span class="ju-ia-fab-label">IA</span>
</button>

<aside class="ju-ia-panel" id="juIaPanel" aria-hidden="true">
  <header class="ju-ia-panel-header">
    <h2>Asistente jocarsa</h2>
    <button class="ju-ia-cerrar" id="juIaCerrar" type="button" aria-label="Cerrar">×</button>
  </header>
  <div class="ju-ia-mensajes" id="juIaMensajes" aria-live="polite"></div>
  <form class="ju-ia-form" id="juIaForm">
    <input id="juIaInput" type="text" placeholder="Pregúntame algo…" autocomplete="off" required>
    <button class="ju-btn" type="submit">Enviar</button>
  </form>
  <footer class="ju-ia-panel-footer">
    <span id="juIaEstado">Modo simulado · pronto conectado a Ollama local</span>
  </footer>
</aside>
<!-- ===== /V8 ===== -->

<!-- ===== V9 bryanfghg.iu ===== -->
  <script src="js/ia-bot.js"></script>
  <script src="js/gamificacion.js"></script>  
  <script src="js/componentes.js">
  </script>
 </body>
</html>


```
## css
**estilo.css**
```css
:root {
  /* ===== Núcleo de color: Peach Mint ===== */
  --tono: 12;                 /* antes 200 (azul) → ahora coral suave */
  --saturacion: 85%;
  --brillo: 75%;
  --escalon: 8%;

  /* ===== Acentos mint (nuevos) ===== */
  --mint: #7CC9B7;
  --mint-soft: #C8F3E4;
  --peach: #FFA98E;
  --peach-soft: #FAD0C2;
  --tinta: #8A7D7A;

  /* ===== Tokens derivados ===== */
  --relleno: 12px;
  --texto: 13px;
  --chaflan: 10px;
  --radio: 14px;              /* NUEVO: bordes redondeados */
  --sombra-peach: 0 14px 34px rgba(255,169,142,.22);
  --sombra-mint: 0 14px 34px rgba(124,201,183,.22);

  --color0: #fbe6df;          /* peach más claro (fondo hover) */
  --color:  #f7b8a3;          /* peach medio (cabeceras) */
  --color2: #d6ece5;          /* mint claro (columnas) */
  --color3: #f7f1ee;          /* crema general (fondo) */
  --color4: #7CC9B7;          /* mint intenso (acento activo) */

  --texto-nav: #2e2a29;
  --ancho-nav: 210px;
  --ancho-section: 260px;
}
* {
  box-sizing:border-box
}
html,body {
  width:100%;
  height:100%;
  margin:0
}
.jocarsa-iu {
  font-family:Ubuntu,Arial,sans-serif;
  font-size:var(--texto);
  display:flex;
  flex-direction:column;
  overflow:hidden;
  background:var(--color3)
}
header {
  height:54px;
  flex:none;
  background:var(--color);
  display:flex;
  align-items:center;
  gap:12px;
  padding:12px;
  color:var(--texto-nav)
}
.corporativo {
  display:flex;
  align-items:center;
  gap:10px;
  flex:1
}
.corporativo img {
  width:28px;
  height:28px
}
.corporativo h1 {
  font-size:20px;
  font-weight:bold;
  margin:0
}
header input,header button {
  border:0;
  padding:8px 10px;
  background:var(--color2);
  color:inherit;
  outline:none
}
header input {
  min-width:260px;
  background:var(--color0)
}
main {
  display:flex;
  flex:1;
  min-height:0
}
nav,section {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:10px;
  padding:12px;
  background:var(--color);
  color:white;
  overflow:hidden;
  flex:none;
  transition:width .25s
}
nav {
  width:var(--ancho-nav)
}
section {
  width:var(--ancho-section);
  background:var(--color2);
  color:#111;
  padding-left:3px;
}
.titulo-columna {
  font-weight:bold;
  opacity:.75
}
.contenido-columna {
  display:flex;
  flex-direction:column;
  gap:10px;
  overflow:auto;
  min-height:0
}
.contenido-columna a,.contenido-columna article {
  display:flex;
  align-items:center;
  gap:9px;
  padding:9px;
  background:var(--color2);
  color:inherit;
  text-decoration:none;
  cursor:pointer;
  clip-path:polygon(0 0,calc(100% - var(--chaflan)) 0,100% var(--chaflan),100% 100%,0 100%);
  transition:.2s
}
.contenido-columna article {
  background:var(--color3)
}
.contenido-columna .activo {
  transform:translateX(8px);
}
.ficha {
  width:28px;
  height:28px;
  display:grid;
  place-items:center;
  border-radius:50%;
  color:white;
  font-weight:bold;
  flex:none
}
.minimizar {
  position:absolute;
  right:5px;
  bottom:5px;
  border:0;
  width:28px;
  height:28px;
  cursor:pointer
}
.compacto {
  width:58px!important
}
.compacto .titulo-columna,.compacto .etiqueta {
  display:none
}
.compacto .contenido-columna {
  overflow:hidden
}
.separador {
  width:5px;
  cursor:col-resize;
  background:var(--color0);
  flex:none
}
.escenario {
  flex:1;
  min-width:0;
  padding:14px;
  overflow:auto;
  background:var(--color3);
  padding-left: 5px;position:relative;z-index:1000;
}
table {
  width:100%;
  border-collapse:collapse;
  background:white
}
caption {
  text-align:left;
  padding:12px;
  background:var(--color2);
  font-weight:bold
}
th,td {
  padding:10px;
  border-bottom:1px solid #ddd;
  text-align:left
}
thead {
  background:var(--color)
}
tbody tr:hover {
  background:#f1f1f1
}
.panel {
  background:white;
  padding:16px;
  max-width:1000px
}
.campos {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:12px
}
.campo {
  display:flex;
  flex-direction:column;
  gap:5px
}
.campo input,.campo textarea,.campo select {
  padding:9px;
  border:1px solid #bbb
}
.campo textarea {
  min-height:90px
}
.acciones {
  display:flex;
  gap:8px;
  margin-top:14px
}
.acciones button {
  padding:9px 14px;
  border:0;
  background:var(--color);
  color:white
}
.drag-over {
  outline:3px dashed var(--color0)
}
.estado {
  margin:0 0 10px;
  padding:8px;
  background:rgba(255,255,255,.55)
}
/* =========================================================
   REGLAS 010: SEPARADORES + MENUS CONTRAIDOS
   ========================================================= */
nav,section {
  transition:width .3s ease,flex-basis .3s ease,padding .3s ease
}
.separador {
  flex:0 0 7px;
  width:7px;
  min-width:7px;
  padding:0;
  cursor:col-resize;
  position:relative;
  z-index:4;
  transition:background .3s ease
}
nav + .separador {
  background:var(--color2)
}
section + .separador {
  background:var(--color3)
}
.separador:hover {
  background:var(--color4)
}
body.redimensionando {
  cursor:col-resize;
  user-select:none
}
body.redimensionando * {
  cursor:col-resize!important
}
.minimizar {
  position:absolute;
  bottom:var(--relleno);
  left:var(--relleno);
  right:var(--relleno);
  width:auto;
  height:28px;
  border:0;
  background:var(--color2);
  color:inherit;
  cursor:pointer;
  font:inherit;
  z-index:20;
  transition:left .3s,right .3s,width .3s,background .3s
}
section .minimizar {
  background:var(--color3)
}
.minimizar:hover {
  background:var(--color4)
}
nav.compacto,section.compacto {
  flex-basis:52px!important;
  width:52px!important;
  padding-left:6px;
  padding-right:6px;
  align-items:center
}
nav.compacto .contenido-columna,section.compacto .contenido-columna {
  width:40px;
  overflow:hidden;
  align-items:center
}
nav.compacto .contenido-columna a,section.compacto .contenido-columna article {
  width:40px!important;
  min-width:40px;
  max-width:40px;
  height:40px;
  min-height:40px;
  max-height:40px;
  padding:6px;
  justify-content:center;
  overflow:hidden;
  flex:none;
  transform:none!important
}
nav.compacto .titulo-columna,section.compacto .titulo-columna,nav.compacto .etiqueta,section.compacto .etiqueta {
  display:none
}
nav.compacto .minimizar,section.compacto .minimizar {
  left:6px;
  right:6px;
  width:40px
}
/* =========================================================
   LIBRERIA: FORMULARIOS
   ========================================================= */
.ju-card {
  background:white;
  padding:18px;
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)
}
.ju-form-grid {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:16px;
  margin-top:16px
}
.ju-form-full {
  grid-column:1/-1
}
.ju-form-grid label {
  display:flex;
  flex-direction:column;
  gap:8px;
  font-size:14px;
  font-weight:500
}
.ju-form-grid input,.ju-form-grid select,.ju-form-grid textarea {
  width:100%;
  border:1px solid #d8dfeb;
  background:#f8fafc;
  color:#172033;
  padding:12px 14px;
  font:inherit;
  outline:none;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)
}
.ju-form-grid textarea {
  min-height:110px;
  resize:vertical
}
.ju-form-grid input:focus,.ju-form-grid select:focus,.ju-form-grid textarea:focus {
  border-color:var(--color);
  box-shadow:0 0 0 4px color-mix(in srgb,var(--color) 18%,transparent);
  background:white
}
.ju-check {
  display:inline-flex!important;
  flex-direction:row!important;
  align-items:center;
  gap:10px!important
}
.ju-check input {
  width:18px!important;
  height:18px;
  clip-path:none!important
}
.ju-btn {
  border:0;
  padding:11px 16px;
  background:var(--color);
  color:white;
  cursor:pointer;
  font:inherit;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)
}
.ju-btn.secondary {
  background:var(--color2);
  color:#111
}
.ju-button-row {
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  margin-top:16px
}
/* LOGIN jocarsa-iu */
.ju-login-page {
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:radial-gradient(circle at top left,var(--color4),transparent 35%),linear-gradient(180deg,var(--color3),var(--color4));
  padding:30px
}
.ju-login-layout {
  width:min(920px,100%);
  display:grid;
  grid-template-columns:minmax(280px,400px) minmax(320px,520px);
  gap:24px
}
.ju-login-side,.ju-login-card {
  padding:28px;
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)
}
.ju-login-side {
  background:linear-gradient(180deg,var(--color0),var(--color));
  color:white;
  display:flex;
  flex-direction:column;
  justify-content:center
}
.ju-login-card {
  background:white
}
.ju-login-brand {
  text-align:center
}
.ju-login-brand img {
  width:72px;
  height:72px
}
.ju-login-product-title {
  font-size:28px;
  margin:12px 0 6px
}
.ju-login-card h2 {
  margin-top:0
}
.ju-login-actions {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px
}
.ju-text-link {
  color:var(--color);
  font-weight:bold;
  text-decoration:none
}
/* TOASTS jocarsa-iu */
.ju-toast-stack {
  position:fixed;
  right:22px;
  bottom:22px;
  z-index:1000;
  width:min(420px,calc(100vw - 44px));
  display:flex;
  flex-direction:column;
  gap:12px;
  pointer-events:none
}
.ju-toast {
  pointer-events:auto;
  position:relative;
  display:grid;
  grid-template-columns:42px 1fr auto;
  gap:12px;
  align-items:start;
  padding:14px;
  background:rgba(255,255,255,.97);
  box-shadow:0 18px 38px rgba(0,0,0,.14);
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);
  transform:translateX(22px);
  opacity:0;
  animation:juToastIn .28s ease forwards
}
.ju-toast:before {
  content:"";
  position:absolute;
  left:0;
  top:0;
  bottom:0;
  width:7px;
  background:#3b82f6
}
.ju-toast.is-success:before {
  background:#22c55e
}
.ju-toast.is-warning:before {
  background:#f59e0b
}
.ju-toast.is-danger:before {
  background:#ef4444
}
.ju-toast-icon {
  width:42px;
  height:42px;
  display:grid;
  place-items:center;
  background:var(--color3);
  font-weight:800
}
.ju-toast-title {
  margin:0 0 3px;
  font-weight:800
}
.ju-toast-text {
  margin:0;
  color:#667085;
  font-size:13px
}
.ju-toast-close {
  border:0;
  background:transparent;
  font-size:20px;
  cursor:pointer
}
.ju-toast.is-leaving {
  animation:juToastOut .22s ease forwards
}
@keyframes juToastIn {
  to {
    transform:translateX(0);
    opacity:1
  }
}
@keyframes juToastOut {
  to {
    transform:translateX(24px);
    opacity:0
  }
}
@media(max-width:800px) {
  .ju-form-grid,.ju-login-layout {
    grid-template-columns:1fr
  }
}
/* =========================================================
   V3 · AJUSTES DE COHERENCIA JOCARSA-IU
   ========================================================= */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
html,body,button,input,select,textarea {
  font-family:Ubuntu,Arial,sans-serif
}
/* Las cajas de ambas columnas quedan centradas dentro de su menú. */
nav .contenido-columna,section .contenido-columna {
  align-items:center;
  width:100%
}
nav .contenido-columna>a,section .contenido-columna>article {
  width:100%;
  margin-left:auto;
  margin-right:auto
}
nav.compacto .contenido-columna,section.compacto .contenido-columna {
  margin-left:auto;
  margin-right:auto
}
/* Login: composición centrada y fondo de proyecto. jocarsa.png vive en la raíz. */
.ju-login-page {
  position:relative;
  isolation:isolate;
  min-height:100vh;
  margin:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:40px 20px;
  background-image:linear-gradient(rgba(215,230,227,.72),rgba(215,230,227,.72)),url('../jocarsa.png');
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
}
.ju-login-layout {
  width:min(980px,100%);
  margin:auto;
  align-items:stretch
}
.ju-login-side,.ju-login-card {
  min-height:450px
}
.ju-login-card {
  display:flex;
  flex-direction:column;
  justify-content:center
}
.ju-login-brand {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center
}
/* Páginas de demostración de la librería */
.ju-demo-page {
  min-height:100vh;
  overflow:auto;
  background:var(--color3);
  color:#172033
}
.ju-demo-header {
  min-height:64px;
  background:var(--color);
  color:white;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:12px 20px
}
.ju-demo-header h1 {
  margin:0;
  font-size:20px;
  font-weight:500
}
.ju-demo-header p {
  margin:3px 0 0;
  opacity:.75
}
.ju-demo-header nav {
  width:auto!important;
  background:transparent;
  padding:0;
  display:flex;
  flex-direction:row;
  gap:8px;
  overflow:visible
}
.ju-demo-header a {
  color:white;
  text-decoration:none;
  padding:10px 14px;
  background:var(--color2);
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)
}
.ju-demo-main {
  width:min(1100px,calc(100% - 40px));
  margin:32px auto;
  display:grid;
  gap:20px
}
.ju-demo-grid {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:20px
}
.ju-demo-page .ju-card h2,.ju-demo-page .ju-card h3 {
  margin-top:0
}
.ju-fieldset {
  border:1px solid #e2e8f0;
  background:#f8fafc;
  padding:16px;
  display:flex;
  flex-direction:column;
  gap:12px
}
.ju-check-group {
  display:flex;
  gap:18px;
  flex-wrap:wrap
}
@media(max-width:800px) {
  .ju-demo-grid {
    grid-template-columns:1fr
  }
  .ju-demo-header {
    align-items:flex-start;
    flex-direction:column
  }
  .ju-demo-header nav {
    flex-wrap:wrap
  }
}
/* =========================================================
   V4 · fidelidad jocarsa-iu 010
   ========================================================= */
/* Header completo: corporativo / herramientas / usuario */
header .corporativo {
  flex:1
}
header #herramientas {
  display:flex;
  gap:var(--relleno);
  align-items:center;
  justify-content:center;
  flex:2;
  height:100%
}
header #usuario {
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:var(--relleno);
  flex:1;
  height:100%
}
header #usuario .imagen {
  width:28px;
  height:28px;
  background:var(--color2);
  border-radius:100px;
  flex:none
}
header #usuario>div:last-child {
  display:flex;
  align-items:center;
  gap:var(--relleno);
  flex:none
}
header #usuario p {
  margin:0;
  white-space:nowrap
}
header #usuario a {
  background:var(--color2);
  border:0;
  padding:calc(var(--relleno)/2);
  height:28px;
  display:flex;
  align-items:center;
  color:var(--texto-nav);
  text-decoration:none;
  font:inherit
}
/* Las fichas de letra son cuadrados achaflanados, nunca círculos */
.ficha {
  border-radius:0!important;
  clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,0 100%)
}
/* El destacado atraviesa visualmente el separador, sin provocar scroll horizontal. */
nav {
  overflow:visible!important;
  z-index:3
}
nav .contenido-columna {
  overflow-y:auto;
  overflow-x:visible;
  padding-right:0
}
section {
  overflow:visible!important;
  z-index:200;
}
section .contenido-columna {
  overflow-y:auto;
  overflow-x:visible;
  padding-right:0
}
.contenido-columna .activo {
  transform:none
}
#navegacion .contenido-columna a,#entidades .contenido-columna article {
  width:100%;
  height:40px;
  flex:none;
  transition:width .3s ease,background .3s ease
}
#navegacion .contenido-columna a:hover,#entidades .contenido-columna article:hover {
  width:calc(100% + var(--relleno)*.9)
}
#navegacion .contenido-columna a.activo,#entidades .contenido-columna article.activo {
  width:calc(100% + var(--relleno)*2);
  position:relative;
  z-index:10
}
nav.compacto .contenido-columna a:hover,nav.compacto .contenido-columna a.activo,section.compacto .contenido-columna article:hover,section.compacto .contenido-columna article.activo {
  width:40px!important
}
/* Login realmente centrado + fondo jocarsa.png de la raíz */
body.ju-login-page {
  width:100%;
  height:100vh;
  min-height:100vh;
  margin:0;
  display:grid!important;
  place-items:center;
  overflow:auto;
  padding:30px;
  background:linear-gradient(rgba(235,244,243,.72),rgba(235,244,243,.72)),url('../jocarsa.png') center center/cover no-repeat fixed
}
body.ju-login-page main.ju-login-layout {
  flex:none!important;
  min-height:0!important;
  margin:0!important;
  width:min(920px,calc(100vw - 60px));
  align-self:center;
  justify-self:center
}
/* Páginas de demostración: mismo esqueleto de dos menús + escenario */
body.ju-library-page {
  font-family:Ubuntu,Arial,sans-serif;
  font-size:var(--texto);
  display:flex;
  flex-direction:column;
  overflow:hidden;
  background:var(--color3)
}
body.ju-library-page main {
  display:flex;
  flex:1;
  min-height:0;
  overflow:hidden
}
body.ju-library-page .library-nav {
  width:var(--ancho-nav);
  flex:0 0 var(--ancho-nav);
  background:var(--color);
  color:white;
  padding:12px;
  position:relative;
  overflow:visible;
  display:flex;
  flex-direction:column;
  gap:10px
}
body.ju-library-page .library-section {
  width:var(--ancho-section);
  flex:0 0 var(--ancho-section);
  background:var(--color2);
  color:#111;
  padding:12px 12px 12px 3px;
  position:relative;
  overflow:visible;
  display:flex;
  flex-direction:column;
  gap:10px
}
body.ju-library-page .library-nav .contenido-columna,body.ju-library-page .library-section .contenido-columna {
  overflow-y:auto;
  overflow-x:visible
}
body.ju-library-page .library-nav a,body.ju-library-page .library-section a {
  height:40px;
  flex:none;
  display:flex;
  align-items:center;
  gap:9px;
  padding:6px;
  background:var(--color2);
  color:inherit;
  text-decoration:none;
  clip-path:polygon(0 0,calc(100% - var(--chaflan)) 0,100% var(--chaflan),100% 100%,0 100%)
}
body.ju-library-page .library-section a {
  background:var(--color3)
}
body.ju-library-page .library-nav a.activo,body.ju-library-page .library-section a.activo {
  width:calc(100% + var(--relleno)*2);
  position:relative;
  z-index:10
}
body.ju-library-page .library-stage {
  flex:1;
  min-width:0;
  padding:14px;
  overflow:auto;
  background:var(--color3)
}
body.ju-library-page .library-stage>.ju-card {
  max-width:1100px
}
/* =========================================================
   V5 · continuidad entre columnas sin scroll horizontal
   ========================================================= */
/*
  No usamos un contenedor scrollable alrededor de las fichas: cuando un
  elemento activo es más ancho que su columna, overflow:auto convierte el
  desbordamiento horizontal en una barra de scroll. En jocarsa-iu el
  destacado debe poder atravesar el límite de la columna y cubrir el
  separador visualmente.
*/
.jocarsa-iu nav .contenido-columna, .jocarsa-iu section .contenido-columna, body.ju-library-page .library-nav .contenido-columna, body.ju-library-page .library-section .contenido-columna {
  overflow:visible !important;
  width:100%;
  min-width:0;
  align-items:stretch;
}
/* Las fichas normales ocupan siempre todo el ancho útil de su columna. */
.jocarsa-iu nav .contenido-columna > a, .jocarsa-iu section .contenido-columna > article, body.ju-library-page .library-nav .contenido-columna > a, body.ju-library-page .library-section .contenido-columna > a {
  width:100%;
  max-width:none;
  margin:0;
  flex:0 0 40px;
}
/* Hover y selección continúan físicamente hacia la columna siguiente. */
.jocarsa-iu nav .contenido-columna > a:hover, .jocarsa-iu section .contenido-columna > article:hover, body.ju-library-page .library-nav .contenido-columna > a:hover, body.ju-library-page .library-section .contenido-columna > a:hover {
  width:calc(100% + (var(--relleno) * .9));
  position:relative;
  z-index:9;
}
.jocarsa-iu nav .contenido-columna > a.activo, .jocarsa-iu section .contenido-columna > article.activo, body.ju-library-page .library-nav .contenido-columna > a.activo, body.ju-library-page .library-section .contenido-columna > a.activo {
  width:calc(100% + (var(--relleno) * 2));
  position:relative;
  z-index:10;
}
/* El separador queda por debajo del destacado, como en 010. */
.jocarsa-iu main .separador, body.ju-library-page main .separador {
  z-index:4
}
.jocarsa-iu nav, body.ju-library-page .library-nav {
  z-index:6
}
.jocarsa-iu section, body.ju-library-page .library-section {
  z-index:500
}
/* La columna central de las demos conserva exactamente la misma geometría
   que la columna central de index.html. */
body.ju-library-page .library-section {
  padding:var(--relleno);
  padding-left:3px;
}
body.ju-library-page .library-section .contenido-columna > a {
  padding:calc(var(--relleno) / 2);
  height:40px;
  min-height:40px;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  gap:calc(var(--relleno) / 2);
  background:var(--color3);
}
/* Contraído: conserva la misma continuidad visual hacia la columna siguiente. */
.jocarsa-iu nav.compacto .contenido-columna,
.jocarsa-iu section.compacto .contenido-columna {
  width:40px;
  align-items:center;
  overflow:visible !important;
}

/* Estado normal: la ficha permanece dentro de los 40px de la columna compacta. */
.jocarsa-iu nav.compacto .contenido-columna > a,
.jocarsa-iu section.compacto .contenido-columna > article {
  width:40px !important;
  min-width:40px;
  max-width:none;
  overflow:visible;
  position:relative;
}

/* Hover: sobresale ligeramente hacia la siguiente sección. */
.jocarsa-iu nav.compacto .contenido-columna > a:hover,
.jocarsa-iu section.compacto .contenido-columna > article:hover {
  width:calc(40px + (var(--relleno) * .9)) !important;
  z-index:9;
}

/* Activo: atraviesa el separador igual que en el estado desplegado. */
.jocarsa-iu nav.compacto .contenido-columna > a.activo,
.jocarsa-iu section.compacto .contenido-columna > article.activo {
  width:calc(50px + (var(--relleno) * 2)) !important;
  z-index:10;
}


/* =========================================================
   V6 · DRAWER DERECHO REDIMENSIONABLE + MODAL
   ========================================================= */
.ju-drawer-overlay{position:fixed;inset:54px 0 0 0;background:rgba(20,35,45,.12);z-index:70;opacity:0;pointer-events:none;transition:opacity .25s ease}
.ju-drawer-overlay.abierto{opacity:1;pointer-events:auto}
.ju-drawer{--drawer-width:440px;position:fixed;z-index:80;top:54px;right:0;bottom:0;width:var(--drawer-width);max-width:50vw;background:white;box-shadow:-18px 0 45px rgba(0,0,0,.18);transform:translateX(calc(100% + 20px));transition:transform .3s ease;display:flex;flex-direction:column;color:#172033}
.ju-drawer.abierto{transform:translateX(0)}
.ju-drawer-resizer{position:absolute;left:-7px;top:0;bottom:0;width:7px;background:var(--color0);cursor:col-resize;z-index:3;transition:background .2s}
.ju-drawer-resizer:hover{background:var(--color)}
.ju-drawer-header{height:auto;min-height:76px;flex:none;background:var(--color);padding:14px 16px;color:white;display:flex;align-items:center;justify-content:space-between;gap:12px}
.ju-drawer-header small{display:block;opacity:.7;font-weight:700;letter-spacing:.12em;margin-bottom:3px}
.ju-drawer-header h2{margin:0;font-size:20px}
.ju-drawer-close,.ju-modal-close{border:0;background:var(--color2);color:inherit;width:36px;height:36px;font-size:24px;cursor:pointer;flex:none}
.ju-drawer-body{padding:18px;overflow:auto;flex:1;min-height:0;background:var(--color3)}
.ju-drawer-body .ju-card{min-height:100%}
.ju-drawer-body .ju-form-grid{grid-template-columns:1fr}
.ju-drawer-body .ju-form-full{grid-column:auto}
.ju-drawer.ju-drawer-dos-columnas .ju-drawer-body .ju-form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.ju-drawer.ju-drawer-dos-columnas .ju-drawer-body .ju-form-full{grid-column:1/-1}
.ju-row-editable{cursor:pointer}
.ju-row-editable:hover{background:color-mix(in srgb,var(--color2) 35%,white)!important}
.ju-row-editable:after{content:""}
.ju-modal-layer{position:fixed;inset:0;z-index:120;display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .22s ease;padding:24px}
.ju-modal-layer.abierto{opacity:1;pointer-events:auto}
.ju-modal-backdrop{position:absolute;inset:0;background:rgba(8,18,24,.62);backdrop-filter:blur(2px)}
.ju-modal-window{position:relative;z-index:1;width:min(650px,calc(100vw - 48px));max-height:calc(100vh - 48px);background:white;box-shadow:0 28px 80px rgba(0,0,0,.3);clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);transform:translateY(16px) scale(.98);transition:transform .22s ease;overflow:hidden}
.ju-modal-layer.abierto .ju-modal-window{transform:none}
.ju-modal-header{height:auto;min-height:62px;background:var(--color);color:white;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
.ju-modal-header h2{margin:0;font-size:19px}
.ju-modal-body{padding:22px;max-height:calc(100vh - 120px);overflow:auto}
.ju-showcase-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:18px}
.ju-showcase-box{padding:18px;background:var(--color3);min-height:150px;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)}
.ju-showcase-box h3{margin-top:0}
body.redimensionando-drawer,body.redimensionando-drawer *{cursor:col-resize!important;user-select:none!important}
@media(max-width:700px){.ju-drawer{--drawer-width:50vw;max-width:50vw}.ju-showcase-grid{grid-template-columns:1fr}}


/* =========================================================
   V7 · compacto: fusionar visualmente con la sección derecha
   ========================================================= */
.jocarsa-iu nav.compacto .contenido-columna > a:hover,
.jocarsa-iu section.compacto .contenido-columna > article:hover,
.jocarsa-iu nav.compacto .contenido-columna > a.activo,
.jocarsa-iu section.compacto .contenido-columna > article.activo {
  transform:translateX(16px) !important;
}

/* =========================================================
   V8 · PEACH MINT + estética Habitica (incremental)
   ========================================================= */

/* Header: fondo peach suave con borde inferior mint */
header {
  background: linear-gradient(135deg, var(--peach-soft), var(--peach));
  color: #2e2a29;
  box-shadow: var(--sombra-peach);
}
header input, header button {
  background: rgba(255,255,255,.55);
  color: #2e2a29;
  border-radius: var(--radio);
}
header input::placeholder { color: #8a7d7a; }

/* Columnas laterales: mint suave, esquinas redondeadas hacia dentro */
nav, section {
  background: var(--color2);
  color: #2e2a29;
  border-radius: var(--radio) 0 0 var(--radio);
}
section { background: linear-gradient(180deg, var(--mint-soft), var(--color2)); }

/* Fichas tipo "avatar de personaje" (Habitica) */
.ficha {
  border-radius: 50% !important;      /* aquí SÍ círculo, es avatar */
  clip-path: none !important;
  box-shadow: inset 0 -3px 0 rgba(0,0,0,.08);
  font-size: 14px;
}
.contenido-columna a, .contenido-columna article {
  border-radius: var(--radio);
  clip-path: none;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.contenido-columna a:hover,
.contenido-columna article:hover {
  box-shadow: var(--sombra-mint);
  transform: translateX(4px);
}
.contenido-columna .activo {
  background: var(--mint) !important;
  color: #14332b !important;
  box-shadow: var(--sombra-mint);
}

/* Escenario: fondo crema con textura sutil */
.escenario {
  background:
    radial-gradient(circle at 12% 20%, rgba(200,243,228,.55), transparent 40%),
    radial-gradient(circle at 88% 80%, rgba(255,169,142,.35), transparent 45%),
    var(--color3);
}

/* Tarjetas y tablas */
.ju-card, table, .panel {
  border-radius: var(--radio);
  box-shadow: var(--sombra-peach);
  overflow: hidden;
}
caption {
  background: linear-gradient(90deg, var(--peach-soft), var(--mint-soft));
  color: #2e2a29;
  border-radius: var(--radio) var(--radio) 0 0;
}
thead { background: var(--mint); color: #14332b; }
tbody tr:hover { background: #fdf0ea; }

/* Botones */
.ju-btn {
  background: linear-gradient(135deg, var(--peach), #ff8e6b);
  color: #fff;
  border-radius: 999px;
  clip-path: none;
  box-shadow: var(--sombra-peach);
  transition: transform .15s ease, box-shadow .15s ease;
}
.ju-btn:hover { transform: translateY(-1px); box-shadow: 0 18px 40px rgba(255,142,107,.35); }
.ju-btn.secondary {
  background: var(--mint-soft);
  color: #14332b;
  box-shadow: var(--sombra-mint);
}

/* Toasts con acento peach/mint */
.ju-toast {
  border-radius: var(--radio);
  clip-path: none;
  box-shadow: 0 18px 40px rgba(46,42,41,.12);
}
.ju-toast:before { width: 6px; border-radius: 6px 0 0 6px; background: var(--mint); }
.ju-toast.is-success:before { background: var(--mint); }
.ju-toast.is-warning:before { background: var(--peach); }
.ju-toast.is-danger:before  { background: #e57373; }
.ju-toast-icon { background: var(--peach-soft); border-radius: 50%; }

/* Drawer y modal: mismo lenguaje */
.ju-drawer { background: var(--color3); }
.ju-drawer-header { background: linear-gradient(135deg, var(--peach), #ff8e6b); }
.ju-drawer-resizer { background: var(--mint); }
.ju-drawer-body { background: var(--color3); }
.ju-modal-window { border-radius: var(--radio); clip-path: none; }
.ju-modal-header { background: linear-gradient(135deg, var(--peach), #ff8e6b); }
.ju-modal-body { background: #fffdfb; }

/* =========================================================
   V8 · HUD Habitica + FAB IA + Panel IA
   ========================================================= */

/* HUD superior (stats del personaje) */
.ju-hud {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 16px;
  background: linear-gradient(90deg, var(--peach-soft), var(--mint-soft));
  border-bottom: 1px solid rgba(46,42,41,.06);
  font-size: 12px;
  color: #2e2a29;
}
.ju-hud-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--peach);
  display: grid; place-items: center;
  font-weight: 700; color: #fff;
  box-shadow: var(--sombra-peach);
}
.ju-hud-stat {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.6);
  padding: 4px 10px; border-radius: 999px;
}
.ju-hud-bar {
  position: relative; width: 140px; height: 10px;
  background: rgba(46,42,41,.08); border-radius: 999px; overflow: hidden;
}
.ju-hud-bar > span {
  position: absolute; inset: 0 auto 0 0;
  background: linear-gradient(90deg, var(--mint), var(--peach));
  border-radius: 999px; transition: width .5s ease;
}
.ju-hud-racha { color: #b45309; font-weight: 700; }

/* Botón flotante IA */
.ju-ia-fab {
  position: fixed; right: 24px; bottom: 24px; z-index: 90;
  width: 60px; height: 60px; border-radius: 50%;
  border: 0; cursor: pointer;
  background: linear-gradient(135deg, var(--peach), #ff8e6b);
  color: #fff; font-size: 22px;
  display: grid; place-items: center;
  box-shadow: 0 18px 40px rgba(255,142,107,.45);
  transition: transform .2s ease;
}
.ju-ia-fab:hover { transform: scale(1.06); }
.ju-ia-fab-label { display: none; }

/* Panel IA: chat popover encima del botón, cerrable */
.bg-ia-panel {
  position: fixed;
  z-index: 95;
  right: 24px;
  bottom: 96px;                     /* justo encima del FAB (24 + 60 + 12) */
  width: min(380px, calc(100vw - 48px));
  max-height: min(560px, calc(100vh - 160px));
  background: #fffdfb;
  box-shadow: -10px -10px 40px rgba(46,42,41,.14), 0 18px 40px rgba(46,42,41,.10);
  border-radius: var(--radio);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--mint);
  opacity: 0;
  transform: translateY(12px) scale(.98);
  pointer-events: none;
  transition: opacity .22s ease, transform .22s ease;
}
.bg-ia-panel.abierto {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.bg-ia-panel-header {
  padding: 14px 16px;
  display: flex; align-items: center; justify-content: space-between;
  background: linear-gradient(135deg, var(--mint), var(--mint-soft));
  color: #14332b;
  flex: none;
}
.bg-ia-panel-header h2 { margin: 0; font-size: 16px; }
.bg-ia-cerrar {
  border: 0; background: rgba(255,255,255,.5);
  width: 32px; height: 32px; border-radius: 50%;
  font-size: 20px; cursor: pointer; color: #14332b;
  display: grid; place-items: center;
}
.bg-ia-cerrar:hover { background: rgba(255,255,255,.9); }
.bg-ia-mensajes {
  flex: 1; overflow: auto; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
  min-height: 120px;
}
.bg-ia-msg { max-width: 85%; padding: 10px 14px; border-radius: 16px; line-height: 1.4; font-size: 13px; white-space: pre-wrap; }
.bg-ia-msg.bot  { background: var(--mint-soft); color: #14332b; align-self: flex-start; border-bottom-left-radius: 4px; }
.bg-ia-msg.user { background: var(--peach); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
.bg-ia-msg.error { background: #ffe1dd; color: #7a1f14; align-self: flex-start; }
.bg-ia-form {
  display: flex; gap: 8px; padding: 12px 16px;
  border-top: 1px solid rgba(46,42,41,.08); flex: none;
}
.bg-ia-form input {
  flex: 1; padding: 10px 14px; border: 1px solid #e5d8d3;
  border-radius: 999px; outline: none; font: inherit;
}
.bg-ia-form input:focus { border-color: var(--mint); }
.bg-ia-panel-footer {
  padding: 8px 16px; font-size: 11px; color: #8a7d7a;
  text-align: center; border-top: 1px solid rgba(46,42,41,.06);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  flex: none;
}
.bg-ia-panel-footer select {
  font: inherit; padding: 2px 6px; border-radius: 6px;
  border: 1px solid #e5d8d3; background: white; color: #2e2a29;
}



```
**estilo_old.css**
```css
:root {
  /* ===== Núcleo de color: Peach Mint ===== */
  --tono: 12;                 /* antes 200 (azul) → ahora coral suave */
  --saturacion: 85%;
  --brillo: 75%;
  --escalon: 8%;

  /* ===== Acentos mint (nuevos) ===== */
  --mint: #7CC9B7;
  --mint-soft: #C8F3E4;
  --peach: #FFA98E;
  --peach-soft: #FAD0C2;
  --tinta: #8A7D7A;

  /* ===== Tokens derivados ===== */
  --relleno: 12px;
  --texto: 13px;
  --chaflan: 10px;
  --radio: 14px;              /* NUEVO: bordes redondeados */
  --sombra-peach: 0 14px 34px rgba(255,169,142,.22);
  --sombra-mint: 0 14px 34px rgba(124,201,183,.22);

  --color0: #fbe6df;          /* peach más claro (fondo hover) */
  --color:  #f7b8a3;          /* peach medio (cabeceras) */
  --color2: #d6ece5;          /* mint claro (columnas) */
  --color3: #f7f1ee;          /* crema general (fondo) */
  --color4: #7CC9B7;          /* mint intenso (acento activo) */

  --texto-nav: #2e2a29;
  --ancho-nav: 210px;
  --ancho-section: 260px;
}
* {
  box-sizing:border-box
}
html,body {
  width:100%;
  height:100%;
  margin:0
}
.jocarsa-iu {
  font-family:Ubuntu,Arial,sans-serif;
  font-size:var(--texto);
  display:flex;
  flex-direction:column;
  overflow:hidden;
  background:var(--color3)
}
header {
  height:54px;
  flex:none;
  background:var(--color);
  display:flex;
  align-items:center;
  gap:12px;
  padding:12px;
  color:var(--texto-nav)
}
.corporativo {
  display:flex;
  align-items:center;
  gap:10px;
  flex:1
}
.corporativo img {
  width:28px;
  height:28px
}
.corporativo h1 {
  font-size:20px;
  font-weight:bold;
  margin:0
}
header input,header button {
  border:0;
  padding:8px 10px;
  background:var(--color2);
  color:inherit;
  outline:none
}
header input {
  min-width:260px;
  background:var(--color0)
}
main {
  display:flex;
  flex:1;
  min-height:0
}
nav,section {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:10px;
  padding:12px;
  background:var(--color);
  color:white;
  overflow:hidden;
  flex:none;
  transition:width .25s
}
nav {
  width:var(--ancho-nav)
}
section {
  width:var(--ancho-section);
  background:var(--color2);
  color:#111;
  padding-left:3px;
}
.titulo-columna {
  font-weight:bold;
  opacity:.75
}
.contenido-columna {
  display:flex;
  flex-direction:column;
  gap:10px;
  overflow:auto;
  min-height:0
}
.contenido-columna a,.contenido-columna article {
  display:flex;
  align-items:center;
  gap:9px;
  padding:9px;
  background:var(--color2);
  color:inherit;
  text-decoration:none;
  cursor:pointer;
  clip-path:polygon(0 0,calc(100% - var(--chaflan)) 0,100% var(--chaflan),100% 100%,0 100%);
  transition:.2s
}
.contenido-columna article {
  background:var(--color3)
}
.contenido-columna .activo {
  transform:translateX(8px);
}
.ficha {
  width:28px;
  height:28px;
  display:grid;
  place-items:center;
  border-radius:50%;
  color:white;
  font-weight:bold;
  flex:none
}
.minimizar {
  position:absolute;
  right:5px;
  bottom:5px;
  border:0;
  width:28px;
  height:28px;
  cursor:pointer
}
.compacto {
  width:58px!important
}
.compacto .titulo-columna,.compacto .etiqueta {
  display:none
}
.compacto .contenido-columna {
  overflow:hidden
}
.separador {
  width:5px;
  cursor:col-resize;
  background:var(--color0);
  flex:none
}
.escenario {
  flex:1;
  min-width:0;
  padding:14px;
  overflow:auto;
  background:var(--color3);
  padding-left: 5px;position:relative;z-index:1000;
}
table {
  width:100%;
  border-collapse:collapse;
  background:white
}
caption {
  text-align:left;
  padding:12px;
  background:var(--color2);
  font-weight:bold
}
th,td {
  padding:10px;
  border-bottom:1px solid #ddd;
  text-align:left
}
thead {
  background:var(--color)
}
tbody tr:hover {
  background:#f1f1f1
}
.panel {
  background:white;
  padding:16px;
  max-width:1000px
}
.campos {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:12px
}
.campo {
  display:flex;
  flex-direction:column;
  gap:5px
}
.campo input,.campo textarea,.campo select {
  padding:9px;
  border:1px solid #bbb
}
.campo textarea {
  min-height:90px
}
.acciones {
  display:flex;
  gap:8px;
  margin-top:14px
}
.acciones button {
  padding:9px 14px;
  border:0;
  background:var(--color);
  color:white
}
.drag-over {
  outline:3px dashed var(--color0)
}
.estado {
  margin:0 0 10px;
  padding:8px;
  background:rgba(255,255,255,.55)
}
/* =========================================================
   REGLAS 010: SEPARADORES + MENUS CONTRAIDOS
   ========================================================= */
nav,section {
  transition:width .3s ease,flex-basis .3s ease,padding .3s ease
}
.separador {
  flex:0 0 7px;
  width:7px;
  min-width:7px;
  padding:0;
  cursor:col-resize;
  position:relative;
  z-index:4;
  transition:background .3s ease
}
nav + .separador {
  background:var(--color2)
}
section + .separador {
  background:var(--color3)
}
.separador:hover {
  background:var(--color4)
}
body.redimensionando {
  cursor:col-resize;
  user-select:none
}
body.redimensionando * {
  cursor:col-resize!important
}
.minimizar {
  position:absolute;
  bottom:var(--relleno);
  left:var(--relleno);
  right:var(--relleno);
  width:auto;
  height:28px;
  border:0;
  background:var(--color2);
  color:inherit;
  cursor:pointer;
  font:inherit;
  z-index:20;
  transition:left .3s,right .3s,width .3s,background .3s
}
section .minimizar {
  background:var(--color3)
}
.minimizar:hover {
  background:var(--color4)
}
nav.compacto,section.compacto {
  flex-basis:52px!important;
  width:52px!important;
  padding-left:6px;
  padding-right:6px;
  align-items:center
}
nav.compacto .contenido-columna,section.compacto .contenido-columna {
  width:40px;
  overflow:hidden;
  align-items:center
}
nav.compacto .contenido-columna a,section.compacto .contenido-columna article {
  width:40px!important;
  min-width:40px;
  max-width:40px;
  height:40px;
  min-height:40px;
  max-height:40px;
  padding:6px;
  justify-content:center;
  overflow:hidden;
  flex:none;
  transform:none!important
}
nav.compacto .titulo-columna,section.compacto .titulo-columna,nav.compacto .etiqueta,section.compacto .etiqueta {
  display:none
}
nav.compacto .minimizar,section.compacto .minimizar {
  left:6px;
  right:6px;
  width:40px
}
/* =========================================================
   LIBRERIA: FORMULARIOS
   ========================================================= */
.bg-card {
  background:white;
  padding:18px;
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)
}
.bg-form-grid {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:16px;
  margin-top:16px
}
.bg-form-full {
  grid-column:1/-1
}
.bg-form-grid label {
  display:flex;
  flex-direction:column;
  gap:8px;
  font-size:14px;
  font-weight:500
}
.bg-form-grid input,.bg-form-grid select,.bg-form-grid textarea {
  width:100%;
  border:1px solid #d8dfeb;
  background:#f8fafc;
  color:#172033;
  padding:12px 14px;
  font:inherit;
  outline:none;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)
}
.bg-form-grid textarea {
  min-height:110px;
  resize:vertical
}
.bg-form-grid input:focus,.bg-form-grid select:focus,.bg-form-grid textarea:focus {
  border-color:var(--color);
  box-shadow:0 0 0 4px color-mix(in srgb,var(--color) 18%,transparent);
  background:white
}
.bg-check {
  display:inline-flex!important;
  flex-direction:row!important;
  align-items:center;
  gap:10px!important
}
.bg-check input {
  width:18px!important;
  height:18px;
  clip-path:none!important
}
.bg-btn {
  border:0;
  padding:11px 16px;
  background:var(--color);
  color:white;
  cursor:pointer;
  font:inherit;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)
}
.bg-btn.secondary {
  background:var(--color2);
  color:#111
}
.bg-button-row {
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  margin-top:16px
}
/* LOGIN jocarsa-iu */
.bg-login-page {
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:radial-gradient(circle at top left,var(--color4),transparent 35%),linear-gradient(180deg,var(--color3),var(--color4));
  padding:30px
}
.bg-login-layout {
  width:min(920px,100%);
  display:grid;
  grid-template-columns:minmax(280px,400px) minmax(320px,520px);
  gap:24px
}
.bg-login-side,.bg-login-card {
  padding:28px;
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)
}
.bg-login-side {
  background:linear-gradient(180deg,var(--color0),var(--color));
  color:white;
  display:flex;
  flex-direction:column;
  justify-content:center
}
.bg-login-card {
  background:white
}
.bg-login-brand {
  text-align:center
}
.bg-login-brand img {
  width:72px;
  height:72px
}
.bg-login-product-title {
  font-size:28px;
  margin:12px 0 6px
}
.bg-login-card h2 {
  margin-top:0
}
.bg-login-actions {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px
}
.bg-text-link {
  color:var(--color);
  font-weight:bold;
  text-decoration:none
}
/* TOASTS jocarsa-iu */
.bg-toast-stack {
  position:fixed;
  right:22px;
  bottom:22px;
  z-index:1000;
  width:min(420px,calc(100vw - 44px));
  display:flex;
  flex-direction:column;
  gap:12px;
  pointer-events:none
}
.bg-toast {
  pointer-events:auto;
  position:relative;
  display:grid;
  grid-template-columns:42px 1fr auto;
  gap:12px;
  align-items:start;
  padding:14px;
  background:rgba(255,255,255,.97);
  box-shadow:0 18px 38px rgba(0,0,0,.14);
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);
  transform:translateX(22px);
  opacity:0;
  animation:juToastIn .28s ease forwards
}
.bg-toast:before {
  content:"";
  position:absolute;
  left:0;
  top:0;
  bottom:0;
  width:7px;
  background:#3b82f6
}
.bg-toast.is-success:before {
  background:#22c55e
}
.bg-toast.is-warning:before {
  background:#f59e0b
}
.bg-toast.is-danger:before {
  background:#ef4444
}
.bg-toast-icon {
  width:42px;
  height:42px;
  display:grid;
  place-items:center;
  background:var(--color3);
  font-weight:800
}
.bg-toast-title {
  margin:0 0 3px;
  font-weight:800
}
.bg-toast-text {
  margin:0;
  color:#667085;
  font-size:13px
}
.bg-toast-close {
  border:0;
  background:transparent;
  font-size:20px;
  cursor:pointer
}
.bg-toast.is-leaving {
  animation:juToastOut .22s ease forwards
}
@keyframes juToastIn {
  to {
    transform:translateX(0);
    opacity:1
  }
}
@keyframes juToastOut {
  to {
    transform:translateX(24px);
    opacity:0
  }
}
@media(max-width:800px) {
  .bg-form-grid,.bg-login-layout {
    grid-template-columns:1fr
  }
}
/* =========================================================
   V3 · AJUSTES DE COHERENCIA JOCARSA-IU
   ========================================================= */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
html,body,button,input,select,textarea {
  font-family:Ubuntu,Arial,sans-serif
}
/* Las cajas de ambas columnas quedan centradas dentro de su menú. */
nav .contenido-columna,section .contenido-columna {
  align-items:center;
  width:100%
}
nav .contenido-columna>a,section .contenido-columna>article {
  width:100%;
  margin-left:auto;
  margin-right:auto
}
nav.compacto .contenido-columna,section.compacto .contenido-columna {
  margin-left:auto;
  margin-right:auto
}
/* Login: composición centrada y fondo de proyecto. jocarsa.png vive en la raíz. */
.bg-login-page {
  position:relative;
  isolation:isolate;
  min-height:100vh;
  margin:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:40px 20px;
  background-image:linear-gradient(rgba(215,230,227,.72),rgba(215,230,227,.72)),url('../jocarsa.png');
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
}
.bg-login-layout {
  width:min(980px,100%);
  margin:auto;
  align-items:stretch
}
.bg-login-side,.bg-login-card {
  min-height:450px
}
.bg-login-card {
  display:flex;
  flex-direction:column;
  justify-content:center
}
.bg-login-brand {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center
}
/* Páginas de demostración de la librería */
.bg-demo-page {
  min-height:100vh;
  overflow:auto;
  background:var(--color3);
  color:#172033
}
.bg-demo-header {
  min-height:64px;
  background:var(--color);
  color:white;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:12px 20px
}
.bg-demo-header h1 {
  margin:0;
  font-size:20px;
  font-weight:500
}
.bg-demo-header p {
  margin:3px 0 0;
  opacity:.75
}
.bg-demo-header nav {
  width:auto!important;
  background:transparent;
  padding:0;
  display:flex;
  flex-direction:row;
  gap:8px;
  overflow:visible
}
.bg-demo-header a {
  color:white;
  text-decoration:none;
  padding:10px 14px;
  background:var(--color2);
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)
}
.bg-demo-main {
  width:min(1100px,calc(100% - 40px));
  margin:32px auto;
  display:grid;
  gap:20px
}
.bg-demo-grid {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:20px
}
.bg-demo-page .bg-card h2,.bg-demo-page .bg-card h3 {
  margin-top:0
}
.bg-fieldset {
  border:1px solid #e2e8f0;
  background:#f8fafc;
  padding:16px;
  display:flex;
  flex-direction:column;
  gap:12px
}
.bg-check-group {
  display:flex;
  gap:18px;
  flex-wrap:wrap
}
@media(max-width:800px) {
  .bg-demo-grid {
    grid-template-columns:1fr
  }
  .bg-demo-header {
    align-items:flex-start;
    flex-direction:column
  }
  .bg-demo-header nav {
    flex-wrap:wrap
  }
}
/* =========================================================
   V4 · fidelidad jocarsa-iu 010
   ========================================================= */
/* Header completo: corporativo / herramientas / usuario */
header .corporativo {
  flex:1
}
header #herramientas {
  display:flex;
  gap:var(--relleno);
  align-items:center;
  justify-content:center;
  flex:2;
  height:100%
}
header #usuario {
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:var(--relleno);
  flex:1;
  height:100%
}
header #usuario .imagen {
  width:28px;
  height:28px;
  background:var(--color2);
  border-radius:100px;
  flex:none
}
header #usuario>div:last-child {
  display:flex;
  align-items:center;
  gap:var(--relleno);
  flex:none
}
header #usuario p {
  margin:0;
  white-space:nowrap
}
header #usuario a {
  background:var(--color2);
  border:0;
  padding:calc(var(--relleno)/2);
  height:28px;
  display:flex;
  align-items:center;
  color:var(--texto-nav);
  text-decoration:none;
  font:inherit
}
/* Las fichas de letra son cuadrados achaflanados, nunca círculos */
.ficha {
  border-radius:0!important;
  clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,0 100%)
}
/* El destacado atraviesa visualmente el separador, sin provocar scroll horizontal. */
nav {
  overflow:visible!important;
  z-index:3
}
nav .contenido-columna {
  overflow-y:auto;
  overflow-x:visible;
  padding-right:0
}
section {
  overflow:visible!important;
  z-index:200;
}
section .contenido-columna {
  overflow-y:auto;
  overflow-x:visible;
  padding-right:0
}
.contenido-columna .activo {
  transform:none
}
#navegacion .contenido-columna a,#entidades .contenido-columna article {
  width:100%;
  height:40px;
  flex:none;
  transition:width .3s ease,background .3s ease
}
#navegacion .contenido-columna a:hover,#entidades .contenido-columna article:hover {
  width:calc(100% + var(--relleno)*.9)
}
#navegacion .contenido-columna a.activo,#entidades .contenido-columna article.activo {
  width:calc(100% + var(--relleno)*2);
  position:relative;
  z-index:10
}
nav.compacto .contenido-columna a:hover,nav.compacto .contenido-columna a.activo,section.compacto .contenido-columna article:hover,section.compacto .contenido-columna article.activo {
  width:40px!important
}
/* Login realmente centrado + fondo jocarsa.png de la raíz */
body.bg-login-page {
  width:100%;
  height:100vh;
  min-height:100vh;
  margin:0;
  display:grid!important;
  place-items:center;
  overflow:auto;
  padding:30px;
  background:linear-gradient(rgba(235,244,243,.72),rgba(235,244,243,.72)),url('../jocarsa.png') center center/cover no-repeat fixed
}
body.bg-login-page main.bg-login-layout {
  flex:none!important;
  min-height:0!important;
  margin:0!important;
  width:min(920px,calc(100vw - 60px));
  align-self:center;
  justify-self:center
}
/* Páginas de demostración: mismo esqueleto de dos menús + escenario */
body.bg-library-page {
  font-family:Ubuntu,Arial,sans-serif;
  font-size:var(--texto);
  display:flex;
  flex-direction:column;
  overflow:hidden;
  background:var(--color3)
}
body.bg-library-page main {
  display:flex;
  flex:1;
  min-height:0;
  overflow:hidden
}
body.bg-library-page .library-nav {
  width:var(--ancho-nav);
  flex:0 0 var(--ancho-nav);
  background:var(--color);
  color:white;
  padding:12px;
  position:relative;
  overflow:visible;
  display:flex;
  flex-direction:column;
  gap:10px
}
body.bg-library-page .library-section {
  width:var(--ancho-section);
  flex:0 0 var(--ancho-section);
  background:var(--color2);
  color:#111;
  padding:12px 12px 12px 3px;
  position:relative;
  overflow:visible;
  display:flex;
  flex-direction:column;
  gap:10px
}
body.bg-library-page .library-nav .contenido-columna,body.bg-library-page .library-section .contenido-columna {
  overflow-y:auto;
  overflow-x:visible
}
body.bg-library-page .library-nav a,body.bg-library-page .library-section a {
  height:40px;
  flex:none;
  display:flex;
  align-items:center;
  gap:9px;
  padding:6px;
  background:var(--color2);
  color:inherit;
  text-decoration:none;
  clip-path:polygon(0 0,calc(100% - var(--chaflan)) 0,100% var(--chaflan),100% 100%,0 100%)
}
body.bg-library-page .library-section a {
  background:var(--color3)
}
body.bg-library-page .library-nav a.activo,body.bg-library-page .library-section a.activo {
  width:calc(100% + var(--relleno)*2);
  position:relative;
  z-index:10
}
body.bg-library-page .library-stage {
  flex:1;
  min-width:0;
  padding:14px;
  overflow:auto;
  background:var(--color3)
}
body.bg-library-page .library-stage>.bg-card {
  max-width:1100px
}
/* =========================================================
   V5 · continuidad entre columnas sin scroll horizontal
   ========================================================= */
/*
  No usamos un contenedor scrollable alrededor de las fichas: cuando un
  elemento activo es más ancho que su columna, overflow:auto convierte el
  desbordamiento horizontal en una barra de scroll. En jocarsa-iu el
  destacado debe poder atravesar el límite de la columna y cubrir el
  separador visualmente.
*/
.jocarsa-iu nav .contenido-columna, .jocarsa-iu section .contenido-columna, body.bg-library-page .library-nav .contenido-columna, body.bg-library-page .library-section .contenido-columna {
  overflow:visible !important;
  width:100%;
  min-width:0;
  align-items:stretch;
}
/* Las fichas normales ocupan siempre todo el ancho útil de su columna. */
.jocarsa-iu nav .contenido-columna > a, .jocarsa-iu section .contenido-columna > article, body.bg-library-page .library-nav .contenido-columna > a, body.bg-library-page .library-section .contenido-columna > a {
  width:100%;
  max-width:none;
  margin:0;
  flex:0 0 40px;
}
/* Hover y selección continúan físicamente hacia la columna siguiente. */
.jocarsa-iu nav .contenido-columna > a:hover, .jocarsa-iu section .contenido-columna > article:hover, body.bg-library-page .library-nav .contenido-columna > a:hover, body.bg-library-page .library-section .contenido-columna > a:hover {
  width:calc(100% + (var(--relleno) * .9));
  position:relative;
  z-index:9;
}
.jocarsa-iu nav .contenido-columna > a.activo, .jocarsa-iu section .contenido-columna > article.activo, body.bg-library-page .library-nav .contenido-columna > a.activo, body.bg-library-page .library-section .contenido-columna > a.activo {
  width:calc(100% + (var(--relleno) * 2));
  position:relative;
  z-index:10;
}
/* El separador queda por debajo del destacado, como en 010. */
.jocarsa-iu main .separador, body.bg-library-page main .separador {
  z-index:4
}
.jocarsa-iu nav, body.bg-library-page .library-nav {
  z-index:6
}
.jocarsa-iu section, body.bg-library-page .library-section {
  z-index:500
}
/* La columna central de las demos conserva exactamente la misma geometría
   que la columna central de index.html. */
body.bg-library-page .library-section {
  padding:var(--relleno);
  padding-left:3px;
}
body.bg-library-page .library-section .contenido-columna > a {
  padding:calc(var(--relleno) / 2);
  height:40px;
  min-height:40px;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  gap:calc(var(--relleno) / 2);
  background:var(--color3);
}
/* Contraído: conserva la misma continuidad visual hacia la columna siguiente. */
.jocarsa-iu nav.compacto .contenido-columna,
.jocarsa-iu section.compacto .contenido-columna {
  width:40px;
  align-items:center;
  overflow:visible !important;
}

/* Estado normal: la ficha permanece dentro de los 40px de la columna compacta. */
.jocarsa-iu nav.compacto .contenido-columna > a,
.jocarsa-iu section.compacto .contenido-columna > article {
  width:40px !important;
  min-width:40px;
  max-width:none;
  overflow:visible;
  position:relative;
}

/* Hover: sobresale ligeramente hacia la siguiente sección. */
.jocarsa-iu nav.compacto .contenido-columna > a:hover,
.jocarsa-iu section.compacto .contenido-columna > article:hover {
  width:calc(40px + (var(--relleno) * .9)) !important;
  z-index:9;
}

/* Activo: atraviesa el separador igual que en el estado desplegado. */
.jocarsa-iu nav.compacto .contenido-columna > a.activo,
.jocarsa-iu section.compacto .contenido-columna > article.activo {
  width:calc(50px + (var(--relleno) * 2)) !important;
  z-index:10;
}


/* =========================================================
   V6 · DRAWER DERECHO REDIMENSIONABLE + MODAL
   ========================================================= */
.bg-drawer-overlay{position:fixed;inset:54px 0 0 0;background:rgba(20,35,45,.12);z-index:70;opacity:0;pointer-events:none;transition:opacity .25s ease}
.bg-drawer-overlay.abierto{opacity:1;pointer-events:auto}
.bg-drawer{--drawer-width:440px;position:fixed;z-index:80;top:54px;right:0;bottom:0;width:var(--drawer-width);max-width:50vw;background:white;box-shadow:-18px 0 45px rgba(0,0,0,.18);transform:translateX(calc(100% + 20px));transition:transform .3s ease;display:flex;flex-direction:column;color:#172033}
.bg-drawer.abierto{transform:translateX(0)}
.bg-drawer-resizer{position:absolute;left:-7px;top:0;bottom:0;width:7px;background:var(--color0);cursor:col-resize;z-index:3;transition:background .2s}
.bg-drawer-resizer:hover{background:var(--color)}
.bg-drawer-header{height:auto;min-height:76px;flex:none;background:var(--color);padding:14px 16px;color:white;display:flex;align-items:center;justify-content:space-between;gap:12px}
.bg-drawer-header small{display:block;opacity:.7;font-weight:700;letter-spacing:.12em;margin-bottom:3px}
.bg-drawer-header h2{margin:0;font-size:20px}
.bg-drawer-close,.bg-modal-close{border:0;background:var(--color2);color:inherit;width:36px;height:36px;font-size:24px;cursor:pointer;flex:none}
.bg-drawer-body{padding:18px;overflow:auto;flex:1;min-height:0;background:var(--color3)}
.bg-drawer-body .bg-card{min-height:100%}
.bg-drawer-body .bg-form-grid{grid-template-columns:1fr}
.bg-drawer-body .bg-form-full{grid-column:auto}
.bg-drawer.bg-drawer-dos-columnas .bg-drawer-body .bg-form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.bg-drawer.bg-drawer-dos-columnas .bg-drawer-body .bg-form-full{grid-column:1/-1}
.bg-row-editable{cursor:pointer}
.bg-row-editable:hover{background:color-mix(in srgb,var(--color2) 35%,white)!important}
.bg-row-editable:after{content:""}
.bg-modal-layer{position:fixed;inset:0;z-index:120;display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .22s ease;padding:24px}
.bg-modal-layer.abierto{opacity:1;pointer-events:auto}
.bg-modal-backdrop{position:absolute;inset:0;background:rgba(8,18,24,.62);backdrop-filter:blur(2px)}
.bg-modal-window{position:relative;z-index:1;width:min(650px,calc(100vw - 48px));max-height:calc(100vh - 48px);background:white;box-shadow:0 28px 80px rgba(0,0,0,.3);clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);transform:translateY(16px) scale(.98);transition:transform .22s ease;overflow:hidden}
.bg-modal-layer.abierto .bg-modal-window{transform:none}
.bg-modal-header{height:auto;min-height:62px;background:var(--color);color:white;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
.bg-modal-header h2{margin:0;font-size:19px}
.bg-modal-body{padding:22px;max-height:calc(100vh - 120px);overflow:auto}
.bg-showcase-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:18px}
.bg-showcase-box{padding:18px;background:var(--color3);min-height:150px;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)}
.bg-showcase-box h3{margin-top:0}
body.redimensionando-drawer,body.redimensionando-drawer *{cursor:col-resize!important;user-select:none!important}
@media(max-width:700px){.bg-drawer{--drawer-width:50vw;max-width:50vw}.bg-showcase-grid{grid-template-columns:1fr}}


/* =========================================================
   V7 · compacto: fusionar visualmente con la sección derecha
   ========================================================= */
.jocarsa-iu nav.compacto .contenido-columna > a:hover,
.jocarsa-iu section.compacto .contenido-columna > article:hover,
.jocarsa-iu nav.compacto .contenido-columna > a.activo,
.jocarsa-iu section.compacto .contenido-columna > article.activo {
  transform:translateX(16px) !important;
}

/* =========================================================
   V8 · PEACH MINT + estética Habitica (incremental)
   ========================================================= */

/* Header: fondo peach suave con borde inferior mint */
header {
  background: linear-gradient(135deg, var(--peach-soft), var(--peach));
  color: #2e2a29;
  box-shadow: var(--sombra-peach);
}
header input, header button {
  background: rgba(255,255,255,.55);
  color: #2e2a29;
  border-radius: var(--radio);
}
header input::placeholder { color: #8a7d7a; }

/* Columnas laterales: mint suave, esquinas redondeadas hacia dentro */
nav, section {
  background: var(--color2);
  color: #2e2a29;
  border-radius: var(--radio) 0 0 var(--radio);
}
section { background: linear-gradient(180deg, var(--mint-soft), var(--color2)); }

/* Fichas tipo "avatar de personaje" (Habitica) */
.ficha {
  border-radius: 50% !important;      /* aquí SÍ círculo, es avatar */
  clip-path: none !important;
  box-shadow: inset 0 -3px 0 rgba(0,0,0,.08);
  font-size: 14px;
}
.contenido-columna a, .contenido-columna article {
  border-radius: var(--radio);
  clip-path: none;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.contenido-columna a:hover,
.contenido-columna article:hover {
  box-shadow: var(--sombra-mint);
  transform: translateX(4px);
}
.contenido-columna .activo {
  background: var(--mint) !important;
  color: #14332b !important;
  box-shadow: var(--sombra-mint);
}

/* Escenario: fondo crema con textura sutil */
.escenario {
  background:
    radial-gradient(circle at 12% 20%, rgba(200,243,228,.55), transparent 40%),
    radial-gradient(circle at 88% 80%, rgba(255,169,142,.35), transparent 45%),
    var(--color3);
}

/* Tarjetas y tablas */
.bg-card, table, .panel {
  border-radius: var(--radio);
  box-shadow: var(--sombra-peach);
  overflow: hidden;
}
caption {
  background: linear-gradient(90deg, var(--peach-soft), var(--mint-soft));
  color: #2e2a29;
  border-radius: var(--radio) var(--radio) 0 0;
}
thead { background: var(--mint); color: #14332b; }
tbody tr:hover { background: #fdf0ea; }

/* Botones */
.bg-btn {
  background: linear-gradient(135deg, var(--peach), #ff8e6b);
  color: #fff;
  border-radius: 999px;
  clip-path: none;
  box-shadow: var(--sombra-peach);
  transition: transform .15s ease, box-shadow .15s ease;
}
.bg-btn:hover { transform: translateY(-1px); box-shadow: 0 18px 40px rgba(255,142,107,.35); }
.bg-btn.secondary {
  background: var(--mint-soft);
  color: #14332b;
  box-shadow: var(--sombra-mint);
}

/* Toasts con acento peach/mint */
.bg-toast {
  border-radius: var(--radio);
  clip-path: none;
  box-shadow: 0 18px 40px rgba(46,42,41,.12);
}
.bg-toast:before { width: 6px; border-radius: 6px 0 0 6px; background: var(--mint); }
.bg-toast.is-success:before { background: var(--mint); }
.bg-toast.is-warning:before { background: var(--peach); }
.bg-toast.is-danger:before  { background: #e57373; }
.bg-toast-icon { background: var(--peach-soft); border-radius: 50%; }

/* Drawer y modal: mismo lenguaje */
.bg-drawer { background: var(--color3); }
.bg-drawer-header { background: linear-gradient(135deg, var(--peach), #ff8e6b); }
.bg-drawer-resizer { background: var(--mint); }
.bg-drawer-body { background: var(--color3); }
.bg-modal-window { border-radius: var(--radio); clip-path: none; }
.bg-modal-header { background: linear-gradient(135deg, var(--peach), #ff8e6b); }
.bg-modal-body { background: #fffdfb; }

/* =========================================================
   V8 · HUD Habitica + FAB IA + Panel IA
   ========================================================= */

/* HUD superior (stats del personaje) */
.bg-hud {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 16px;
  background: linear-gradient(90deg, var(--peach-soft), var(--mint-soft));
  border-bottom: 1px solid rgba(46,42,41,.06);
  font-size: 12px;
  color: #2e2a29;
}
.bg-hud-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--peach);
  display: grid; place-items: center;
  font-weight: 700; color: #fff;
  box-shadow: var(--sombra-peach);
}
.bg-hud-stat {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.6);
  padding: 4px 10px; border-radius: 999px;
}
.bg-hud-bar {
  position: relative; width: 140px; height: 10px;
  background: rgba(46,42,41,.08); border-radius: 999px; overflow: hidden;
}
.bg-hud-bar > span {
  position: absolute; inset: 0 auto 0 0;
  background: linear-gradient(90deg, var(--mint), var(--peach));
  border-radius: 999px; transition: width .5s ease;
}
.bg-hud-racha { color: #b45309; font-weight: 700; }

/* Botón flotante IA */
.bg-ia-fab {
  position: fixed; right: 24px; bottom: 24px; z-index: 90;
  width: 60px; height: 60px; border-radius: 50%;
  border: 0; cursor: pointer;
  background: linear-gradient(135deg, var(--peach), #ff8e6b);
  color: #fff; font-size: 22px;
  display: grid; place-items: center;
  box-shadow: 0 18px 40px rgba(255,142,107,.45);
  transition: transform .2s ease;
}
.bg-ia-fab:hover { transform: scale(1.06); }
.bg-ia-fab-label { display: none; }

/* Panel IA: chat popover encima del botón, cerrable */
.bg-ia-panel {
  position: fixed;
  z-index: 95;
  right: 24px;
  bottom: 96px;                     /* justo encima del FAB (24 + 60 + 12) */
  width: min(380px, calc(100vw - 48px));
  max-height: min(560px, calc(100vh - 160px));
  background: #fffdfb;
  box-shadow: -10px -10px 40px rgba(46,42,41,.14), 0 18px 40px rgba(46,42,41,.10);
  border-radius: var(--radio);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--mint);
  opacity: 0;
  transform: translateY(12px) scale(.98);
  pointer-events: none;
  transition: opacity .22s ease, transform .22s ease;
}
.bg-ia-panel.abierto {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.bg-ia-panel-header {
  padding: 14px 16px;
  display: flex; align-items: center; justify-content: space-between;
  background: linear-gradient(135deg, var(--mint), var(--mint-soft));
  color: #14332b;
  flex: none;
}
.bg-ia-panel-header h2 { margin: 0; font-size: 16px; }
.bg-ia-cerrar {
  border: 0; background: rgba(255,255,255,.5);
  width: 32px; height: 32px; border-radius: 50%;
  font-size: 20px; cursor: pointer; color: #14332b;
  display: grid; place-items: center;
}
.bg-ia-cerrar:hover { background: rgba(255,255,255,.9); }
.bg-ia-mensajes {
  flex: 1; overflow: auto; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
  min-height: 120px;
}
.bg-ia-msg { max-width: 85%; padding: 10px 14px; border-radius: 16px; line-height: 1.4; font-size: 13px; white-space: pre-wrap; }
.bg-ia-msg.bot  { background: var(--mint-soft); color: #14332b; align-self: flex-start; border-bottom-left-radius: 4px; }
.bg-ia-msg.user { background: var(--peach); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
.bg-ia-msg.error { background: #ffe1dd; color: #7a1f14; align-self: flex-start; }
.bg-ia-form {
  display: flex; gap: 8px; padding: 12px 16px;
  border-top: 1px solid rgba(46,42,41,.08); flex: none;
}
.bg-ia-form input {
  flex: 1; padding: 10px 14px; border: 1px solid #e5d8d3;
  border-radius: 999px; outline: none; font: inherit;
}
.bg-ia-form input:focus { border-color: var(--mint); }
.bg-ia-panel-footer {
  padding: 8px 16px; font-size: 11px; color: #8a7d7a;
  text-align: center; border-top: 1px solid rgba(46,42,41,.06);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  flex: none;
}
.bg-ia-panel-footer select {
  font: inherit; padding: 2px 6px; border-radius: 6px;
  border: 1px solid #e5d8d3; background: white; color: #2e2a29;
}



```
## data
**gamificacion.json**
```json
{
  "usuario": {
    "nombre": "Bryan Glot Fong",
    "clase": "Guerrero",
    "nivel": 7,
    "xp": 240,
    "xpSiguiente": 500,
    "hp": 42,
    "hpMax": 50,
    "oro": 128,
    "racha": 5
  },
  "misiones": [
    { "id": "m1", "titulo": "Alta de cliente", "xp": 20, "oro": 10, "completada": true },
    { "id": "m2", "titulo": "Revisar productos con stock 0", "xp": 35, "oro": 15, "completada": false },
    { "id": "m3", "titulo": "Exportar listado mensual", "xp": 50, "oro": 25, "completada": false }
  ]
}

```
## js
**gamificacion.js**
```js
/**
 * jocarsa.iu · PanelGamificacion
 * Carga data/gamificacion.json y pinta el HUD superior.
 */
window.jocarsa = window.jocarsa || {};
window.jocarsa.iu = window.jocarsa.iu || {};

(() => {
  "use strict";

  class PanelGamificacion {
    constructor() {
      this.hud = document.getElementById("juHud");
    }

    async iniciar() {
      if (!this.hud) return;
      try {
        const res = await fetch("data/gamificacion.json");
        if (!res.ok) throw new Error("gamificacion.json no encontrado");
        const data = await res.json();
        this.render(data.usuario);
      } catch (e) {
        // Fallback silencioso: no rompe la app si falta el JSON.
        console.warn("[jocarsa.iu] Gamificación no disponible:", e.message);
      }
    }

    render(u) {
      const pct = Math.min(100, Math.round((u.xp / u.xpSiguiente) * 100));
      this.hud.innerHTML = `
        <div class="ju-hud-avatar">${u.nombre.charAt(0)}</div>
        <strong>${u.nombre}</strong>
        <span class="ju-hud-stat">Nv. ${u.nivel}</span>
        <span class="ju-hud-stat">
          XP
          <span class="ju-hud-bar"><span style="width:${pct}%"></span></span>
          ${u.xp}/${u.xpSiguiente}
        </span>
        <span class="ju-hud-stat">❤ ${u.hp}/${u.hpMax}</span>
        <span class="ju-hud-stat">◈ ${u.oro}</span>
        <span class="ju-hud-stat ju-hud-racha">🔥 ${u.racha} días</span>
      `;
    }
  }

  window.jocarsa.iu.PanelGamificacion = PanelGamificacion;

  document.addEventListener("DOMContentLoaded", () => {
    window.jocarsa.iu.gamificacion = new PanelGamificacion();
    window.jocarsa.iu.gamificacion.iniciar();
  });
})();

```
**ia-bot.js**
```js
/**
 * bryanfghg.iu · BotIA
 * Modos: "simulado" (sin red) | "ollama" (habla con Ollama local)
 */
window.bryanfghg = window.bryanfghg || {};
window.bryanfghg.iu = window.bryanfghg.iu || {};

(() => {
  "use strict";

  class BotIA {
    constructor() {
      this.panel      = document.getElementById("juIaPanel");
      this.fab        = document.getElementById("juIaFab");
      this.cerrarBtn  = document.getElementById("juIaCerrar");
      this.mensajesEl = document.getElementById("juIaMensajes");
      this.form       = document.getElementById("juIaForm");
      this.input      = document.getElementById("juIaInput");
      this.estadoEl   = document.getElementById("juIaEstado");

      // Configuración
      this.modo      = "simulado";                          // "simulado" | "ollama"
      this.ollamaUrl = "http://localhost:11434/api/generate";
      this.modelo    = "phi3:mini";
      this.historial = [];                                  // [{role, content}, ...]

      this.respuestasSimuladas = [
        "Puedo ayudarte a crear un cliente nuevo. Pulsa «+ Nuevo» en la cabecera.",
        "Para exportar el listado, abre el menú contextual de la tabla (próximamente).",
        "Si un producto tiene stock 0, aparecerá resaltado en rojo suave.",
        "Recuerda: cada cliente nuevo te da 20 XP y 10 de oro.",
        "Estoy en modo simulado. Cuando me conectes a Ollama, responderé con tu modelo local."
      ];
      this.indiceRespuesta = 0;
    }

    iniciar() {
      if (!this.fab) return;

      this.fab.addEventListener("click", () => this.abrir());
      this.cerrarBtn.addEventListener("click", () => this.cerrar());

      // Cerrar con Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.cerrar();
      });

      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = this.input.value.trim();
        if (!texto) return;
        this.input.value = "";
        this.enviar(texto);
      });

      this.renderMensaje("bot", "¡Hola! Soy tu asistente bryanfghg. ¿En qué te ayudo?");
      this.actualizarEstado();
    }

    abrir() {
      this.panel.classList.add("abierto");
      this.panel.setAttribute("aria-hidden", "false");
      this.input.focus();
    }

    cerrar() {
      this.panel.classList.remove("abierto");
      this.panel.setAttribute("aria-hidden", "true");
    }

    renderMensaje(tipo, texto) {
      const msg = document.createElement("div");
      msg.className = `bg-ia-msg ${tipo}`;
      msg.textContent = texto;
      this.mensajesEl.appendChild(msg);
      this.mensajesEl.scrollTop = this.mensajesEl.scrollHeight;
      return msg;
    }

    actualizarEstado() {
      this.estadoEl.innerHTML = `
        Modo:
        <select id="bgIaModo">
          <option value="simulado"${this.modo === "simulado" ? " selected" : ""}>Simulado</option>
          <option value="ollama"${this.modo === "ollama" ? " selected" : ""}>Ollama local</option>
        </select>
        · ${this.modo === "ollama" ? this.modelo : "sin red"}
      `;
      document.getElementById("bgIaModo").addEventListener("change", (e) => {
        this.modo = e.target.value;
        this.actualizarEstado();
        this.renderMensaje("bot", this.modo === "ollama"
          ? `Modo Ollama activado. Modelo: ${this.modelo}. Asegúrate de que Ollama está corriendo en ${this.ollamaUrl}.`
          : "Modo simulado activado. No se hará ninguna petición de red.");
      });
    }

    async enviar(texto) {
      this.renderMensaje("user", texto);
      this.historial.push({ role: "user", content: texto });

      const typing = this.renderMensaje("bot", "…");

      try {
        const respuesta = await this.responder(texto);
        typing.remove();
        this.renderMensaje("bot", respuesta);
        this.historial.push({ role: "assistant", content: respuesta });
      } catch (err) {
        typing.remove();
        this.renderMensaje("error", "⚠ " + err.message);
      }
    }

    async responder(pregunta) {
      if (this.modo === "ollama") {
        return await this.consultarOllama(pregunta);
      }
      return await this.responderSimulado(pregunta);
    }

    responderSimulado(pregunta) {
      const r = this.respuestasSimuladas[this.indiceRespuesta % this.respuestasSimuladas.length];
      this.indiceRespuesta++;
      return new Promise((resolve) => setTimeout(() => resolve(r), 400 + Math.random() * 300));
    }

    /**
     * CONEXIÓN REAL con Ollama.
     * Endpoint: POST http://localhost:11434/api/generate
     * Body: { model, prompt, stream: false, context: [...] }
     * Respuesta: { response: "..." }
     */
    async consultarOllama(pregunta) {
      // Construimos un prompt con historial para dar contexto al modelo.
      const contexto = this.historial
        .slice(-6) // últimos 3 turnos (user+assistant)
        .map((m) => `${m.role === "user" ? "Usuario" : "Asistente"}: ${m.content}`)
        .join("\n");

      const prompt = [
        "Eres un asistente útil integrado en la interfaz bryanfghg.iu.",
        "Responde en español, de forma breve y clara.",
        "",
        "Historial reciente:",
        contexto,
        "",
        `Pregunta actual: ${pregunta}`
      ].join("\n");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s

      let res;
      try {
        res = await fetch(this.ollamaUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: this.modelo,
            prompt,
            stream: false
          }),
          signal: controller.signal
        });
      } catch (e) {
        clearTimeout(timeoutId);
        if (e.name === "AbortError") {
          throw new Error("Ollama tardó demasiado en responder (>60s).");
        }
        throw new Error(
          "No puedo conectar con Ollama. ¿Está corriendo?\n" +
          "Arranca: `ollama serve`\n" +
          "Comprueba el modelo: `ollama pull " + this.modelo + "`\n" +
          "URL: " + this.ollamaUrl
        );
      }
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Ollama respondió ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (!data.response) {
        throw new Error("Ollama devolvió una respuesta vacía.");
      }
      return data.response.trim();
    }
  }

  window.bryanfghg.iu.BotIA = BotIA;

  document.addEventListener("DOMContentLoaded", () => {
    window.bryanfghg.iu.bot = new BotIA();
    window.bryanfghg.iu.bot.iniciar();
  });
})();

```