import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
export default class Cl_mDcyt {
    constructor() {
        this.Expertos = [];
        this.Consultas = [];
        this.tbRegistro = "Mi.Registro.v01";
        this.db = new Cl_dcytDb({ aliasCuenta: "CODEBREAKERS" });
    }
    agregarExperto({ experto, callback }) {
        if (experto.error()) {
            callback(experto.error());
            return;
        }
        if (this.Expertos.find((e) => e.codigo === experto.codigo)) {
            callback("El código de experto ya existe.");
            return;
        }
        this.Expertos.push(experto);
        this.guardarExpertos();
        callback(false);
    }
    eliminarExperto({ codigo, callback }) {
        let indice = this.Expertos.findIndex((e) => e.codigo === codigo);
        if (indice === -1) {
            callback(`No existe ningún experto con el código ${codigo}.`);
            return;
        }
        this.Consultas = this.Consultas.filter(c => c.codigoExperto !== codigo);
        this.Expertos.splice(indice, 1);
        this.guardarExpertos();
        this.guardarConsultas();
        callback(false);
    }
    agregarConsulta({ consulta, callback }) {
        if (consulta.error()) {
            callback(consulta.error());
            return;
        }
        let existe = this.Consultas.find((c) => c.codigoExperto === consulta.codigoExperto && c.grupo === consulta.grupo);
        if (existe) {
            callback(`El Grupo ${consulta.grupo} ya le hizo una pregunta a este experto.`);
            return;
        }
        this.Consultas.push(consulta);
        this.guardarConsultas();
        callback(false);
    }
    responderConsulta({ idConsulta, respuesta, callback }) {
        let consulta = this.Consultas.find(c => c.id === idConsulta);
        if (!consulta) {
            callback("Consulta no encontrada");
            return;
        }
        consulta.respuesta = respuesta;
        this.guardarConsultas();
        callback(false);
    }
    listarExpertos() {
        return this.Expertos.map(e => e.toJSON());
    }
    listarConsultasPendientes(codigoExperto) {
        return this.Consultas
            .filter(c => c.codigoExperto === codigoExperto && (c.respuesta === null || c.respuesta === ""))
            .map(c => c.toJSON());
    }
    reportarRendimiento() {
        let reporte = [];
        this.Expertos.forEach(exp => {
            let total = this.Consultas.filter(c => c.codigoExperto === exp.codigo).length;
            reporte.push({
                nombre: exp.nombre,
                total: total
            });
        });
        return reporte;
    }
    listarHistorialPorExperto(codigoExperto) {
        return this.Consultas
            .filter(c => c.codigoExperto === codigoExperto)
            .map(c => c.toJSON());
    }
    cargarDatosIniciales(callback) {
        this.db.listRecords({ tabla: this.tbRegistro, callback });
    }
    guardarExpertos() {
        let db = this.Expertos.map(e => e.toJSON());
    }
    guardarConsultas() {
        let db = this.Consultas.map(c => c.toJSON());
    }
}
