export class DatosMaestros {

  public nU_IDDATOMAESTRO_DM: number;
  public nU_IDRELACION_DM: string;
  public nU_POSITION_DM: string;
  public tX_TITULODATOMAESTRO_DM: string;
  public aR_DATO_DM: string;
  public tX_DADOFDAD_DM: string;

    constructor(nU_IDDATOMAESTRO_DM: number,
                nU_IDRELACION_DM: string,
                nU_POSITION_DM: string,
                tX_TITULODATOMAESTRO_DM: string,
                aR_DATO_DM: string,
                tX_DADOFDAD_DM: string) {

            this.nU_IDDATOMAESTRO_DM = nU_IDDATOMAESTRO_DM;
            this.nU_IDRELACION_DM = nU_IDRELACION_DM;
            this.nU_POSITION_DM = nU_POSITION_DM;
            this.tX_TITULODATOMAESTRO_DM = tX_TITULODATOMAESTRO_DM;
            this.aR_DATO_DM = aR_DATO_DM;
            this.tX_DADOFDAD_DM = tX_DADOFDAD_DM;
          }


  }
