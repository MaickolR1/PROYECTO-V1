"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cl_mExperto_js_1 = __importDefault(require("./Cl_mExperto.js"));
const Cl_mConsulta_js_1 = __importDefault(require("./Cl_mConsulta.js"));
class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    agregarExperto({ expertoData, callback }) {
        this.modelo.agregarExperto({
            experto: new Cl_mExperto_js_1.default(expertoData),
            callback: (error) => callback(error),
        });
    }
    eliminarExperto({ codigo, callback }) {
        this.modelo.eliminarExperto({
            codigo: codigo,
            callback: (error) => callback(error)
        });
    }
    obtenerReporteRendimiento() {
        return this.modelo.reportarRendimiento();
    }
    obtenerListaExpertos() {
        return this.modelo.listarExpertos();
    }
    obtenerHistorialExperto(codigoExperto) {
        return this.modelo.listarHistorialPorExperto(codigoExperto);
    }
    enviarConsulta({ consultaData, callback }) {
        this.modelo.agregarConsulta({
            consulta: new Cl_mConsulta_js_1.default(consultaData),
            callback: (error) => callback(error),
        });
    }
    obtenerConsultasPendientes(codigoExperto) {
        return this.modelo.listarConsultasPendientes(codigoExperto);
    }
    responderConsulta({ idConsulta, respuesta, callback }) {
        this.modelo.responderConsulta({
            idConsulta,
            respuesta,
            callback: (error) => callback(error)
        });
    }
    activarVista({ vista }) {
        if (this.vista)
            this.vista.activarVista({ vista });
    }
}
exports.default = Cl_controlador;
