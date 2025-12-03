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

  agregarExperto({ expertoData, callback }: { expertoData: iExperto; callback: Function }): void {
    this.modelo.agregarExperto({
      experto: new Cl_mExperto(expertoData),
      callback: (error) => callback(error),
    });
  }

  eliminarExperto({ codigo, callback }: { codigo: string; callback: Function }): void {
      this.modelo.eliminarExperto({
          codigo: codigo,
          callback: (error) => callback(error)
      });
  }

  obtenerReporteRendimiento() {
      return this.modelo.reportarRendimiento();
  }

  obtenerListaExpertos(): iExperto[] {
    return this.modelo.listarExpertos();
  }

  obtenerHistorialExperto(codigoExperto: string): iConsulta[] {
      return this.modelo.listarHistorialPorExperto(codigoExperto);
  }

  enviarConsulta({ consultaData, callback }: { consultaData: iConsulta; callback: Function }): void {
    this.modelo.agregarConsulta({
      consulta: new Cl_mConsulta(consultaData),
      callback: (error) => callback(error),
    });
  }

  obtenerConsultasPendientes(codigoExperto: string): iConsulta[] {
      return this.modelo.listarConsultasPendientes(codigoExperto);
  }

  responderConsulta({ idConsulta, respuesta, callback }: { idConsulta: string, respuesta: string, callback: Function }): void {
      this.modelo.responderConsulta({
          idConsulta,
          respuesta,
          callback: (error) => callback(error)
      });
  }

  activarVista({ vista }: { vista: string }): void {
    if (this.vista) this.vista.activarVista({ vista });
  }
}