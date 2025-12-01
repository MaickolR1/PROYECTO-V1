import Cl_mConsulta  from "./Cl_mConsulta.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vConsulta extends Cl_vGeneral {
private inCodigoExperto: HTMLInputElement;
private inPregunta: HTMLInputElement;
private btnEnviar: HTMLButtonElement;

constructor(){
    super({formName: "Consulta"});
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
enviar(){
    let pregunta = prompt("Ingrese la pregunta:");
    if (!pregunta) return;
    this.controlador?.enviarPregunta({
        preguntaData: {
            codigoExperto: this.inCodigoExperto.value,
            grupo: this.inPregunta.value,
            pregunta,
        },
        callback: (error: string | false ) => {
            if (error) alert(error);
        }
     });
  }

}