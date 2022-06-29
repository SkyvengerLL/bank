import {PostgresBD} from "../bd/postgresAccount"
import {ExceptionTreatment} from "../utils"

class CheckCostumer{
   public async execute (cpf: string): Promise<boolean>{
      try {
         return (await new PostgresBD().verifyCostumer(cpf));
      } catch (error) {
         throw new ExceptionTreatment(error as Error,500,"an error occurred during the validation");
      }

   }
}

export {CheckCostumer};