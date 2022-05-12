import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {

  // readonly APIUrl = "https://localhost:7118/api";
  readonly APIUrl = "https://localhost:44339";
  private readonly ApiGateway = 'http://181.129.245.90:8165';

  constructor(private http:HttpClient) { }


  //https://localhost:44339/api/Afiliados/GuardarAfiliado
  prueba(val:any){
    // return this.http.post<any>(this.APIUrl+'/api/Afiliados/GuardarAfiliado', val).subscribe(
    return this.http.post<any>(this.ApiGateway+'/Afiliados/Guardar', val).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
