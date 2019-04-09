import { Injectable } from '@angular/core';
import { IEmpregado, Empregado } from '../shared/model/empregado.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpregadoV9Service {
  constructor(private http: HttpClient) {}

  private empregadoUrl = '/api/empregados';


  createEmpregado(empregado: IEmpregado): any {
    return this.http.post<IEmpregado>(this.empregadoUrl , empregado);
  }
  getEmpregados(): any {
    return this.http.get<IEmpregado[]>(this.empregadoUrl );
  }
  deleteEmpregado(empregado: IEmpregado): any {
      return this.http.delete(this.empregadoUrl + '/' + empregado.id);
  }
  updateEmpregado(empregado: IEmpregado): any {
    return this.http.put<IEmpregado>(this.empregadoUrl , empregado);
  }
  find(id: any): any {
    return this.http.get<IEmpregado>(this.empregadoUrl + '/' + id);
}


}
