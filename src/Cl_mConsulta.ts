export interface iConsulta {
    codigoExperto:string; 
    grupo:string;
    pregunta:string;
}

export default class Cl_mConsulta {
    public _codigoExperto:string = ''; 
    public _grupo:string = '';
    public _pregunta:string = '';

    constructor({
        codigoExperto,
        grupo,
        pregunta
    }:iConsulta) {
        this.codigoExperto = codigoExperto;
        this.grupo = grupo;
        this.pregunta = pregunta;
    }
   public get codigoExperto(): string {
        return this._codigoExperto;
    }
    public set codigoExperto(codigoExperto: string) {
        this._codigoExperto = codigoExperto;
    }
    public get grupo(): string {
        return this._grupo;
    }
    public set grupo(grupo: string) {
        this._grupo = grupo;
    }
    public get pregunta(): string {
        return this._pregunta;
    }
    public set pregunta(pregunta: string) {
        this._pregunta = pregunta;
    }

    error(): string | false {
        if (this._codigoExperto.length === 4) {
            return "El código del experto no coincide con el de la base de datos";
        }
        const grupo = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        if (!grupo.includes(this._grupo)) {
            return "El grupo debe ser un número entre 1 y 10";
        }
        const pregunta = ["1"];
        if (this._pregunta.length === 0) {
            return "La pregunta no puede estar vacía";
        }
        return false;
    }

    toJSON(): iConsulta {
        return {
            codigoExperto: this._codigoExperto,
            grupo: this._grupo,
            pregunta: this._pregunta
        };
    }

}