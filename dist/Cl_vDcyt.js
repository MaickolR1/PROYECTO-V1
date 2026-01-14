import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import Cl_vAdministrador from "./Cl_vAdministrador.js";
import Cl_vExperto from "./Cl_vExperto.js";
import Cl_vConsulta from "./Cl_vConsulta.js";
export default class Cl_vDcyt extends Cl_vGeneral {
    constructor() {
        super({ formName: "dcyt" });
        this.vExperto = new Cl_vExperto();
        this.vConsulta = new Cl_vConsulta();
        this.vAdministrador = new Cl_vAdministrador();
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
