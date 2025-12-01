export interface iExperto {
    codigo: string;
    nombre: string;
    area: string;
    cargo: string;
    respuesta: string;
}

export default class Cl_mExperto {
   private _codigo: string = "";
   private _nombre: string = "";
   private _area: string = "";
   private _cargo: string = "";
   private _respuesta: string = "";

   constructor({ codigo, nombre, area, cargo, respuesta }: iExperto) {
      this.codigo = codigo;
      this.nombre = nombre;
      this.area = area;
      this.cargo = cargo;
      this.respuesta = respuesta;
   }

   public get codigo(): string {
      return this._codigo;
   }
   public set codigo(codigo: string) {
      this._codigo = codigo.trim();
   }
   public get nombre(): string {
      return this._nombre;
   }
   public set nombre(nombre: string) {
      this._nombre = nombre.trim().toUpperCase();
   }
   public get area(): string {
      return this._area;
   }
   public set area(area: string) {
      this._area = area;
   }
   public get cargo(): string {
      return this._cargo;
   }
   public set cargo(cargo: string) {
      this._cargo = cargo;
   }
   public get respuesta(): string {
      return this._respuesta;
   }
   public set respuesta(respuesta: string) {
      this._respuesta = respuesta;
   }

   error(): string | false {
      if (this._codigo.length === 4) {
         return "El código es requerido";
      }
      if (this._nombre.length === 0) {
         return "El nombre no puede estar vacío";
      }
      const area = ["Desarrollo de software", "Desarrollo de hardware", "Desarrollo de redes"];
      if (!area.includes(this._area)) {
         return "El área no es válida";
      }
      if (this._cargo === "") {
         return "El cargo no puede estar vacío";
      }
      if (this._respuesta === "") {
         return "La respuesta no puede estar vacía";
      }
      return false;
   }

   toJSON(): iExperto {
      return {
         codigo: this._codigo,
         nombre: this._nombre,
         area: this._area,
         cargo: this._cargo,
         respuesta: this._respuesta,
      };
   }
   
}