/**
 * bryanfghg.iu · FichaUsuario
 * Popover con datos del usuario (simulados) + info de desarrollo con hash.
 */
window.bryanfghg = window.bryanfghg || {};
window.bryanfghg.iu = window.bryanfghg.iu || {};

(() => {
  "use strict";

  class FichaUsuario {
    constructor() {
      this.panel    = document.getElementById("bgUserPanel");
      this.cuerpo   = document.getElementById("bgUserPanelBody");
      this.cerrarBtn = document.getElementById("bgUserCerrar");
      this.triggerNombre = document.getElementById("nombre-de-usuario");
      this.triggerAvatar = document.getElementById("avatar-usuario");

      // Datos simulados. En el futuro: fetch a data/usuario.json o endpoint real.
      this.usuario = {
        nombre:    "Bryan",
        apellidos: "Glot Fong",
        email:     "bryan@bryanfghg.dev",
        telefono:  "+34 600 123 456",
        empresa:   "bryanfghg Studio",
        hashId:    "bg-u-9f3a-7c21-4e8d-0b65-2026"
      };
    }

    iniciar() {
      if (!this.panel) return;

      // Abrir con nombre o avatar
      this.triggerNombre?.addEventListener("click", () => this.alternar());
      this.triggerAvatar?.addEventListener("click", () => this.alternar());
      [this.triggerNombre, this.triggerAvatar].forEach(el => {
        el?.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.alternar(); }
        });
      });

      // Cerrar con ×, Escape o clic fuera
      this.cerrarBtn.addEventListener("click", () => this.cerrar());
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") this.cerrar(); });
      document.addEventListener("click", (e) => {
        if (!this.panel.classList.contains("oculto")
            && !this.panel.contains(e.target)
            && !this.triggerNombre?.contains(e.target)
            && !this.triggerAvatar?.contains(e.target)) {
          this.cerrar();
        }
      });

      this.render();
    }

    alternar() {
      if (this.panel.classList.contains("oculto")) this.abrir();
      else this.cerrar();
    }
    abrir() { this.panel.classList.remove("oculto"); this.panel.setAttribute("aria-hidden","false"); }
    cerrar() { this.panel.classList.add("oculto"); this.panel.setAttribute("aria-hidden","true"); }

    render() {
      const u = this.usuario;
      this.cuerpo.innerHTML = `
        <div class="bg-user-avatar">${u.nombre.charAt(0)}</div>
        <div class="bg-user-campo"><strong>Nombre</strong><span>${u.nombre}</span></div>
        <div class="bg-user-campo"><strong>Apellidos</strong><span>${u.apellidos}</span></div>
        <div class="bg-user-campo"><strong>Email</strong><span>${u.email}</span></div>
        <div class="bg-user-campo"><strong>Teléfono</strong><span>${u.telefono}</span></div>
        <div class="bg-user-campo"><strong>Empresa</strong><span>${u.empresa}</span></div>
        <div class="bg-user-actions">
          <button class="bg-user-dev-btn" id="bgUserDevBtn" type="button">ℹ desarrollo</button>
        </div>
      `;

      document.getElementById("bgUserDevBtn").addEventListener("click", () => this.abrirInfoDesarrollo());
    }

    abrirInfoDesarrollo() {
      const u = this.usuario;
      const html = `
        <div style="display:flex;gap:10px;align-items:flex-start">
          <div style="font-size:28px;line-height:1">⚠️</div>
          <p style="margin:0">
            <strong>Solo acceder si necesitas ayuda, cambios de sistema o cualquier incidencia.</strong><br>
            Este código identifica de forma única a tu cuenta. No lo compartas.
          </p>
        </div>
        <div class="bg-hash-box">
          <span class="bg-hash-label">ID de seguridad único</span>
          ${u.hashId}
        </div>
        <div class="bg-button-row" style="margin-top:14px">
          <button class="bg-btn" id="bgUserDevOk" type="button">Entendido</button>
        </div>
      `;

      // Reutilizamos el ModalIU de componentes.js si está listo.
      const modal = window.bryanfghg?.iu?.aplicacion?.modal;
      if (modal && typeof modal.abrir === "function") {
        modal.abrir("Información de desarrollo", html);
        document.getElementById("bgUserDevOk")?.addEventListener("click", () => modal.cerrar());
        return;
      }

      // Fallback: si por lo que sea el modal no está, usamos uno nativo.
      window.alert(
        "Solo acceder si necesitas ayuda, cambios de sistema o cualquier incidencia.\n\n" +
        "ID de seguridad único: " + u.hashId
      );
    }
  }

  window.bryanfghg.iu.FichaUsuario = FichaUsuario;

  document.addEventListener("DOMContentLoaded", () => {
    window.bryanfghg.iu.fichaUsuario = new FichaUsuario();
    window.bryanfghg.iu.fichaUsuario.iniciar();
  });
})();
