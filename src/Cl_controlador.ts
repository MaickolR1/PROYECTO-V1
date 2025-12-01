import Cl_mExperto, { iExperto } from "./Cl_mExperto.js";
import Cl_mDcyt from "./Cl_mDcyt.js";
import Cl_vDcyt from "./Cl_vDcyt.js";
import Cl_mConsulta, { iConsulta } from "./Cl_mConsulta.js";

export default class Cl_controlador {
  public modelo: Cl_mDcyt;
  public vista: Cl_vDcyt;
  constructor(modelo: Cl_mDcyt, vista: Cl_vDcyt) {
    this.modelo = modelo;
    this.vista = vista;
  }
  agregarExperto({
    expertoData,
    callback,
  }: {
    expertoData: iExperto;
    callback: Function;
  }): void {
    this.modelo.agregarExperto({
      experto: new Cl_mExperto(expertoData),
      callback: (error: string | false) => {
        callback(error);
      },
    });
  }
  expertosRegistrados(): iExperto[] {
    return this.modelo.listar();
  }
 responderPregunta({
    
    preguntaData,
    callback,
  }: {
    preguntaData: iExperto;
    callback: Function;
  }): void {
    this.modelo.agregarExperto({
    experto: new Cl_mExperto(preguntaData),
    callback: (error: string | false) => {
      callback(error);
    },
    });
  }
  enviarPregunta({
    
    preguntaData,
    callback,
  }: {
    preguntaData: iConsulta;
    callback: Function;
  }): void {
    this.modelo.agregarConsulta({
    consulta: new Cl_mConsulta(preguntaData),
    callback: (error: string | false) => {
      callback(error);
    },
    });
  }
}