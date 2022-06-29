import {PostgresBD} from "../bd/postgresAccount"
import { PostgresBDT } from "../bd/postgresTransactions";
import {ExceptionTreatment} from "../utils"

class GetExtract{
   public async execute (account: string): Promise<any>{
      try {
         const extract = {
            "balanceAccount": await new PostgresBD().getBalance(account),
            "trasactions": await new PostgresBDT().getTransactions(account)
         };
         return extract;
      } catch (error) {
         throw new ExceptionTreatment(error as Error,500,"an error occurred during the validation");
      }

   }
}

export {GetExtract};