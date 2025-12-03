export interface iConsulta {
    id?: string;
    codigoExperto: string; 
    grupo: string;
    pregunta: string;
    respuesta?: string | null;
}

export default class Cl_mConsulta {
    private _id: string;
    private _codigoExperto: string = ''; 
    private _grupo: string = '';
    private _pregunta: string = '';
    private _respuesta: string | null = null;

    constructor({
        id,
        codigoExperto,
        grupo,
        pregunta,
        respuesta = null
    }: iConsulta) {
        this._id = id ? id : Date.now().toString();
        this.codigoExperto = codigoExperto;
        this.grupo = grupo;
        this.pregunta = pregunta;
        this._respuesta = respuesta;
    }

    public get id(): string { return this._id; }
    
    public get codigoExperto(): string { return this._codigoExperto; }
    public set codigoExperto(codigoExperto: string) { this._codigoExperto = codigoExperto.trim(); }

    public get grupo(): string { return this._grupo; }
    public set grupo(grupo: string) { this._grupo = grupo.trim(); }

    public get pregunta(): string { return this._pregunta; }
    public set pregunta(pregunta: string) { this._pregunta = pregunta; }

    public get respuesta(): string | null { return this._respuesta; }
    public set respuesta(respuesta: string | null) { this._respuesta = respuesta; }

    error(): string | false {
        if (this._codigoExperto.length !== 4) return "Seleccione un experto válido";
        
        if (this._grupo.length === 0) return "El código del grupo es obligatorio (Ej: T001)";

        if (this._pregunta.length < 5) return "La pregunta es muy corta";
        return false;
    }

    toJSON(): iConsulta {
        return {
            id: this._id,
            codigoExperto: this._codigoExperto,
            grupo: this._grupo,
            pregunta: this._pregunta,
            respuesta: this._respuesta
        };
    }
}