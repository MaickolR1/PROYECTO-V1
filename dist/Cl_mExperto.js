export default class Cl_mExperto {
    constructor({ codigo, nombre, area, cargo, respuesta }) {
        this._codigo = "";
        this._nombre = "";
        this._area = "";
        this._cargo = "";
        this._respuesta = "";
        this.codigo = codigo;
        this.nombre = nombre;
        this.area = area;
        this.cargo = cargo;
        this.respuesta = respuesta;
    }
    get codigo() {
        return this._codigo;
    }
    set codigo(codigo) {
        this._codigo = codigo.trim();
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre.trim().toUpperCase();
    }
    get area() {
        return this._area;
    }
    set area(area) {
        this._area = area;
    }
    get cargo() {
        return this._cargo;
    }
    set cargo(cargo) {
        this._cargo = cargo;
    }
    get respuesta() {
        return this._respuesta;
    }
    set respuesta(respuesta) {
        this._respuesta = respuesta;
    }
    error() {
        if (this._codigo.length === 4) {
            return "El código es requerido";
        }
        if (this._nombre.length === 0) {
            return "El nombre no puede estar vacío";
        }
        const area = ["Desarrollo de software", "Desarrollo de hardware", "Desarrollo de redes"];
        if (!area.includes(this._area)) {
            return "El área no es válida";
        }
        if (this._cargo === "") {
            return "El cargo no puede estar vacío";
        }
        if (this._respuesta === "") {
            return "La respuesta no puede estar vacía";
        }
        return false;
    }
    toJSON() {
        return {
            codigo: this._codigo,
            nombre: this._nombre,
            area: this._area,
            cargo: this._cargo,
            respuesta: this._respuesta,
        };
    }
}
