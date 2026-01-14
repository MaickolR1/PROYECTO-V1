"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cl_controlador_js_1 = __importDefault(require("./Cl_controlador.js"));
const Cl_mDcyt_js_1 = __importDefault(require("./Cl_mDcyt.js"));
const Cl_vDcyt_js_1 = __importDefault(require("./Cl_vDcyt.js"));
class Cl_index {
    constructor() {
        let modelo = new Cl_mDcyt_js_1.default();
        modelo.cargarDatosIniciales((error) => {
            if (error) {
                alert("Error crítico de conexión: " + error);
                return;
            }
            let vista = new Cl_vDcyt_js_1.default();
            let controlador = new Cl_controlador_js_1.default(modelo, vista);
            vista.controlador = controlador;
            vista.refresh();
        });
    }
}
exports.default = Cl_index;
