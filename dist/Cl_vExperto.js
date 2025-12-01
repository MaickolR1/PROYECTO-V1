import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vExperto extends Cl_vGeneral {
    constructor() {
        super({ formName: "Experto" });
        this.inNombre = this.crearHTMLInputElement("inNombre", {
            oninput: () => {
                this.inNombre.value = this.inNombre.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
        });
        this.inPregunta = this.crearHTMLInputElement("inpregunta", {
            oninput: () => {
                this.inPregunta.value = this.inPregunta.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
        });
        this.btResponder = this.crearHTMLButtonElement("btResponder", {
            onclick: () => this.responder(),
        });
        this.divExperto = this.crearHTMLElement("divExperto", {
            type: tHTMLElement.CONTAINER,
            onclick: () => this.expertosRegistrados(),
        });
    }
    responder() {
        var _a;
        let respuesta = prompt("Ingrese la respuesta");
        if (!respuesta)
            return;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.responderPregunta({
            preguntaData: {
                codigo: this.inNombre.value,
                nombre: this.inPregunta.value,
                area: this.inPregunta.value,
                cargo: this.inPregunta.value,
                respuesta: this.inPregunta.value,
            },
            callback: (error) => {
                if (error)
                    alert(error);
            }
        });
    }
    expertosRegistrados() {
        var _a;
        this.divExperto.innerHTML = "";
        let registro = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.expertosRegistrados();
        if (!registro)
            return;
        registro.forEach((experto) => {
            this.divExperto.innerHTML += `<tr>
      <td>${experto.codigo}</td>
      <td>${experto.nombre}</td>
      <td>${experto.area}</td>
      <td>${experto.cargo}</td>
      <td>${experto.respuesta}</td>
      </tr>`;
        });
    }
}
