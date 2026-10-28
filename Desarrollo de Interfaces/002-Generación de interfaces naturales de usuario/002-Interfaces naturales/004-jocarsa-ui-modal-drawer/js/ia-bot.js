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
      this.submitBtn  = document.getElementById("juIaSubmit");
      this.estadoEl   = document.getElementById("juIaEstado");
      this.modoSelect = document.getElementById("juIaModoSelect");

      this.modo      = "simulado";
      this.ollamaUrl = "http://localhost:11434/api/generate";
      this.modelo    = "phi3:mini";
      this.historial = [];
      this.cargando  = false;
      this.ultimoMensaje = "";

      this.respuestasSimuladas = [
        "Puedo ayudarte a crear un cliente nuevo. Pulsa «+ Nuevo» en la cabecera.",
        "Para exportar el listado, abre el menú contextual de la tabla (próximamente).",
        "Recuerda: cada cliente nuevo te da 20 XP y 10 de oro.",
        "Estoy en modo simulado. Cuando me conectes a Ollama, responderé con tu modelo local."
      ];
      this.indiceRespuesta = 0;
    }

    iniciar() {
      if (!this.fab) return;

      // 1. Toggle con el FAB
      this.fab.addEventListener("click", () => this.toggle());
      this.cerrarBtn.addEventListener("click", () => this.cerrar());

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.cerrar();
      });

      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = this.input.value.trim();
        if (!texto || this.cargando) return;
        this.input.value = "";
        this.enviar(texto);
      });

      // 2. Cambio de modo
      this.modoSelect.addEventListener("change", (e) => {
        this.modo = e.target.value;
        this.actualizarEstado();
        if (this.modo === 'off') {
          this.renderMensaje("bot", "El asistente ha sido desactivado. Puedes volver a activarlo en el menú inferior.");
          this.input.disabled = true; this.submitBtn.disabled = true;
        } else {
          this.input.disabled = false; this.submitBtn.disabled = false;
          this.renderMensaje("bot", this.modo === "ollama" ? `Modo Ollama activado. Modelo: ${this.modelo}.` : "Modo simulado activado.");
        }
      });

      this.renderMensaje("bot", "¡Hola! Soy tu asistente bryanfghg. ¿En qué te ayudo?");
      this.actualizarEstado();
    }

    // Lógica de Toggle (Punto 3)
    toggle() {
      if (this.panel.classList.contains("abierto")) this.cerrar();
      else this.abrir();
    }

    abrir() {
      this.panel.classList.add("abierto");
      this.panel.setAttribute("aria-hidden", "false");
      if (this.modo !== 'off') this.input.focus();
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
      const textos = { simulado: "Simulado · sin red", ollama: `Ollama · ${this.modelo}`, off: "Desactivado" };
      this.estadoEl.textContent = textos[this.modo];
    }

    async enviar(texto) {
      this.renderMensaje("user", texto);
      this.historial.push({ role: "user", content: texto });
      this.ultimoMensaje = texto;
      
      this.setCargando(true);
      const typing = this.renderMensaje("bot", "Escribiendo...");

      try {
        const respuesta = await this.responder(texto);
        typing.remove();
        this.renderMensaje("bot", respuesta);
        this.historial.push({ role: "assistant", content: respuesta });
      } catch (err) {
        typing.remove();
        this.renderMensaje("error", "⚠ " + err.message);
        this.mostrarBotonReintentar();
      } finally {
        this.setCargando(false);
      }
    }

    setCargando(estado) {
      this.cargando = estado;
      this.input.disabled = estado;
      this.submitBtn.disabled = estado;
      this.submitBtn.textContent = estado ? "..." : "Enviar";
    }

    mostrarBotonReintentar() {
      const btn = document.createElement("button");
      btn.className = "bg-btn secondary";
      btn.style.marginTop = "8px";
      btn.textContent = "Reintentar";
      btn.addEventListener("click", () => {
        btn.remove();
        this.enviar(this.ultimoMensaje);
      });
      this.mensajesEl.appendChild(btn);
      this.mensajesEl.scrollTop = this.mensajesEl.scrollHeight;
    }

    async responder(pregunta) {
      if (this.modo === "ollama") return await this.consultarOllama(pregunta);
      return await this.responderSimulado(pregunta);
    }

    responderSimulado(pregunta) {
      const r = this.respuestasSimuladas[this.indiceRespuesta % this.respuestasSimuladas.length];
      this.indiceRespuesta++;
      return new Promise((resolve) => setTimeout(() => resolve(r), 600));
    }

    async consultarOllama(pregunta) {
      const contexto = this.historial.slice(-6).map((m) => `${m.role === "user" ? "Usuario" : "Asistente"}: ${m.content}`).join("\n");
      const prompt = `Eres un asistente útil. Responde en español, de forma breve.\n\nHistorial:\n${contexto}\n\nPregunta: ${pregunta}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      try {
        const res = await fetch(this.ollamaUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: this.modelo, prompt, stream: false }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!data.response) throw new Error("Respuesta vacía de Ollama.");
        return data.response.trim();
      } catch (e) {
        clearTimeout(timeoutId);
        if (e.name === "AbortError") throw new Error("Timeout: Ollama tardó más de 30s.");
        throw new Error(`Error de conexión a Ollama:\n${e.message}\nAsegúrate de que Ollama está corriendo (ollama serve) y el modelo descargado.`);
      }
    }
  }

  window.bryanfghg.iu.BotIA = BotIA;

  document.addEventListener("DOMContentLoaded", () => {
    window.bryanfghg.iu.bot = new BotIA();
    window.bryanfghg.iu.bot.iniciar();
  });
})();
