export interface iExperto {
    codigo: string;
    nombre: string;
    area: string;
    cargo: string;
}

export default class Cl_mExperto {
   private _codigo: string = "";
   private _nombre: string = "";
   private _area: string = "";
   private _cargo: string = "";

   constructor({ codigo, nombre, area, cargo }: iExperto) {
      this.codigo = codigo;
      this.nombre = nombre;
      this.area = area;
      this.cargo = cargo;
   }

   public get codigo(): string { return this._codigo; }
   public set codigo(codigo: string) { this._codigo = codigo.trim(); }

   public get nombre(): string { return this._nombre; }
   public set nombre(nombre: string) { this._nombre = nombre.trim().toUpperCase(); }

   public get area(): string { return this._area; }
   public set area(area: string) { this._area = area; }

   public get cargo(): string { return this._cargo; }
   public set cargo(cargo: string) { this._cargo = cargo; }

   error(): string | false {
      if (this._codigo.length !== 4) return "El código debe tener 4 caracteres";
      if (this._nombre.length === 0) return "El nombre no puede estar vacío";
      if (this._area === "") return "Seleccione un área";
      if (this._cargo === "") return "El cargo no puede estar vacío";
      return false;
   }

   toJSON(): iExperto {
      return {
         codigo: this._codigo,
         nombre: this._nombre,
         area: this._area,
         cargo: this._cargo
      };
   }
}