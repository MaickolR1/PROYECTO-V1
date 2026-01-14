const fs = require('fs');

export function leerArchivo(nombreArchivo: string): string {
  try {
    const contenido = fs.readFileSync(nombreArchivo, 'utf-8');
    return contenido;
  } catch (error) {
    console.error(`Error al leer el archivo ${nombreArchivo}:`, error);
    return '';
  }
}

// Ejemplo de uso
const rutaDelArchivo = 'ruta_del_archivo.txt';
const contenido = leerArchivo(rutaDelArchivo);
console.log(contenido);