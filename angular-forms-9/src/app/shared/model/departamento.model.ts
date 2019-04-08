import { IMunicipio } from '../model/municipio.model';

export interface IDepartamento {
    id?: number;
    nomeDepartamento?: string;
    siglaDepartamento?: string;
    cnpj?: string;
    municipio?: IMunicipio;
}

export class Departamento implements IDepartamento {
    constructor(
        public id?: number,
        public nomeDepartamento?: string,
        public siglaDepartamento?: string,
        public cnpj?: string,
        public municipio?: IMunicipio
    ) {}
}
