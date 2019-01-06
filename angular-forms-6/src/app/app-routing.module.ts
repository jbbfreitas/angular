import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {municipioRoute} from './municipio-v6/municipio-v6.route';
/*
const routes: Routes = [
  { path: 'municipios', component: MunicipioListComponent },
  { path: 'municipio/new', component: MunicipioV5Component }
];
*/

@NgModule({
  imports: [RouterModule.forRoot(municipioRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




/*
@Injectable({ providedIn: 'root' })
export class MunicipioResolve implements Resolve<IMunicipio> {
    constructor(private service: MunicipioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((municipio: HttpResponse<Municipio>) => municipio.body));
        }
        return of(new Municipio());
    }
}

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#EstudoDeCasoAdminModule'
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
*/
