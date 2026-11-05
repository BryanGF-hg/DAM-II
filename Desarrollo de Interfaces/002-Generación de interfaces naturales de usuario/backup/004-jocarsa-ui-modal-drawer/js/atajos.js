/**
 * bryanfghg.iu · Componente Modular de Atajos de Teclado
 * Escanea el DOM buscando elementos con title="(ctrl+X)", 
 * muestra la lista al mantener ctrl y ejecuta el click en el elemento nativo.
 */
window.bryanfghg = window.bryanfghg || {};
window.bryanfghg.iu = window.bryanfghg.iu || {};

(() => {
  "use strict";

  class ComponenteAtajos {
    constructor() {
      this.overlay = document.getElementById("atajos-teclado");
      this.lista = document.getElementById("ju-lista-atajos");
      this.atajos = {}; // Diccionario: { 'n': HTMLElement, 'f': HTMLElement, ... }
      this.ctrlPulsado = false;
    }

    iniciar() {
      if (!this.overlay) return;

      this.escanearDOM();
      this.registrarEventos();
      this.renderLista();
    }

    /**
     * Busca todos los elementos en el DOM cuyo atributo 'title' contenga la sintaxis (ctrl+Letra)
     */
    escanearDOM() {
      const elementos = document.querySelectorAll('[title*="(ctrl+"]');
      
      elementos.forEach(el => {
        const title = el.getAttribute("title");
        // Extrae la letra dentro de (ctrl+X)
        const match = title.match(/\(ctrl\+([A-Za-z])\)/);
        if (match) {
          const tecla = match[1].toLowerCase();
          // Limpia el texto del title para mostrar solo la descripción
          const descripcion = title.replace(/\(ctrl\+[A-Za-z]\)/, '').trim();
          
          this.atajos[tecla] = {
            elemento: el,
            descripcion: descripcion || "Acción sin descripción"
          };
        }
      });
    }

    /**
     * Construye la lista visual dentro del panel de atajos
     */
    renderLista() {
      this.lista.innerHTML = "";
      
      const teclasOrdenadas = Object.keys(this.atajos).sort();
      
      if (teclasOrdenadas.length === 0) {
        this.lista.innerHTML = "<li>No hay atajos definidos.</li>";
        return;
      }

      teclasOrdenadas.forEach(tecla => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${this.atajos[tecla].descripcion}</span>
          <kbd>ctrl</kbd> + <kbd>${tecla.toUpperCase()}</kbd>
        `;
        this.lista.appendChild(li);
      });
    }

    registrarEventos() {
      // Mostrar overlay mientras se mantiene ctrl
      document.addEventListener("keydown", (e) => {
        if (e.key === "ctrl" && !this.ctrlPulsado) {
          e.preventDefault();
          this.ctrlPulsado = true;
          this.overlay.classList.remove("oculto");
          this.overlay.setAttribute("aria-hidden", "false");
        }

        // Ejecutar atajo si ctrl está pulsado junto con una tecla válida
        if (e.ctrlKey && e.key !== "ctrl") {
          e.preventDefault(); // Previene comportamientos por defecto del navegador
          this.ejecutarAtajo(e.key.toLowerCase());
        }
      });

      // Ocultar overlay al soltar ctrl
      document.addEventListener("keyup", (e) => {
        if (e.key === "ctrl") {
          this.ctrlPulsado = false;
          this.overlay.classList.add("oculto");
          this.overlay.setAttribute("aria-hidden", "true");
        }
      });

      // Si el usuario cambia de ventana (pierde el foco), ocultar el overlay por seguridad
      window.addEventListener("blur", () => {
        this.ctrlPulsado = false;
        this.overlay.classList.add("oculto");
        this.overlay.setAttribute("aria-hidden", "true");
      });
    }

    ejecutarAtajo(tecla) {
      const atajo = this.atajos[tecla];
      if (atajo && atajo.elemento) {
        // Ocultamos el overlay antes de clickar para que no interfiera visualmente
        this.overlay.classList.add("oculto");
        
        // Simula el click en el elemento nativo del DOM
        atajo.elemento.click();
        
        // Si es un input, le damos el foco
        if (atajo.elemento.tagName === "INPUT") {
          atajo.elemento.focus();
        }
      }
    }
  }

  // Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    window.bryanfghg.iu.atajos = new ComponenteAtajos();
    window.bryanfghg.iu.atajos.iniciar();
  });
})();
