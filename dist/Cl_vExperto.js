import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vExperto extends Cl_vGeneral {
    constructor() {
        super({ formName: "experto" });
        this.idConsultaActual = "";
        this.slExperto = this.crearHTMLSelectElement("slExperto", {
            onchange: () => this.cargarPendientes()
        });
        this.divConsultas = this.crearHTMLElement("divConsultas");
        this.divResponder = this.crearHTMLElement("divResponder");
        this.lblGrupo = document.getElementById("experto_lblGrupo");
        this.lblPregunta = document.getElementById("experto_lblPregunta");
        this.inRespuesta = this.crearHTMLInputElement("inRespuesta");
        this.btEnviarRespuesta = this.crearHTMLButtonElement("btEnviarRespuesta", {
            onclick: () => this.enviarRespuesta()
        });
        this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
            onclick: () => { this.divResponder.style.display = "none"; }
        });
    }
    inicializar() {
        let expertos = this.controlador.obtenerListaExpertos();
        this.slExperto.innerHTML = "<option value=''>Seleccione su nombre...</option>";
        expertos.forEach((exp) => {
            let op = document.createElement("option");
            op.value = exp.codigo;
            op.text = exp.nombre;
            this.slExperto.add(op);
        });
        this.divConsultas.innerHTML = "";
        this.divResponder.style.display = "none";
    }
    cargarPendientes() {
        let codigo = this.slExperto.value;
        if (!codigo)
            return;
        let pendientes = this.controlador.obtenerConsultasPendientes(codigo);
        this.divConsultas.innerHTML = "";
        if (pendientes.length === 0) {
            this.divConsultas.innerHTML = "<tr><td colspan='3'>No hay consultas pendientes</td></tr>";
            return;
        }
        pendientes.forEach((c) => {
            let btnId = `btn_resp_${c.id}`;
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>Grupo ${c.grupo}</td>
                <td>${c.pregunta}</td>
                <td><button id="${btnId}">Responder</button></td>
            `;
            this.divConsultas.appendChild(tr);
            let btn = document.getElementById(btnId);
            if (btn) {
                btn.onclick = () => this.prepararRespuesta(c);
            }
        });
    }
    prepararRespuesta(consulta) {
        this.idConsultaActual = consulta.id;
        this.lblGrupo.innerText = consulta.grupo;
        this.lblPregunta.innerText = consulta.pregunta;
        this.inRespuesta.value = "";
        this.divResponder.style.display = "block";
    }
    enviarRespuesta() {
        if (this.inRespuesta.value === "") {
            alert("Escriba una respuesta");
            return;
        }
        this.controlador.responderConsulta({
            idConsulta: this.idConsultaActual,
            respuesta: this.inRespuesta.value,
            callback: (error) => {
                if (!error) {
                    alert("Respuesta enviada");
                    this.divResponder.style.display = "none";
                    this.cargarPendientes();
                }
                else {
                    alert(error);
                }
            }
        });
    }
}
