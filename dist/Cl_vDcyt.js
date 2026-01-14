"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cl_vGeneral_js_1 = __importDefault(require("./tools/Cl_vGeneral.js"));
const Cl_vAdministrador_js_1 = __importDefault(require("./Cl_vAdministrador.js"));
const Cl_vExperto_js_1 = __importDefault(require("./Cl_vExperto.js"));
const Cl_vConsulta_js_1 = __importDefault(require("./Cl_vConsulta.js"));
class Cl_vDcyt extends Cl_vGeneral_js_1.default {
    constructor() {
        super({ formName: "dcyt" });
        this.vExperto = new Cl_vExperto_js_1.default();
        this.vConsulta = new Cl_vConsulta_js_1.default();
        this.vAdministrador = new Cl_vAdministrador_js_1.default();
        this.vExperto.show({ ver: false });
        this.vConsulta.show({ ver: false });
        this.vAdministrador.show({ ver: false });
        this.btAdministrador = this.crearHTMLElement("btAdministrador");
        this.btExperto = this.crearHTMLElement("btExperto");
        this.btConsulta = this.crearHTMLElement("btConsulta");
        this.btAdministrador.onclick = () => this.irA("administrador");
        this.btExperto.onclick = () => {
            this.irA("experto");
            this.vExperto.inicializar();
        };
        this.btConsulta.onclick = () => {
            this.irA("consulta");
            this.vConsulta.cargarExpertos();
        };
    }
    irA(vista) {
        if (this.controlador) {
            this.controlador.activarVista({ vista });
        }
    }
    set controlador(controlador) {
        super.controlador = controlador;
        this.vExperto.controlador = controlador;
        this.vConsulta.controlador = controlador;
        this.vAdministrador.controlador = controlador;
    }
    get controlador() {
        return super.controlador;
    }
    activarVista({ vista }) {
        this.vExperto.show({ ver: false });
        this.vConsulta.show({ ver: false });
        this.vAdministrador.show({ ver: false });
        switch (vista) {
            case "experto":
                this.vExperto.show({ ver: true });
                break;
            case "consulta":
                this.vConsulta.show({ ver: true });
                break;
            case "administrador":
                this.vAdministrador.show({ ver: true });
                break;
        }
    }
}
exports.default = Cl_vDcyt;
