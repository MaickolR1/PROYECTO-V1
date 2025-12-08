import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mExperto from "./Cl_mExperto.js";
import Cl_mConsulta from "./Cl_mConsulta.js";
export default class Cl_mDcyt {
    constructor() {
        this.Expertos = [];
        this.Consultas = [];
        this.KEY_EXPERTOS = "ProyV1_Expertos_Local";
        this.KEY_CONSULTAS = "ProyV1_Consultas_Local";
        this.tbDcyt = "Mi.Dcyt.v01";
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
        try {
            let expData = localStorage.getItem(this.KEY_EXPERTOS);
            if (expData) {
                let objects = JSON.parse(expData);
                this.Expertos = objects.map(e => new Cl_mExperto(e));
            }
            let consData = localStorage.getItem(this.KEY_CONSULTAS);
            if (consData) {
                let objects = JSON.parse(consData);
                this.Consultas = objects.map(c => new Cl_mConsulta(c));
            }
            callback(false);
        }
        catch (error) {
            callback("Error al leer LocalStorage: " + error);
        }
    }
    guardarExpertos() {
        let data = this.Expertos.map(e => e.toJSON());
        localStorage.setItem(this.KEY_EXPERTOS, JSON.stringify(data));
    }
    guardarConsultas() {
        let data = this.Consultas.map(c => c.toJSON());
        localStorage.setItem(this.KEY_CONSULTAS, JSON.stringify(data));
    }
}
