import Cl_mExperto, {iExperto} from "./Cl_mExperto.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";

export default class Cl_vExperto extends Cl_vGeneral {
    private inNombre: HTMLInputElement;
    private inPregunta: HTMLInputElement;
    private btResponder: HTMLButtonElement;
    private divExperto: HTMLElement;

    constructor(){
        super({ formName: "Experto" });
        this.inNombre = this.crearHTMLInputElement("inNombre",{
            oninput: () => {
                this.inNombre.value = this.inNombre.value
                .toUpperCase()
                .trim();
                this.refresh();
            },
        });
        this.inPregunta = this.crearHTMLInputElement("inpregunta",{
            oninput: () => {
                this.inPregunta.value = this.inPregunta.value
                .toUpperCase()
                .trim();
                this.refresh();
            },
        });
        this.btResponder = this.crearHTMLButtonElement("btResponder",{
            onclick: () => this.responder(),
        });
        this.divExperto = this.crearHTMLElement("divExperto",{
            type: tHTMLElement.CONTAINER,
            onclick: () => this.expertosRegistrados(),    
        }) as HTMLElement;

    }

    public responder(){
        let respuesta = prompt("Ingrese la respuesta");
        if(!respuesta) return;
        this.controlador?.responderPregunta({
            preguntaData: {
                codigo: this.inNombre.value,
                nombre: this.inPregunta.value,
                area: this.inPregunta.value,
                cargo: this.inPregunta.value,
                respuesta: this.inPregunta.value,
            },
            callback: (error: string | false) => {
                if(error) alert(error);
            }
        });
    }

    public expertosRegistrados(){
        this.divExperto.innerHTML = "";
    let registro = this.controlador?.expertosRegistrados();
    if (!registro) return;
    registro.forEach((experto: iExperto) => {
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

