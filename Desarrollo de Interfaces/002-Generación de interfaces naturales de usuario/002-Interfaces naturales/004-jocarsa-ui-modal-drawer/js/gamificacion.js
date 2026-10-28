window.bryanfghg = window.bryanfghg || {};
window.bryanfghg.iu = window.bryanfghg.iu || {};

(() => {
  "use strict";

  class PanelGamificacion {
    constructor() {
      this.hud = document.getElementById("juHud");
      this.trigger = document.getElementById("nombre-de-usuario");
      this.datos = null;
    }

    async iniciar() {
      if (!this.hud) return;

      if (this.trigger) {
        this.trigger.addEventListener("click", () => this.alternar());
        this.trigger.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.alternar(); }
        });
      }

      document.addEventListener("keydown", (e) => { if (e.key === "Escape") this.cerrar(); });
      document.addEventListener("click", (e) => {
        if (!this.hud.classList.contains("oculto") && !this.hud.contains(e.target) && !this.trigger?.contains(e.target)) this.cerrar();
      });

      // ESCUCHADOR GLOBAL: Recibe eventos de recompensa desde cualquier parte de la app (Drawer, etc.)
      window.addEventListener('gamificacion:recompensa', (e) => {
        const { xp, oro, motivo } = e.detail;
        this.recompensar(xp, oro, motivo);
      });

      try {
        const res = await fetch("data/gamificacion.json");
        if (!res.ok) throw new Error("gamificacion.json no encontrado");
        this.datos = await res.json();
        this.render();
      } catch (e) { console.warn("[bryanfghg.iu] Gamificación no disponible:", e.message); }
    }

    alternar() { this.hud.classList.contains("oculto") ? this.abrir() : this.cerrar(); }
    abrir() { this.hud.classList.remove("oculto"); this.hud.setAttribute("aria-hidden", "false"); }
    cerrar() { this.hud.classList.add("oculto"); this.hud.setAttribute("aria-hidden", "true"); }

    render() {
      if (!this.datos) return;
      const u = this.datos.usuario;
      const pct = Math.min(100, Math.round((u.xp / u.xpSiguiente) * 100));
      this.hud.innerHTML = `
        <div class="bg-hud-avatar">${u.nombre.charAt(0)}</div>
        <strong>${u.nombre}</strong>
        <span class="bg-hud-stat">Nv. ${u.nivel}</span>
        <span class="bg-hud-stat">XP <span class="bg-hud-bar"><span style="width:${pct}%"></span></span>${u.xp}/${u.xpSiguiente}</span>
        <span class="bg-hud-stat">❤ ${u.hp}/${u.hpMax}</span>
        <span class="bg-hud-stat">◈ ${u.oro}</span>
        <span class="bg-hud-stat bg-hud-racha">🔥 ${u.racha} días</span>
      `;
    }

    recompensar(xp, oro, motivo) {
      if (!this.datos) return;
      const u = this.datos.usuario;
      u.xp += xp; u.oro += oro;
      
      while (u.xp >= u.xpSiguiente) {
        u.xp -= u.xpSiguiente; u.nivel += 1; u.xpSiguiente = Math.round(u.xpSiguiente * 1.25);
        if (window.bryanfghg?.iu?.bot) {
          window.bryanfghg.iu.bot.renderMensaje("bot", `🎉 ¡Has subido al nivel ${u.nivel}!`);
        }
      }
      
      this.render(); // Re-renderiza la UI del HUD
      
      if (motivo && window.bryanfghg?.iu?.aplicacion?.toast) {
        window.bryanfghg.iu.aplicacion.toast.mostrar("success", `+${xp} XP · +${oro} oro`, motivo);
      }
    }
  }

  window.bryanfghg.iu.PanelGamificacion = PanelGamificacion;

  document.addEventListener("DOMContentLoaded", () => {
    window.bryanfghg.iu.gamificacion = new PanelGamificacion();
    window.bryanfghg.iu.gamificacion.iniciar();
  });
})();
