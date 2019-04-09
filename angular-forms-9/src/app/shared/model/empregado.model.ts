import { Moment } from 'moment';
import { IMunicipio } from '../model/municipio.model';
import { IDepartamento } from '../model/departamento.model';

export interface IEmpregado {
    id?: number;
    nomeEmpregado?: string;
    dataNascimento?: Moment;
    cpf?: string;
    dataAdmissao?: Moment;
    dataDemissao?: Moment;
    dataObito?: Moment;
    municipioNascimento?: IMunicipio;
    municipioResidencial?: IMunicipio;
    departamento?: IDepartamento;
}

export class Empregado implements IEmpregado {
    constructor(
        public id?: number,
        public nomeEmpregado?: string,
        public dataNascimento?: Moment,
        public cpf?: string,
        public dataAdmissao?: Moment,
        public dataDemissao?: Moment,
        public dataObito?: Moment,
        public municipioNascimento?: IMunicipio,
        public municipioResidencial?: IMunicipio,
        public departamento?: IDepartamento
    ) {}
}
