"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cl_vGeneral_js_1 = __importDefault(require("./tools/Cl_vGeneral.js"));
class Cl_vConsulta extends Cl_vGeneral_js_1.default {
    constructor() {
        super({ formName: "consulta" });
        this.slExperto = this.crearHTMLSelectElement("slExperto", {
            onchange: () => this.cargarHistorial()
        });
        this.inGrupo = this.crearHTMLInputElement("inGrupo");
        this.inPregunta = this.crearHTMLInputElement("inPregunta");
        this.divHistorial = this.crearHTMLElement("divHistorial");
        this.btnEnviar = this.crearHTMLButtonElement("btnEnviar", {
            onclick: () => this.enviar()
        });
    }
    cargarExpertos() {
        let expertos = this.controlador.obtenerListaExpertos();
        this.slExperto.innerHTML = "<option value=''>Seleccione un experto...</option>";
        expertos.forEach((exp) => {
            let op = document.createElement("option");
            op.value = exp.codigo;
            op.text = `${exp.nombre} (${exp.area})`;
            this.slExperto.add(op);
        });
        this.divHistorial.innerHTML = "";
    }
    cargarHistorial() {
        let codigo = this.slExperto.value;
        this.divHistorial.innerHTML = "";
        if (!codigo)
            return;
        let historial = this.controlador.obtenerHistorialExperto(codigo);
        if (historial.length === 0) {
            this.divHistorial.innerHTML = "<tr><td colspan='3'>Este experto aún no tiene consultas.</td></tr>";
            return;
        }
        historial.forEach((c) => {
            let respuestaTexto = c.respuesta
                ? `<span style="color: green; font-weight: bold;">${c.respuesta}</span>`
                : `<span style="color: gray; font-style: italic;">(Esperando respuesta...)</span>`;
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${c.grupo}</td>
                <td>${c.pregunta}</td>
                <td>${respuestaTexto}</td>
            `;
            this.divHistorial.appendChild(tr);
        });
    }
    enviar() {
        var _a;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.enviarConsulta({
            consultaData: {
                codigoExperto: this.slExperto.value,
                grupo: this.inGrupo.value,
                pregunta: this.inPregunta.value,
            },
            callback: (error) => {
                if (error)
                    alert(error);
                else {
                    alert("Consulta enviada al experto.");
                    this.inPregunta.value = "";
                    this.cargarHistorial();
                }
            }
        });
    }
}
exports.default = Cl_vConsulta;
