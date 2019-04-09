import { Injectable } from '@angular/core';
import { IDepartamento, Departamento } from '../shared/model/departamento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };


@Injectable({
  providedIn: 'root'
})
export class DepartamentoV8Service {
  constructor(private http: HttpClient) {}

  private departamentoUrl = '/api/departamentos';


  createDepartamento(departamento: IDepartamento): any {
    return this.http.post<IDepartamento>(this.departamentoUrl , departamento);
  }
  getDepartamentos(): any {
    return this.http.get<IDepartamento[]>(this.departamentoUrl );
  }
  deleteDepartamento(departamento: IDepartamento): any {
      return this.http.delete(this.departamentoUrl + '/' + departamento.id);
  }
  updateDepartamento(departamento: IDepartamento): any {
    return this.http.put<IDepartamento>(this.departamentoUrl , departamento);
  }
  find(id: any): any {
    return this.http.get<IDepartamento>(this.departamentoUrl + '/' + id);
}


}
