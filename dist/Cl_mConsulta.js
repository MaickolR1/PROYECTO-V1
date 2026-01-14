"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cl_mConsulta {
    constructor({ id, codigoExperto, grupo, pregunta, respuesta = null }) {
        this._codigoExperto = '';
        this._grupo = '';
        this._pregunta = '';
        this._respuesta = null;
        this._id = id ? id : Date.now().toString();
        this.codigoExperto = codigoExperto;
        this.grupo = grupo;
        this.pregunta = pregunta;
        this._respuesta = respuesta;
    }
    get id() { return this._id; }
    get codigoExperto() { return this._codigoExperto; }
    set codigoExperto(codigoExperto) { this._codigoExperto = codigoExperto.trim(); }
    get grupo() { return this._grupo; }
    set grupo(grupo) { this._grupo = grupo.trim(); }
    get pregunta() { return this._pregunta; }
    set pregunta(pregunta) { this._pregunta = pregunta; }
    get respuesta() { return this._respuesta; }
    set respuesta(respuesta) { this._respuesta = respuesta; }
    error() {
        if (this._codigoExperto.length !== 4)
            return "Seleccione un experto válido";
        if (this._grupo.length === 0)
            return "El código del grupo es obligatorio (Ej: T001)";
        if (this._pregunta.length < 5)
            return "La pregunta es muy corta";
        return false;
    }
    toJSON() {
        return {
            id: this._id,
            codigoExperto: this._codigoExperto,
            grupo: this._grupo,
            pregunta: this._pregunta,
            respuesta: this._respuesta
        };
    }
}
exports.default = Cl_mConsulta;
