import { Injectable } from '@angular/core';

//imported libraries
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, timer} from 'rxjs';
import { catchError, delayWhen, retryWhen, scan} from 'rxjs/operators';
//import { DatosMaestros } from '../modelos/dato-maestro/dato-maestro.model';
import { DatosMaestros } from '../models/datos-maestros/dato-maestro.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Acces-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

const maxRequest = 3; //total = 4 (primer intento + reintento)

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  //private readonly APIUrl2 = "https://localhost:7043/api";
  //Maestros: 7043, APIUrl: 7118
  // private readonly APIUrl = "https://localhost:8081/api";
  // private readonly APIUrlContratos = "https://localhost:7235/Contratos";
  // private readonly APIUrlDatosMaestros = 'https://localhost:8083/api/DatosMaestrosLogic/LogicDataMaster';

  // private readonly ApiGateway = 'http://localhost:8165';
  private readonly ApiGateway = 'http://181.129.245.90:8165';

  //Prefijos de Servicios:
  private readonly _afiliados = '/Afiliados';
  private readonly _datosMaestros = '/DatosMaestros';
  private readonly _contratos = '/Contratos';


  constructor(private http:HttpClient) { }

  getDatosMaestros():Observable<DatosMaestros[]>{
    return this.http.get<DatosMaestros[]>(this.ApiGateway + this._datosMaestros, {
      params:  new HttpParams().set('TitleDad', '*'),
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        ))
      );
  }


  getListaAfiliado():Observable<any>{
    return this.http.get<any>(this.ApiGateway+ this._afiliados, {
      params:  new HttpParams().set('key', '*'),
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        ))
      );
  }

  setConsentimientoDatos(consentimientoRespuesta: boolean):Observable<boolean>{
    return this.http.post<boolean>(this.ApiGateway+ this._afiliados+'/ConsentimientoDatos',
      consentimientoRespuesta , {
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              console.log(error)
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        )),
        catchError(this.handleError)
      );
  }


  setValidarAfiliacion(data: any):Observable<boolean>{
    return this.http.post<any>(this.ApiGateway + this._afiliados + '/ValidarAfiliacion', data , {
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              console.log(error)
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        )),
        catchError(this.handleError)
      );
  }


  setSoporteDivisionSalarialAfiliacion(data: any):Observable<boolean>{
    return this.http.post<any>(this.ApiGateway + this._afiliados +'/SoporteDivisionSalarial', data , {
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              console.log(error)
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        )),
        catchError(this.handleError)
      );
  }

  setAceptarAfiliacion(data: any):Observable<boolean>{
    return this.http.post<any>(this.ApiGateway + this._afiliados+'/AceptarAfiliacion', data , {
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              console.log(error)
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        )),
        catchError(this.handleError)
      );
  }

  setRechazarAfiliacion(data: any):Observable<boolean>{
    return this.http.post<any>(this.ApiGateway + this._afiliados + '/RechazarAfiliacion', data , {
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              console.log(error)
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        )),
        catchError(this.handleError)
      );
  }

  setAprobarAfiliacion(data: any):Observable<boolean>{
    return this.http.post<any>(this.ApiGateway + this._afiliados + '/AprobarAfiliacion', data , {
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              console.log(error)
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        )),
        catchError(this.handleError)
      );
  }

















  getPreguntasDeclaratorias():Observable<any>{
    return this.http.get<any>(this.ApiGateway + this._afiliados + '/PreguntasDeclaratorias', {
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        ))
      );
  }



  getMedicamentos():Observable<any>{
    return this.http.get<any>(this.ApiGateway + this._contratos+'/Medicamentos', {
      headers: httpOptions.headers
    })
      .pipe(
        retryWhen(error => error.pipe(
          scan(retryCount => {
            if(retryCount >= maxRequest) throw error
            else {
              retryCount++;
              return retryCount
            }
          }, 0),      // inicia a contar desde 0
          delayWhen(() => timer(1000)) //timer en ms (1 segundo)
        ))
      );
  }













  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }





  ///
  // NO SE USA
  // getDepartamentos():Observable<any[]>{
  //   return this.http.get<any[]>(this.ApiGateway + this._datosMaestros+'/Departamento', httpOptions)
  //     .pipe(  //se usa para unir metodos
  //       retryWhen(error => error.pipe(        //retry condicional (x veces)
  //         scan(retryCount => {
  //           if(retryCount >= maxRequest) throw error
  //           else {
  //             retryCount++;
  //             return retryCount
  //           }
  //         }, 0),      // inicia a contar desde 0
  //         delayWhen(() => timer(1000)) //timer en ms (1 segundo), delay para retry
  //       ))
  //     )
  // }


  // getCiudades(index: number):Observable<any[]>{
  //   return this.http.get<any>(this.ApiGateway + this._datosMaestros,
  //     {
  //       headers: httpOptions.headers,
  //       params: new HttpParams().set('cities_position', index)
  //     })
  //     .pipe(
  //       retryWhen(error => error.pipe(
  //         scan(retryCount => {
  //           if(retryCount >= maxRequest) throw error
  //           else {
  //             retryCount++;
  //             return retryCount
  //           }
  //         }, 0),      // inicia a contar desde 0
  //         delayWhen(() => timer(1000)) //timer en ms (1 segundo)
  //       ))
  //     );
  // }

  // getRHS():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/DatosMaestros/RH',httpOptions)
  //     .pipe(
  //       retryWhen(error => error.pipe(
  //         scan(retryCount => {
  //           if(retryCount >= maxRequest) throw error
  //           else {
  //             retryCount++;
  //             return retryCount
  //           }
  //         }, 0),      // inicia a contar desde 0
  //         delayWhen(() => timer(1000)) //timer en ms (1 segundo)
  //       ))
  //     );
  // }

  // getNacionalidades():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/DatosMaestros/Nacionalidades',httpOptions)
  //     .pipe(
  //       retryWhen(error => error.pipe(
  //         scan(retryCount => {
  //           if(retryCount >= maxRequest) throw error
  //           else {
  //             retryCount++;
  //             return retryCount
  //           }
  //         }, 0),      // inicia a contar desde 0
  //         delayWhen(() => timer(1000)) //timer en ms (1 segundo)
  //       ))
  //     );
  // }


}
