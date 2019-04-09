import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmpregadoV9Service } from './empregado-v9.service';
import { EmpregadoV9Component } from './empregado-v9.component';
import { IEmpregado, Empregado } from '../shared/model/empregado.model';
import {EmpregadoListComponent} from './empregado-list.component';

@Injectable({ providedIn: 'root' })
export class EmpregadoResolve implements Resolve<IEmpregado> {
    constructor(private service: EmpregadoV9Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((empregado: HttpResponse<Empregado>) => empregado));
        }
        return of(new Empregado());
    }
}

export const empregadoRoute: Routes = [
    {
        path: 'empregados',
        component: EmpregadoListComponent
    },
    {
        path: 'empregado/new',
        component: EmpregadoV9Component,
        resolve: {
            empregado: EmpregadoResolve
        }
    },
    {
        path: 'empregado/:id/edit',
        component: EmpregadoV9Component,
        resolve: {
            empregado: EmpregadoResolve
        }

    }
];

