/**
 * bryanfghg.iu · Control principal de la interfaz (POO)
 */
window.bryanfghg = window.bryanfghg || {};
window.bryanfghg.iu = window.bryanfghg.iu || {};

(() => {
  "use strict";

  class DOM {
    static uno(sel, ctx = document) { return ctx.querySelector(sel); }
    static todos(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }
  }

  class Utilidades {
    static hashTexto(t) {
      let h = 0;
      for (const c of t) h = c.charCodeAt(0) + ((h << 5) - h);
      return Math.abs(h);
    }
    static colorTexto(t) { return `hsl(${Utilidades.hashTexto(t) % 360},55%,45%)`; }
  }

  class OrigenDatos {
    static async cargarJSON(url) {
      const r = await fetch(url);
      if (!r.ok) throw new Error(url);
      return r.json();
    }
  }

  class EstadoIU {
    constructor() {
      this.menu = [];
      this.entidades = [];
      this.clientes = null;
      this.formulario = null;
      this.seleccion = "Listado";
    }
  }

  class FichaIU {
    static completar(el, texto) {
      const f = DOM.uno(".ficha", el);
      const e = DOM.uno(".etiqueta", el);
      f.textContent = texto.charAt(0).toUpperCase();
      f.style.background = Utilidades.colorTexto(texto);
      e.textContent = texto;
    }
  }

  class ToastIU {
    constructor(sel = "#toastStack") {
      this.sel = sel;
      this.iconos = { success: "✓", info: "i", warning: "!", danger: "×" };
    }
    obtenerPila() {
      let p = DOM.uno(this.sel);
      if (!p) {
        p = document.createElement("div");
        p.id = this.sel.replace(/^#/, "");
        p.className = "bg-toast-stack";
        document.body.appendChild(p);
      }
      return p;
    }
    mostrar(tipo = "info", titulo = "Información", texto = "Operación realizada") {
      const pila = this.obtenerPila();
      const t = document.createElement("article");
      t.className = `bg-toast is-${tipo}`;
      t.innerHTML = `
        <div class="bg-toast-icon">${this.iconos[tipo] || "i"}</div>
        <div>
          <p class="bg-toast-title">${titulo}</p>
          <p class="bg-toast-text">${texto}</p>
        </div>
        <button class="bg-toast-close" type="button">×</button>
      `;
      const cerrar = () => {
        t.classList.add("is-leaving");
        setTimeout(() => t.remove(), 240);
      };
      DOM.uno("button", t).addEventListener("click", cerrar);
      pila.appendChild(t);
      setTimeout(cerrar, 5000);
    }
  }

  class ModalIU {
    constructor() {
      this.capa = DOM.uno("#juModal");
      this.titulo = DOM.uno("#juModalTitle");
      this.cuerpo = DOM.uno("#juModalBody");
      DOM.todos("[data-modal-close]", this.capa)
        .forEach(n => n.addEventListener("click", () => this.cerrar()));
    }
    abrir(titulo, contenido) {
      this.titulo.textContent = titulo;
      this.cuerpo.innerHTML = contenido;
      this.capa.classList.add("abierto");
      this.capa.setAttribute("aria-hidden", "false");
    }
    cerrar() {
      this.capa.classList.remove("abierto");
      this.capa.setAttribute("aria-hidden", "true");
    }
  }

  class DrawerIU {
    constructor(app) {
      this.app = app;
      this.panel = DOM.uno("#juDrawer");
      this.overlay = DOM.uno("#juDrawerOverlay");
      this.cuerpo = DOM.uno("#juDrawerBody");
      this.modo = DOM.uno("#juDrawerMode");
      this.titulo = DOM.uno("#juDrawerTitle");
      this.resizer = DOM.uno("#juDrawerResizer");
      this.anchoMinimo = 300;
      this.anchoMaximo = () => Math.max(this.anchoMinimo, window.innerWidth * 0.5);

      DOM.uno("#juDrawerClose").addEventListener("click", () => this.cerrar());
      this.overlay.addEventListener("click", () => this.cerrar());
      this.resizer.addEventListener("pointerdown", e => this.iniciarRedimension(e));
      window.addEventListener("resize", () => this.ajustarAlViewport());
      this.actualizarColumnasFormulario();
    }

    abrirCrear() { this.renderFormulario("create", null); }
    abrirActualizar(reg) { this.renderFormulario("update", reg); }

    renderFormulario(modo, registro) {
      const esCrear = modo === "create";
      this.modo.textContent = esCrear ? "CREAR" : "ACTUALIZAR";
      this.titulo.textContent = esCrear ? "Nuevo cliente" : `Editar ${registro.nombre || "registro"}`;
      const campos = this.app.estado.formulario.campos;

      this.cuerpo.innerHTML = `
        <article class="bg-card">
          <form id="bgDrawerForm" class="bg-form-grid">
            ${campos.map(c => this.campoHTML(c, registro)).join("")}
            <div class="bg-form-full bg-button-row">
              <button class="bg-btn" type="submit">${esCrear ? "Crear" : "Guardar cambios"}</button>
              <button class="bg-btn secondary" type="button" id="bgDrawerCancel">Cancelar</button>
            </div>
          </form>
        </article>`;

      DOM.uno("#bgDrawerCancel").addEventListener("click", () => this.cerrar());

      DOM.uno("#bgDrawerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const nuevo = {};
        campos.forEach(c => {
          if (c.tipo === "checkbox") nuevo[c.nombre] = fd.has(c.nombre);
          else if (c.tipo === "number") nuevo[c.nombre] = fd.get(c.nombre) === "" ? "" : Number(fd.get(c.nombre));
          else nuevo[c.nombre] = fd.get(c.nombre) ?? "";
        });

        if (esCrear) {
          const ids = this.app.estado.clientes.registros.map(r => Number(r.id) || 0);
          if (!nuevo.id) nuevo.id = Math.max(0, ...ids) + 1;
          this.app.estado.clientes.registros.push(nuevo);
          this.app.toast.mostrar("success", "Cliente creado", "El nuevo registro se ha añadido a la tabla.");
        } else {
          Object.assign(registro, nuevo);
          this.app.toast.mostrar("success", "Cliente actualizado", "Los cambios se muestran inmediatamente en la tabla.");
        }

        // Hook de gamificación (opcional): +20 XP / +10 oro al crear
        if (esCrear && window.bryanfghg?.iu?.gamificacion?.recompensar) {
          window.bryanfghg.iu.gamificacion.recompensar(20, 10, "Cliente creado");
        }

        this.app.mostrarTabla(DOM.uno("#buscador").value);
        this.cerrar();
      });

      this.ajustarAlViewport();
      this.actualizarColumnasFormulario();
      this.panel.classList.add("abierto");
      this.overlay.classList.add("abierto");
      this.panel.setAttribute("aria-hidden", "false");
      this.overlay.setAttribute("aria-hidden", "false");
      setTimeout(() => DOM.uno("input,select,textarea", this.cuerpo)?.focus(), 320);
    }

    campoHTML(c, reg) {
      const v = reg?.[c.nombre] ?? "";
      const esc = s => String(s).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
      if (c.tipo === "textarea")
        return `<label class="bg-form-full"><span>${c.etiqueta}</span><textarea name="${c.nombre}">${esc(v)}</textarea></label>`;
      if (c.tipo === "select")
        return `<label><span>${c.etiqueta}</span><select name="${c.nombre}">${(c.opciones || []).map(o => `<option${o === v ? " selected" : ""}>${o}</option>`).join("")}</select></label>`;
      if (c.tipo === "checkbox")
        return `<label class="bg-check bg-form-full"><input type="checkbox" name="${c.nombre}"${v ? " checked" : ""}><span>${c.etiqueta}</span></label>`;
      return `<label><span>${c.etiqueta}</span><input name="${c.nombre}" type="${c.tipo || "text"}" value="${esc(v)}"${c.nombre === "id" ? ' min="1"' : ""}></label>`;
    }

    cerrar() {
      this.panel.classList.remove("abierto");
      this.overlay.classList.remove("abierto");
      this.panel.setAttribute("aria-hidden", "true");
      this.overlay.setAttribute("aria-hidden", "true");
    }

    iniciarRedimension(e) {
      e.preventDefault();
      const inicio = e.clientX, anchoInicial = this.panel.getBoundingClientRect().width;
      this.resizer.setPointerCapture(e.pointerId);
      document.body.classList.add("redimensionando-drawer");
      this.panel.style.transition = "none";

      const mover = ev => {
        const w = Math.min(this.anchoMaximo(), Math.max(this.anchoMinimo, anchoInicial + (inicio - ev.clientX)));
        this.panel.style.setProperty("--drawer-width", `${w}px`);
        this.actualizarColumnasFormulario(w);
      };
      const fin = () => {
        this.resizer.removeEventListener("pointermove", mover);
        this.panel.style.transition = "";
        document.body.classList.remove("redimensionando-drawer");
      };
      this.resizer.addEventListener("pointermove", mover);
      this.resizer.addEventListener("pointerup", fin, { once: true });
      this.resizer.addEventListener("pointercancel", fin, { once: true });
    }

    actualizarColumnasFormulario(ancho = this.panel.getBoundingClientRect().width) {
      this.panel.classList.toggle("bg-drawer-dos-columnas", ancho > window.innerWidth * 0.25);
    }

    ajustarAlViewport() {
      const actual = this.panel.getBoundingClientRect().width;
      const max = this.anchoMaximo();
      if (actual > max) {
        this.panel.style.setProperty("--drawer-width", `${max}px`);
        this.actualizarColumnasFormulario(max);
      } else {
        this.actualizarColumnasFormulario(actual);
      }
    }
  }

  class GestorColumnas {
    constructor() { this.anchoMinimo = 100; this.anchoMaximo = 600; }
    activar() { this.activarMinimizacion(); this.activarSeparadores(); }

    activarMinimizacion() {
      DOM.todos(".minimizar").forEach(btn => {
        const col = btn.closest("nav,section");
        col.dataset.ancho = col.getBoundingClientRect().width;
        btn.addEventListener("click", () => this.alternarColumna(col, btn));
      });
    }

    alternarColumna(col, btn) {
      if (col.classList.contains("compacto")) {
        const w = parseFloat(col.dataset.ancho) || 250;
        col.classList.remove("compacto");
        col.style.flexBasis = `${w}px`;
        col.style.width = `${w}px`;
        btn.textContent = "◀";
        return;
      }
      col.dataset.ancho = col.getBoundingClientRect().width;
      col.style.flexBasis = `${col.dataset.ancho}px`;
      col.style.width = `${col.dataset.ancho}px`;
      void col.offsetWidth;
      col.classList.add("compacto");
      btn.textContent = "▶";
    }

    activarSeparadores() {
      DOM.todos(".separador").forEach(sep => {
        sep.addEventListener("pointerdown", e => this.iniciarRedimension(sep, e));
      });
    }

    iniciarRedimension(sep, e) {
      e.preventDefault();
      const col = sep.previousElementSibling;
      if (!col || col.classList.contains("compacto")) return;
      const inicio = e.clientX, anchoInicial = col.getBoundingClientRect().width;
      col.style.transition = "none";
      document.body.classList.add("redimensionando");
      sep.setPointerCapture(e.pointerId);

      const mover = ev => {
        const w = Math.min(this.anchoMaximo, Math.max(this.anchoMinimo, anchoInicial + ev.clientX - inicio));
        col.style.width = `${w}px`;
        col.style.flexBasis = `${w}px`;
        col.dataset.ancho = w;
      };
      const fin = () => {
        sep.removeEventListener("pointermove", mover);
        col.style.transition = "";
        document.body.classList.remove("redimensionando");
      };
      sep.addEventListener("pointermove", mover);
      sep.addEventListener("pointerup", fin, { once: true });
      sep.addEventListener("pointercancel", fin, { once: true });
    }
  }

  class AplicacionIU {
    constructor() {
      this.estado = new EstadoIU();
      this.toast = new ToastIU();
      this.columnas = new GestorColumnas();
      this.modal = null;
      this.drawer = null;
    }

    async iniciar() {
      try {
        [this.estado.menu, this.estado.entidades, this.estado.clientes, this.estado.formulario] =
          await Promise.all([
            OrigenDatos.cargarJSON("data/menu.json"),
            OrigenDatos.cargarJSON("data/entidades.json"),
            OrigenDatos.cargarJSON("data/clientes.json"),
            OrigenDatos.cargarJSON("data/datos.json"),
          ]);

        this.modal = new ModalIU();
        this.drawer = new DrawerIU(this);
        this.renderMenu();
        this.renderEntidades();
        this.mostrarTabla();
        this.columnas.activar();
        this.activarEventos();
      } catch (err) {
        DOM.uno("#escenario").innerHTML = `
          <div class="panel">
            <h2>No se pudieron cargar los orígenes de datos</h2>
            <p>Sirve esta carpeta por HTTP, por ejemplo: <code>python3 -m http.server 8000</code></p>
            <pre>${err}</pre>
          </div>`;
      }
    }

    renderMenu() {
      const cont = DOM.uno("#navegacion .contenido-columna");
      cont.innerHTML = "";
      this.estado.menu.forEach((el, i) => {
        const nodo = DOM.uno("#tpl-nav").content.cloneNode(true);
        const a = DOM.uno("a", nodo);
        FichaIU.completar(a, el.texto);
        a.classList.toggle("activo", Boolean(el.activo));
        a.dataset.indice = i;
        a.addEventListener("click", ev => {
          ev.preventDefault();
          DOM.todos("#navegacion a").forEach(x => x.classList.remove("activo"));
          a.classList.add("activo");
          this.mostrarTabla();
        });
        cont.appendChild(nodo);
      });
    }

    renderEntidades() {
      const cont = DOM.uno("#entidades .contenido-columna");
      cont.innerHTML = "";
      this.estado.entidades.forEach((el, i) => {
        const nodo = DOM.uno("#tpl-card").content.cloneNode(true);
        const art = DOM.uno("article", nodo);
        FichaIU.completar(art, el.texto);
        art.classList.toggle("activo", el.texto === this.estado.seleccion);
        art.dataset.indice = i;
        art.addEventListener("click", () => {
          this.estado.seleccion = el.texto;
          this.renderEntidades();
          this.mostrarVista(el.texto);
        });
        art.addEventListener("dragstart", ev => {
          ev.dataTransfer.setData("text/plain", el.texto);
        });
        cont.appendChild(nodo);
      });
    }

    mostrarVista(vista) {
      if (vista === "Elemento" || vista === "Formulario") this.mostrarFormularioUI();
      else if (vista === "Login") this.mostrarLoginDemo();
      else if (vista === "Toasts") this.mostrarToastsDemo();
      else if (vista === "Modal / paneles") this.mostrarModalPanelesDemo();
      else this.mostrarTabla();
    }

    mostrarTabla(filtro = "") {
      const datos = this.estado.clientes;
      const regs = datos.registros.filter(r =>
        Object.values(r).join(" ").toLowerCase().includes(filtro.toLowerCase())
      );
      const esc = DOM.uno("#escenario");
      const tabla = document.createElement("table");
      esc.innerHTML = "";
      tabla.innerHTML = `
        <caption>${datos.titulo}</caption>
        <thead><tr>${datos.columnas.map(c => `<th>${c.etiqueta}</th>`).join("")}</tr></thead>
        <tbody></tbody>
        <tfoot><tr>
          <th colspan="${Math.max(1, datos.columnas.length - 1)}">Total</th>
          <td>${regs.length}</td>
        </tr></tfoot>`;
      const cuerpo = DOM.uno("tbody", tabla);
      regs.forEach(r => {
        const fila = DOM.uno("#tpl-fila").content.cloneNode(true).querySelector("tr");
        datos.columnas.forEach(c => {
          const td = document.createElement("td");
          td.textContent = r[c.campo] ?? "";
          fila.appendChild(td);
        });
        fila.classList.add("bg-row-editable");
        fila.title = "Clic para editar en el panel lateral";
        fila.addEventListener("click", () => this.drawer.abrirActualizar(r));
        cuerpo.appendChild(fila);
      });
      esc.appendChild(tabla);
    }

    mostrarFormularioUI() {
      const esc = DOM.uno("#escenario");
      esc.innerHTML = `
        <article class="bg-card">
          <h2>Librería · Formularios</h2>
          <p>Controles reutilizables con el lenguaje visual bryanfghg.iu.</p>
          <form id="bgDemoForm" class="bg-form-grid">
            <label><span>Nombre</span><input name="nombre" required></label>
            <label><span>Email</span><input name="email" type="email" required></label>
            <label><span>Tipo</span><select name="tipo"><option>Cliente</option><option>Proveedor</option><option>Alumno</option></select></label>
            <label><span>Fecha</span><input name="fecha" type="date"></label>
            <label class="bg-form-full"><span>Descripción</span><textarea name="descripcion"></textarea></label>
            <label class="bg-check bg-form-full"><input type="checkbox" name="activo"><span>Registro activo</span></label>
            <div class="bg-form-full bg-button-row">
              <button class="bg-btn" type="submit">Guardar</button>
              <button class="bg-btn secondary" type="reset">Limpiar</button>
            </div>
          </form>
        </article>`;
      DOM.uno("#bgDemoForm").addEventListener("submit", ev => {
        ev.preventDefault();
        this.toast.mostrar("success", "Formulario guardado", "El evento submit se ha capturado correctamente.");
      });
    }

    mostrarLoginDemo() {
      const esc = DOM.uno("#escenario");
      esc.innerHTML = `
        <div class="bg-login-layout" style="margin:auto">
          <article class="bg-login-side">
            <div class="bg-login-brand">
              <img src="https://static.jocarsa.com/logos/white.svg" alt="">
              <h1 class="bg-login-product-title">bryanfghg | interfaz integrada</h1>
              <p>Pantalla de acceso basada en bryanfghg.iu.</p>
            </div>
          </article>
          <article class="bg-login-card">
            <h2>Iniciar sesión</h2>
            <form id="bgLoginDemo" class="bg-form-grid">
              <label class="bg-form-full"><span>Email</span><input type="email" required></label>
              <label class="bg-form-full"><span>Contraseña</span><input type="password" required></label>
              <label class="bg-check bg-form-full"><input type="checkbox"><span>Mantener sesión</span></label>
              <div class="bg-form-full bg-login-actions">
                <button class="bg-btn">Entrar</button>
                <a class="bg-text-link" href="login.html">Abrir pantalla completa</a>
              </div>
            </form>
          </article>
        </div>`;
      DOM.uno("#bgLoginDemo").addEventListener("submit", ev => {
        ev.preventDefault();
        this.toast.mostrar("success", "Acceso simulado", "Login capturado como componente reutilizable.");
      });
    }

    mostrarToastsDemo() {
      const esc = DOM.uno("#escenario");
      esc.innerHTML = `
        <article class="bg-card">
          <h2>Librería · Toasts</h2>
          <p>Mensajes emergentes reutilizables con autocierre y cierre manual.</p>
          <div class="bg-button-row">
            <button class="bg-btn" data-t="success">Éxito</button>
            <button class="bg-btn secondary" data-t="info">Información</button>
            <button class="bg-btn secondary" data-t="warning">Aviso</button>
            <button class="bg-btn secondary" data-t="danger">Error</button>
          </div>
        </article>`;
      const titulos = { success: "Correcto", info: "Información", warning: "Revisar", danger: "Error" };
      DOM.todos("[data-t]", esc).forEach(b => {
        b.addEventListener("click", () => {
          this.toast.mostrar(b.dataset.t, titulos[b.dataset.t], "Ejemplo de mensaje emergente de la librería.");
        });
      });
    }

    mostrarModalPanelesDemo() {
      const esc = DOM.uno("#escenario");
      esc.innerHTML = `
        <article class="bg-card">
          <h2>Librería · Modal y panel lateral</h2>
          <p>Dos patrones reutilizables para acciones que no deben sustituir el contenido del escenario.</p>
          <div class="bg-showcase-grid">
            <div class="bg-showcase-box">
              <h3>Ventana modal</h3>
              <p>Bloquea temporalmente la interfaz para confirmaciones, avisos o contenido focal.</p>
              <button class="bg-btn" id="bgDemoModal">Abrir modal</button>
            </div>
            <div class="bg-showcase-box">
              <h3>Panel lateral</h3>
              <p>Entra desde la derecha y puede redimensionarse arrastrando su borde izquierdo.</p>
              <button class="bg-btn" id="bgDemoDrawer">Abrir panel de creación</button>
            </div>
          </div>
        </article>`;
      DOM.uno("#bgDemoModal").addEventListener("click", () => {
        this.modal.abrir("Ejemplo de ventana modal", `
          <p>Esta es la nueva ventana modal reutilizable de <strong>bryanfghg.iu</strong>.</p>
          <p>Se puede cerrar con el botón ×, haciendo clic fuera o pulsando Escape.</p>
          <div class="bg-button-row"><button class="bg-btn" id="bgModalAceptar">Aceptar</button></div>`);
        DOM.uno("#bgModalAceptar").addEventListener("click", () => this.modal.cerrar());
      });
      DOM.uno("#bgDemoDrawer").addEventListener("click", () => this.drawer.abrirCrear());
    }

    activarEventos() {
      DOM.uno("#buscador").addEventListener("input", ev => {
        this.mostrarTabla(ev.target.value);
      });
      DOM.uno("#nuevo").addEventListener("click", () => this.drawer.abrirCrear());

      const esc = DOM.uno("#escenario");
      esc.addEventListener("dragover", ev => {
        ev.preventDefault();
        esc.classList.add("drag-over");
      });
      esc.addEventListener("dragleave", () => esc.classList.remove("drag-over"));
      esc.addEventListener("drop", ev => {
        ev.preventDefault();
        esc.classList.remove("drag-over");
        const vista = ev.dataTransfer.getData("text/plain");
        this.estado.seleccion = vista;
        this.renderEntidades();
        this.mostrarVista(vista);
      });

      document.addEventListener("keydown", ev => {
        if (ev.key === "Escape") {
          this.drawer?.cerrar();
          this.modal?.cerrar();
        }
      });

      DOM.uno("#filtros").addEventListener("click", () => {
        // Simulado: imprime en consola lo que haría el filtro
        console.log("[bryanfghg.iu] Filtros pulsados → abriría el panel de filtros");
        console.log("  · Vista actual:", this.estado.seleccion);
        console.log("  · Filtro de búsqueda:", DOM.uno("#buscador").value || "(vacío)");
        console.log("  · Columnas disponibles:", this.estado.clientes.columnas.map(c => c.etiqueta));
        this.toast.mostrar("info", "Filtros", "Panel de filtros en construcción (ver consola).");
      });      
    }
  }

  window.bryanfghg.iu.DOM = DOM;
  window.bryanfghg.iu.Utilidades = Utilidades;
  window.bryanfghg.iu.OrigenDatos = OrigenDatos;
  window.bryanfghg.iu.EstadoIU = EstadoIU;
  window.bryanfghg.iu.FichaIU = FichaIU;
  window.bryanfghg.iu.ToastIU = ToastIU;
  window.bryanfghg.iu.ModalIU = ModalIU;
  window.bryanfghg.iu.DrawerIU = DrawerIU;
  window.bryanfghg.iu.GestorColumnas = GestorColumnas;
  window.bryanfghg.iu.AplicacionIU = AplicacionIU;

  document.addEventListener("DOMContentLoaded", () => {
    window.bryanfghg.iu.aplicacion = new AplicacionIU();
    window.bryanfghg.iu.aplicacion.iniciar();
  });
})();
