"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToClipboard = copyToClipboard;
async function copyToClipboard(text) {
    // Comprobar si la API moderna está disponible
    try {
        await navigator.clipboard.writeText(text);
        alert("¡Texto copiado al portapapeles!");
    }
    catch (err) {
        alert(`Error al copiar texto con API moderna: ${err}`);
    }
}
