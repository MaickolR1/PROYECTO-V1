import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import  Cl_mExperto, { iExperto } from "./Cl_mExperto.js";
import Cl_mConsulta, { iConsulta } from "./Cl_mConsulta.js";

export interface iResultObjectsExpertos {
    objects:[iExperto] | null;
    error: string | false;
}
export interface iResultObjectsConsultas {
    objects:[iConsulta] | null;
    error: string | false;  
}

export default class Cl_mDcyt {
    private Dcyt: Cl_mExperto[] = [];
    private Consulta: Cl_mConsulta[] = [];
    private db: Cl_dcytDb;
    readonly tbDcyt: string = "Gestion de consultas a expertos"; 

    constructor() {
         this.db = new Cl_dcytDb({ aliasCuenta: "CODEBREAKERS" });
    }
    agregarExperto({
        experto,
        callback,
      }: {
        experto: Cl_mExperto;
        callback: (error: string | false) => void;
      }): void {
        let error = experto.error();
        if (error) {
          callback( error );
          return;
        }
        let existe = this.Dcyt.find((e) => e.codigo === experto.codigo);
        if (existe) {
          callback( "El experto ya se encuentra registrado" );
          return;
        }
        this.db.addRecord({
          tabla: this.tbDcyt,
          object: experto.toJSON(),
          callback: ({ id, objects, error }) => {
            if (error) this.llenarExperto( objects ); 
              callback?.(error);
          },
        });
    }
     cargarExpertos(callback: (error: string | false) => void): void {
    // Obtener los contactos desde la Web Storage
    this.db.listRecords({
      tabla: this.tbDcyt,
      callback: ({ objects, error }: iResultObjectsExpertos) => {
        if (!error) this.llenarExperto(objects || []);
        callback(false);
      },
    });
  }
  llenarExperto(Dcyt: iExperto[]) {
    this.Dcyt = [];
    Dcyt.map((experto) => this.Dcyt.push(new Cl_mExperto(experto)));
  }
  listar(): iExperto[] {
    return this.Dcyt.map((experto) => experto.toJSON());
  }
  agregarConsulta({
    consulta,
    callback,
  }: {
    consulta: Cl_mConsulta;
    callback: (error: string | false) => void;
  }): void {
    let error = consulta.error();
    if (error) {
      callback( error );
      return;
    }
    let existe = this.Consulta.find((e) => e.codigoExperto === consulta.codigoExperto);
    if (existe) {
      callback( "La consulta ya se encuentra registrada" );
      return;
    }
    this.db.addRecord({
      tabla: this.tbDcyt,
      object: consulta.toJSON(),
      callback: ({ id, objects, error }) => {
        if (error) this.llenarConsulta( objects ); 
          callback?.(error);
      },
    });
  }

  cargarConsultas(callback: (error: string | false) => void): void {
    // Obtener los contactos desde la Web Storage
    this.db.listRecords({
      tabla: this.tbDcyt,
      callback: ({ objects, error }: iResultObjectsConsultas) => {
        if (!error) this.llenarConsulta(objects || []);
        callback(false);
      },
    });
  }

  llenarConsulta(Dcyt: iConsulta[]) {
    this.Consulta = [];
    Dcyt.map((consulta) => this.Consulta.push(new Cl_mConsulta(consulta)));
  }
}