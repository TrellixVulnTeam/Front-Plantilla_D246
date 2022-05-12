export class DmProcesado {

  public data: DatoExpandido[] = [];

  constructor(
    datoRecivido ? : string, //DatoExpandido[];
    public idMaestro ? : number,
    public idRelacion ? : number, //deppt = lista dpt
    public NuPosition ? : number, //posicion
    public Titulo ? : string
  ) {
    if (datoRecivido) {
      const datoRecividoArray = JSON.parse(datoRecivido);

      for (let i = 0; i < datoRecividoArray.length; i++) {

        let arrSize = Object.keys(datoRecividoArray[i]).length-1;

        let tmpDato: DatoExpandido = {
          idPosition: i,
          txValor: datoRecividoArray[i][0].toString().trim(),
          habilitado: !!parseInt(datoRecividoArray[i][arrSize])
        }

        if(Object.keys(datoRecividoArray[i]).length > 2){
          // console.log('indica')
          // console.log(datoRecividoArray)
          tmpDato.idRelacion = parseInt(datoRecividoArray[i][arrSize-1].toString().trim());
        }
        this.data.push(tmpDato)
      }
      // console.log(this.data)
    }
  }

}

export interface DatoExpandido {
  idPosition: number;
  txValor: string;
  idRelacion?: number;
  habilitado: boolean;
}
