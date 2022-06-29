import {PostgresBD} from "../bd/postgresAccount"
import {ExceptionTreatment} from "../utils"

class CheckAccount{
   public async execute (account: string): Promise<boolean>{
      try {
         return (await new PostgresBD().verifyAccount(account));
      } catch (error) {
         throw new ExceptionTreatment(error as Error,500,"an error occurred during the validation");
      }

   }
}

export {CheckAccount};