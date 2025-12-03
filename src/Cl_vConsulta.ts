import Cl_mExperto, { iExperto } from "./Cl_mExperto.js";
import { iConsulta } from "./Cl_mConsulta.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vConsulta extends Cl_vGeneral {
    private slExperto: HTMLSelectElement;
    private inGrupo: HTMLInputElement;
    private inPregunta: HTMLInputElement;
    private btnEnviar: HTMLButtonElement;
    private divHistorial: HTMLElement;

    constructor(){
        super({formName: "consulta"});
        
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

    public cargarExpertos() {
        let expertos = this.controlador!.obtenerListaExpertos();
        this.slExperto.innerHTML = "<option value=''>Seleccione un experto...</option>";
        expertos.forEach((exp: iExperto) => {
            let op = document.createElement("option");
            op.value = exp.codigo;
            op.text = `${exp.nombre} (${exp.area})`;
            this.slExperto.add(op);
        });
        this.divHistorial.innerHTML = "";
    }

    public cargarHistorial() {
        let codigo = this.slExperto.value;
        this.divHistorial.innerHTML = "";
        
        if (!codigo) return;

        let historial = this.controlador!.obtenerHistorialExperto(codigo);

        if (historial.length === 0) {
            this.divHistorial.innerHTML = "<tr><td colspan='3'>Este experto aún no tiene consultas.</td></tr>";
            return;
        }

        historial.forEach((c: iConsulta) => {
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

    enviar(){
        this.controlador?.enviarConsulta({
            consultaData: {
                codigoExperto: this.slExperto.value,
                grupo: this.inGrupo.value,
                pregunta: this.inPregunta.value,
            },
            callback: (error: string | false ) => {
                if (error) alert(error);
                else {
                    alert("Consulta enviada al experto.");
                    this.inPregunta.value = "";
                    this.cargarHistorial();
                }
            }
         });
      }
}