import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mExperto, { iExperto } from "./Cl_mExperto.js";
import Cl_mConsulta, { iConsulta } from "./Cl_mConsulta.js";

export default class Cl_mDcyt {
    private Expertos: Cl_mExperto[] = [];
    private Consultas: Cl_mConsulta[] = [];
    private db: Cl_dcytDb;
  readonly tbRegistro: string = "Mi.Registro.v01";

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

    reportarRendimiento(): { nombre: string, total: number }[] {
        let reporte: { nombre: string, total: number }[] = [];
        
        this.Expertos.forEach(exp => {
            let total = this.Consultas.filter(c => c.codigoExperto === exp.codigo).length;
            reporte.push({
                nombre: exp.nombre,
                total: total
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
        this.db.listRecords({ tabla: this.tbRegistro, callback });
    }

    private guardarExpertos() {
        let db = this.Expertos.map(e => e.toJSON());
    }

    private guardarConsultas() {
        let db = this.Consultas.map(c => c.toJSON());
    }
}