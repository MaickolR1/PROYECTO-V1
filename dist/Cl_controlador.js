import Cl_mExperto from "./Cl_mExperto.js";
import Cl_mConsulta from "./Cl_mConsulta.js";
export default class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    agregarExperto({ expertoData, callback, }) {
        this.modelo.agregarExperto({
            experto: new Cl_mExperto(expertoData),
            callback: (error) => {
                callback(error);
            },
        });
    }
    expertosRegistrados() {
        return this.modelo.listar();
    }
    responderPregunta({ preguntaData, callback, }) {
        this.modelo.agregarExperto({
            experto: new Cl_mExperto(preguntaData),
            callback: (error) => {
                callback(error);
            },
        });
    }
    enviarPregunta({ preguntaData, callback, }) {
        this.modelo.agregarConsulta({
            consulta: new Cl_mConsulta(preguntaData),
            callback: (error) => {
                callback(error);
            },
        });
    }
}
