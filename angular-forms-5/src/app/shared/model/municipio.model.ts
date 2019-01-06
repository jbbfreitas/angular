export const enum Estado {
    MT = 'MT',
    SP = 'SP',
    RJ = 'RJ',
    RS = 'RS',
    RN = 'RN',
    GO = 'GO',
    SC = 'SC',
    MA = 'MA',
    TO = 'TO',
    AM = 'AM',
    PA = 'PA',
    PR = 'PR',
    MG = 'MG',
    BA = 'BA',
    SE = 'SE',
    AL = 'AL',
    RR = 'RR',
    RO = 'RO',
    AC = 'AC',
    PI = 'PI',
    PE = 'PE',
    CE = 'CE'
}

export interface IMunicipio {
    id?: number;
    nomeMunicipio?: string;
    uf?: Estado;
}

export class Municipio implements IMunicipio {
    constructor(public id?: number, public nomeMunicipio?: string, public uf?: Estado) {}
}
