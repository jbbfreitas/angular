import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartamentoV8Service } from './departamento-v8.service';
import { DepartamentoV8Component } from './departamento-v8.component';
import { IDepartamento, Departamento } from '../shared/model/departamento.model';
import {DepartamentoListComponent} from './departamento-list.component';

@Injectable({ providedIn: 'root' })
export class DepartamentoResolve implements Resolve<IDepartamento> {
    constructor(private service: DepartamentoV8Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((departamento: HttpResponse<Departamento>) => departamento));
        }
        return of(new Departamento());
    }
}

export const departamentoRoute: Routes = [
    {
        path: 'departamentos',
        component: DepartamentoListComponent
    },
    {
        path: 'departamento/new',
        component: DepartamentoV8Component,
        resolve: {
            departamento: DepartamentoResolve
        }
    },
    {
        path: 'departamento/:id/edit',
        component: DepartamentoV8Component,
        resolve: {
            departamento: DepartamentoResolve
        }

    }
];

