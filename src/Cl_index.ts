import Cl_controlador from "./Cl_controlador.js";
import Cl_mDcyt from "./Cl_mDcyt.js";
import Cl_vDcyt from "./Cl_vDcyt.js";

export default class Cl_index {
  constructor() {
    let modelo = new Cl_mDcyt();
    modelo.cargarDatosIniciales((error: string | false) => {
      if (error) {
          alert("Error crítico de conexión: " + error);
          return;
      }
      let vista = new Cl_vDcyt();
      let controlador = new Cl_controlador(modelo, vista);
      vista.controlador = controlador;
      vista.refresh();
    });
  }
}