import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpEmpleadosService {

  constructor(protected http:HttpClient) { }

  getEmpleados(){
    return this.http.get('http://127.0.0.1:8000/api/empleados',{responseType:'json'});

  }

  createEmpleado(data:any){
    return this.http.post('http://127.0.0.1:8000/api/agregar',data,{responseType:'json'});
  }
  deleteEmpleado(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/empleados/${id}`, { responseType: 'json' });
}
updateEmpleado(id: number, data: any) {
  return this.http.put(`http://127.0.0.1:8000/api/empleados/${id}`, data, { responseType: 'json' });
}
}
