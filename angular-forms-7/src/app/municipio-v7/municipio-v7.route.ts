import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MunicipioV7Service } from './municipio-v7.service';
import { MunicipioV7Component } from './municipio-v7.component';
import { IMunicipio, Municipio } from '../shared/model/municipio.model';
import {MunicipioListComponent} from './municipio-list.component';

@Injectable({ providedIn: 'root' })
export class MunicipioResolve implements Resolve<IMunicipio> {
    constructor(private service: MunicipioV7Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((municipio: HttpResponse<Municipio>) => municipio));
        }
        return of(new Municipio());
    }
}

export const municipioRoute: Routes = [
    {
        path: 'municipios',
        component: MunicipioListComponent
    },
    {
        path: 'municipio/new',
        component: MunicipioV7Component,
        resolve: {
            municipio: MunicipioResolve
        }
    },
    {
        path: 'municipio/:id/edit',
        component: MunicipioV7Component,
        resolve: {
            municipio: MunicipioResolve
        }

    }
];

