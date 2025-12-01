export default class Cl_mConsulta {
    constructor({ codigoExperto, grupo, pregunta }) {
        this._codigoExperto = '';
        this._grupo = '';
        this._pregunta = '';
        this.codigoExperto = codigoExperto;
        this.grupo = grupo;
        this.pregunta = pregunta;
    }
    get codigoExperto() {
        return this._codigoExperto;
    }
    set codigoExperto(codigoExperto) {
        this._codigoExperto = codigoExperto;
    }
    get grupo() {
        return this._grupo;
    }
    set grupo(grupo) {
        this._grupo = grupo;
    }
    get pregunta() {
        return this._pregunta;
    }
    set pregunta(pregunta) {
        this._pregunta = pregunta;
    }
    error() {
        if (this._codigoExperto.length === 4) {
            return "El código del experto no coincide con el de la base de datos";
        }
        const grupo = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        if (!grupo.includes(this._grupo)) {
            return "El grupo debe ser un número entre 1 y 10";
        }
        const pregunta = ["1"];
        if (this._pregunta.length === 0) {
            return "La pregunta no puede estar vacía";
        }
        return false;
    }
    toJSON() {
        return {
            codigoExperto: this._codigoExperto,
            grupo: this._grupo,
            pregunta: this._pregunta
        };
    }
}
