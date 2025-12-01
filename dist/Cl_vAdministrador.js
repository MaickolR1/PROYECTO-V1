import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vAdministrador extends Cl_vGeneral {
    constructor() {
        super({ formName: "dcyt" });
        this.btAgregarExperto = this.crearHTMLButtonElement("btnAgregarExperto", {
            onclick: () => this.agregarExperto(),
        });
        this.inArea = this.crearHTMLInputElement("inArea", {
            oninput: () => this.agregarExperto(),
        });
        this.inCargo = this.crearHTMLInputElement("inCargo", {
            oninput: () => this.agregarExperto(),
        });
        this.inRespuesta = this.crearHTMLInputElement("inRespuesta", {
            oninput: () => this.responderPregunta(),
        });
        this.inCodigo = this.crearHTMLInputElement("inCodigo", {
            oninput: () => this.agregarExperto(),
        });
        this.inNombre = this.crearHTMLInputElement("inNombre", {
            oninput: () => this.agregarExperto(),
        });
    }
    agregarExperto() {
        let codigo = prompt("Ingrese el codigo del experto");
        if (!codigo)
            return;
        let nombre = prompt("Ingrese el nombre del experto");
        if (!nombre)
            return;
        let area = prompt("Ingrese el area del experto");
        if (!area)
            return;
        let cargo = prompt("Ingrese el cargo del experto");
        if (!cargo)
            return;
        let respuesta = prompt("Ingrese la respuesta del experto");
        if (!respuesta)
            return;
        this.controlador.agregarExperto({
            expertoData: {
                codigo: codigo,
                nombre: nombre,
                area: area,
                cargo: cargo,
                respuesta: respuesta,
            },
            callback: (error) => {
                if (error)
                    alert(error);
                this.refresh();
            },
        });
    }
    responderPregunta() {
        let nombre = prompt("Ingrese el nombre del experto");
        if (!nombre)
            return;
        let respuesta = prompt("Ingrese la respuesta del experto");
        if (!respuesta)
            return;
        this.controlador.responderPregunta({
            preguntaData: {
                codigo: "",
                nombre: nombre,
                area: "",
                cargo: "",
                respuesta: respuesta,
            },
            callback: (error) => {
                if (error)
                    alert(error);
                this.refresh();
            },
        });
    }
}
