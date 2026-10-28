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
          ? `Modo Ollama activado. Modelo: ${this.modelo}. Asegúrate de que Ollama está corriendo en ${this.ollamaUrl} y de activar ollama con ollama serve`
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
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 300 * 1000(milisegundos) = 300000 milisegundos o 5 min

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
