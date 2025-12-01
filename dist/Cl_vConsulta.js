import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vConsulta extends Cl_vGeneral {
    constructor() {
        super({ formName: "Consulta" });
        this.inCodigoExperto = this.crearHTMLInputElement("inCodigoExperto", {
            oninput: () => {
                this.inPregunta.value = this.inCodigoExperto.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
        });
        this.inPregunta = this.crearHTMLInputElement("inPregunta", {
            oninput: () => {
                this.inCodigoExperto.value = this.inPregunta.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
        });
        this.btnEnviar = this.crearHTMLButtonElement("btnEnviar", {
            onclick: () => this.enviar()
        });
    }
    enviar() {
        var _a;
        let pregunta = prompt("Ingrese la pregunta:");
        if (!pregunta)
            return;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.enviarPregunta({
            preguntaData: {
                codigoExperto: this.inCodigoExperto.value,
                grupo: this.inPregunta.value,
                pregunta,
            },
            callback: (error) => {
                if (error)
                    alert(error);
            }
        });
    }
}
