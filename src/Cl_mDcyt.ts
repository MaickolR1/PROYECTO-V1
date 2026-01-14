import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mExperto, { iExperto } from "./Cl_mExperto.js";
import Cl_mConsulta, { iConsulta } from "./Cl_mConsulta.js";

export default class Cl_mDcyt {
    private Expertos: Cl_mExperto[] = [];
    private Consultas: Cl_mConsulta[] = [];
    private readonly KEY_EXPERTOS = "ProyV1_Expertos_Local"; 
    private readonly KEY_CONSULTAS = "ProyV1_Consultas_Local";
    private db: Cl_dcytDb;
 readonly tbDcyt: string = "Mi.Dcyt.v01"; 

    constructor() {
         this.db = new Cl_dcytDb({ aliasCuenta: "CODEBREAKERS" });
    }

    agregarExperto({ experto, callback }: { experto: Cl_mExperto; callback: (error: string | false) => void; }): void {
        if (experto.error()) { 
            callback(experto.error()); 
            return; 
        }
        
        if (this.Expertos.find((e) => e.codigo === experto.codigo)) {
            callback("El código de experto ya existe.");
            return;
        }

        this.Expertos.push(experto);
        this.guardarExpertos();
        callback(false);
    }

    eliminarExperto({ codigo, callback }: { codigo: string; callback: (error: string | false) => void; }): void {
        let indice = this.Expertos.findIndex((e) => e.codigo === codigo);
        if (indice === -1) {
            callback(`No existe ningún experto con el código ${codigo}.`);
            return;
        }

        this.Consultas = this.Consultas.filter(c => c.codigoExperto !== codigo);
        this.Expertos.splice(indice, 1);

        this.guardarExpertos();
        this.guardarConsultas();
        
        callback(false);
    }

    agregarConsulta({ consulta, callback }: { consulta: Cl_mConsulta; callback: (error: string | false) => void; }): void {
        if (consulta.error()) { 
            callback(consulta.error()); 
            return; 
        }

        let existe = this.Consultas.find((c) => c.codigoExperto === consulta.codigoExperto && c.grupo === consulta.grupo);
        if (existe) {
            callback(`El Grupo ${consulta.grupo} ya le hizo una pregunta a este experto.`);
            return;
        }

        this.Consultas.push(consulta);
        this.guardarConsultas();
        callback(false);
    }

    responderConsulta({ idConsulta, respuesta, callback }: { idConsulta: string, respuesta: string, callback: (error: string | false) => void }): void {
        let consulta = this.Consultas.find(c => c.id === idConsulta);
        if(!consulta) { 
            callback("Consulta no encontrada"); 
            return; 
        }

        consulta.respuesta = respuesta;
        this.guardarConsultas();
        callback(false);
    }

    listarExpertos(): iExperto[] {
        return this.Expertos.map(e => e.toJSON());
    }

    listarConsultasPendientes(codigoExperto: string): iConsulta[] {
        return this.Consultas
            .filter(c => c.codigoExperto === codigoExperto && (c.respuesta === null || c.respuesta === ""))
            .map(c => c.toJSON());
    }

    reportarRendimiento(): { nombre: string, total: number, pendientes: number }[] {
        let reporte: { nombre: string, total: number, pendientes: number }[] = [];
        
        this.Expertos.forEach(exp => {
            let total = this.Consultas.filter(c => c.codigoExperto === exp.codigo).length;
            let pendientes = this.Consultas.filter(c => c.codigoExperto === exp.codigo && (c.respuesta === null || c.respuesta === "")).length;
            reporte.push({
                nombre: exp.nombre,
                total: total,
                pendientes: pendientes
            });
        });
        return reporte;
    }

    listarHistorialPorExperto(codigoExperto: string): iConsulta[] {
        return this.Consultas
            .filter(c => c.codigoExperto === codigoExperto)
            .map(c => c.toJSON());
    }

    cargarDatosIniciales(callback: (error: string | false) => void): void {
        try {
            let expData = localStorage.getItem(this.KEY_EXPERTOS);
            if (expData) {
                let objects: iExperto[] = JSON.parse(expData);
                this.Expertos = objects.map(e => new Cl_mExperto(e));
            }

            let consData = localStorage.getItem(this.KEY_CONSULTAS);
            if (consData) {
                let objects: iConsulta[] = JSON.parse(consData);
                this.Consultas = objects.map(c => new Cl_mConsulta(c));
            }

            callback(false);
        } catch (error) {
            callback("Error al leer LocalStorage: " + error);
        }
    }

    private guardarExpertos() {
        let data = this.Expertos.map(e => e.toJSON());
        localStorage.setItem(this.KEY_EXPERTOS, JSON.stringify(data));
    }

    private guardarConsultas() {
        let data = this.Consultas.map(c => c.toJSON());
        localStorage.setItem(this.KEY_CONSULTAS, JSON.stringify(data));
    }
}