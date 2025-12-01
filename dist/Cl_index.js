import Cl_controlador from "./Cl_controlador.js";
import Cl_mDcyt from "./Cl_mDcyt.js";
import Cl_vDcyt from "./Cl_vDcyt.js";
export default class Cl_index {
    constructor() {
        let modelo = new Cl_mDcyt();
        modelo.cargarExpertos((error) => {
            if (error)
                alert(error);
            if (error)
                throw new Error(error);
            let vista = new Cl_vDcyt();
            let controlador = new Cl_controlador(modelo, vista);
            vista.controlador = controlador;
            vista.refresh();
        });
    }
}
