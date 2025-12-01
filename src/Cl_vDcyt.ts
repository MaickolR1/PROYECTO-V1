import Cl_controlador from "./Cl_controlador.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import Cl_mExperto from "./Cl_mExperto.js";
import Cl_mConsulta from "./Cl_mConsulta.js";
import Cl_vAdministrador from "./Cl_vAdministrador.js";
import Cl_vExperto from "./Cl_vExperto.js";
import Cl_vConsulta from "./Cl_vConsulta.js";

export default class Cl_vDcyt extends Cl_vGeneral {
    private vExperto: Cl_vExperto;
    private vConsulta: Cl_vConsulta;
    private vAdministrador: Cl_vAdministrador;
    private btAdministrador: HTMLButtonElement;
    private btExperto: HTMLButtonElement;
    private btConsulta: HTMLButtonElement;
    private lblExperto: HTMLLabelElement;
    private lblConsulta: HTMLLabelElement;
    private lblAdministrador: HTMLLabelElement;

    constructor(){
        super({ formName: "dcyt" });
        this.vExperto = new Cl_vExperto();
        this.vExperto.show({ver: false});
        this.vConsulta = new Cl_vConsulta();
        this.vConsulta.show({ver: false});
        this.vAdministrador = new Cl_vAdministrador();
        this.vAdministrador.show({ver: false});
        this.btAdministrador = this.crearHTMLElement("btAdministrador", {
            onclick: () => 0,
        }) as HTMLButtonElement;
        this.btExperto = this.crearHTMLElement("btExperto", {
            onclick: () => 0,
        }) as HTMLButtonElement;
        this.btConsulta = this.crearHTMLElement("btConsulta", {
            onclick: () => 0,
        }) as HTMLButtonElement;
        this.lblExperto = this.crearHTMLElement("lblExperto", {
            refresh: () => {}
        }) as HTMLLabelElement;
        this.lblConsulta = this.crearHTMLElement("lblConsulta", {
            refresh: () => {}
        }) as HTMLLabelElement;
        this.lblAdministrador = this.crearHTMLElement("lblAdministrador", {
            refresh: () => {}
        }) as HTMLLabelElement;
    }
    set controlador(controlador: Cl_controlador) {
        this.vExperto.controlador = controlador;
        this.vConsulta.controlador = controlador;
        this.vAdministrador.controlador = controlador;
    }
    get controlador(): Cl_controlador | null {
        return super.controlador;
    }
    activarVista({
        vista,
        opcion = "",
        objecto = "",
    }: {
        vista: string;
        opcion?: string;
        objecto?: string;
    }): void {
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