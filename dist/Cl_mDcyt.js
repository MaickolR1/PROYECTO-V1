import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mExperto from "./Cl_mExperto.js";
import Cl_mConsulta from "./Cl_mConsulta.js";
export default class Cl_mDcyt {
    constructor() {
        this.Dcyt = [];
        this.Consulta = [];
        this.tbDcyt = "Gestion de consultas a expertos";
        this.db = new Cl_dcytDb({ aliasCuenta: "CODEBREAKERS" });
    }
    agregarExperto({ experto, callback, }) {
        let error = experto.error();
        if (error) {
            callback(error);
            return;
        }
        let existe = this.Dcyt.find((e) => e.codigo === experto.codigo);
        if (existe) {
            callback("El experto ya se encuentra registrado");
            return;
        }
        this.db.addRecord({
            tabla: this.tbDcyt,
            object: experto.toJSON(),
            callback: ({ id, objects, error }) => {
                if (error)
                    this.llenarExperto(objects);
                callback === null || callback === void 0 ? void 0 : callback(error);
            },
        });
    }
    cargarExpertos(callback) {
        // Obtener los contactos desde la Web Storage
        this.db.listRecords({
            tabla: this.tbDcyt,
            callback: ({ objects, error }) => {
                if (!error)
                    this.llenarExperto(objects || []);
                callback(false);
            },
        });
    }
    llenarExperto(Dcyt) {
        this.Dcyt = [];
        Dcyt.map((experto) => this.Dcyt.push(new Cl_mExperto(experto)));
    }
    listar() {
        return this.Dcyt.map((experto) => experto.toJSON());
    }
    agregarConsulta({ consulta, callback, }) {
        let error = consulta.error();
        if (error) {
            callback(error);
            return;
        }
        let existe = this.Consulta.find((e) => e.codigoExperto === consulta.codigoExperto);
        if (existe) {
            callback("La consulta ya se encuentra registrada");
            return;
        }
        this.db.addRecord({
            tabla: this.tbDcyt,
            object: consulta.toJSON(),
            callback: ({ id, objects, error }) => {
                if (error)
                    this.llenarConsulta(objects);
                callback === null || callback === void 0 ? void 0 : callback(error);
            },
        });
    }
    cargarConsultas(callback) {
        // Obtener los contactos desde la Web Storage
        this.db.listRecords({
            tabla: this.tbDcyt,
            callback: ({ objects, error }) => {
                if (!error)
                    this.llenarConsulta(objects || []);
                callback(false);
            },
        });
    }
    llenarConsulta(Dcyt) {
        this.Consulta = [];
        Dcyt.map((consulta) => this.Consulta.push(new Cl_mConsulta(consulta)));
    }
}
