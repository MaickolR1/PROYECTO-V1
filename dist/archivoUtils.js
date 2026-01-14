"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leerArchivo = leerArchivo;
const fs_1 = __importDefault(require("fs"));
function leerArchivo(nombreArchivo) {
    try {
        const contenido = fs_1.default.readFileSync(nombreArchivo, 'utf-8');
        return contenido;
    }
    catch (error) {
        console.error(`Error al leer el archivo ${nombreArchivo}:`, error);
        return '';
    }
}
// Ejemplo de uso
const rutaDelArchivo = 'ruta_del_archivo.txt';
const contenido = leerArchivo(rutaDelArchivo);
console.log(contenido);
