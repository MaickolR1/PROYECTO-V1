export default class Cl_mExperto {
    constructor({ codigo, nombre, area, cargo }) {
        this._codigo = "";
        this._nombre = "";
        this._area = "";
        this._cargo = "";
        this.codigo = codigo;
        this.nombre = nombre;
        this.area = area;
        this.cargo = cargo;
    }
    get codigo() { return this._codigo; }
    set codigo(codigo) { this._codigo = codigo.trim(); }
    get nombre() { return this._nombre; }
    set nombre(nombre) { this._nombre = nombre.trim().toUpperCase(); }
    get area() { return this._area; }
    set area(area) { this._area = area; }
    get cargo() { return this._cargo; }
    set cargo(cargo) { this._cargo = cargo; }
    error() {
        if (this._codigo.length !== 4)
            return "El código debe tener 4 caracteres";
        if (this._nombre.length === 0)
            return "El nombre no puede estar vacío";
        if (this._area === "")
            return "Seleccione un área";
        if (this._cargo === "")
            return "El cargo no puede estar vacío";
        return false;
    }
    toJSON() {
        return {
            codigo: this._codigo,
            nombre: this._nombre,
            area: this._area,
            cargo: this._cargo
        };
    }
}
