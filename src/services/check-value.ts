import {PostgresBD} from "../bd/postgresAccount"
import {ExceptionTreatment} from "../utils"

class CheckMoney{
   public async execute (account: string, value: number): Promise<number>{
      try {
         return (await new PostgresBD().verifyMoney(account, value));
      } catch (error) {
         throw new ExceptionTreatment(error as Error,500,"an error occurred during the validation");
      }

   }
}

export {CheckMoney};