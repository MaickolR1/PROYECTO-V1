import Cl_mExperto from "./Cl_mExperto.js";
import Cl_mConsulta from "./Cl_mConsulta.js";
export default class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    agregarExperto({ expertoData, callback }) {
        this.modelo.agregarExperto({
            experto: new Cl_mExperto(expertoData),
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
            consulta: new Cl_mConsulta(consultaData),
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
