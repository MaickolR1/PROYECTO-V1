import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vAdministrador extends Cl_vGeneral {
    private btAgregarExperto: HTMLButtonElement;
    private btEliminarExperto: HTMLButtonElement; // Nueva propiedad
    private btReporte: HTMLButtonElement;
    private inArea: HTMLSelectElement; 
    private inCargo: HTMLInputElement;
    private inCodigo: HTMLInputElement;
    private inNombre: HTMLInputElement;
    private divReporte: HTMLElement;

    constructor() {
        super({ formName: "administrador" });

        this.btAgregarExperto = this.crearHTMLButtonElement("btnAgregarExperto", {
            onclick: () => this.agregarExperto(),
        });

        // NUEVO BOTÓN
        this.btEliminarExperto = this.crearHTMLButtonElement("btnEliminarExperto", {
            onclick: () => this.eliminarExperto(),
        });
        
        this.btReporte = this.crearHTMLButtonElement("btReporte", {
            onclick: () => this.generarReporte()
        });

        this.inArea = this.crearHTMLSelectElement("slArea", {
            elementsSource: [
                { value: "", text: "Seleccione..." },
                { value: "Software", text: "Software" },
                { value: "Hardware", text: "Hardware" },
                { value: "Redes", text: "Redes" },
                { value: "IA", text: "Inteligencia Artificial" }
            ],
            valueAttributeName: "value",
            textExpresion: (opcion: any) => opcion.text
        });

        this.inCargo = this.crearHTMLInputElement("inCargo");
        this.inCodigo = this.crearHTMLInputElement("inCodigo");
        this.inNombre = this.crearHTMLInputElement("inNombre");
        
        this.divReporte = this.crearHTMLElement("divReporte");
    }

    agregarExperto() {
        this.controlador!.agregarExperto({
            expertoData: {
                codigo: this.inCodigo.value,
                nombre: this.inNombre.value,
                area: this.inArea.value,
                cargo: this.inCargo.value
            },
            callback: (error: string | false) => {
                if (error) alert(error);
                else {
                    alert("Experto agregado con éxito");
                    this.limpiarFormulario();
                }
            },
        });
    }

    eliminarExperto() {
        let codigo = this.inCodigo.value.trim();
        if (codigo === "") {
            alert("Por favor, escriba el CÓDIGO del experto que desea eliminar.");
            return;
        }

        if (confirm(`¿Está seguro de eliminar al experto con código ${codigo}?`)) {
            this.controlador!.eliminarExperto({
                codigo: codigo,
                callback: (error: string | false) => {
                    if (error) alert(error);
                    else {
                        alert("Experto eliminado correctamente.");
                        this.limpiarFormulario();
                    }
                }
            });
        }
    }

    generarReporte() {
        let datos = this.controlador!.obtenerReporteRendimiento();
        let html = "<table border=1><tr><th>Experto</th><th>Total Consultas</th></tr>";
        datos.forEach(d => {
            html += `<tr><td>${d.nombre}</td><td>${d.total}</td></tr>`;
        });
        html += "</table>";
        this.divReporte.innerHTML = html;
    }

    limpiarFormulario() {
        this.inCodigo.value = "";
        this.inNombre.value = "";
        this.inArea.value = "";
        this.inCargo.value = "";
    }
}