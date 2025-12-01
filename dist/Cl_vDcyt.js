import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import Cl_vAdministrador from "./Cl_vAdministrador.js";
import Cl_vExperto from "./Cl_vExperto.js";
import Cl_vConsulta from "./Cl_vConsulta.js";
export default class Cl_vDcyt extends Cl_vGeneral {
    constructor() {
        super({ formName: "dcyt" });
        this.vExperto = new Cl_vExperto();
        this.vExperto.show({ ver: false });
        this.vConsulta = new Cl_vConsulta();
        this.vConsulta.show({ ver: false });
        this.vAdministrador = new Cl_vAdministrador();
        this.vAdministrador.show({ ver: false });
        this.btAdministrador = this.crearHTMLElement("btAdministrador", {
            onclick: () => 0,
        });
        this.btExperto = this.crearHTMLElement("btExperto", {
            onclick: () => 0,
        });
        this.btConsulta = this.crearHTMLElement("btConsulta", {
            onclick: () => 0,
        });
        this.lblExperto = this.crearHTMLElement("lblExperto", {
            refresh: () => { }
        });
        this.lblConsulta = this.crearHTMLElement("lblConsulta", {
            refresh: () => { }
        });
        this.lblAdministrador = this.crearHTMLElement("lblAdministrador", {
            refresh: () => { }
        });
    }
    set controlador(controlador) {
        this.vExperto.controlador = controlador;
        this.vConsulta.controlador = controlador;
        this.vAdministrador.controlador = controlador;
    }
    get controlador() {
        return super.controlador;
    }
    activarVista({ vista, opcion = "", objecto = "", }) {
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
