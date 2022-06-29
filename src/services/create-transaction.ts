import { APIResponse } from "../models/response";
import { TransactionValidator } from "./validator/transaction";
import {PostgresBDT} from "../bd/postgresTransactions";
import {CheckAccount, CheckMoney } from "../services";
import {ExceptionTreatment} from "../utils";
import {Transaction} from "../models/transactions";

class CreateTransaction{
   public async execute (transaction: Transaction, type: Number): Promise<APIResponse>{
      try {
         if (await new CheckAccount().execute(transaction.account)){
            throw new Error(`400 : account not found`);
         }
         const [coin, cent] = transaction.value.split(",");
         let value = 0;
         switch (type){
            case 0:
               value = -((Number(coin)*100) + Number(cent));
               break;
            case 1:
               value = -Math.floor(((Number(coin)*100) + Number(cent))/100);
               break;
            case 2:
               value = (Number(coin)*100) + Number(cent) + 100;
               break;
            case 3:
               value = (Number(coin)*100) + Number(cent) + 400;
               break;
         }

         const newbalance = (await new CheckMoney().execute(transaction.account, value));
         if ( newbalance < 0){
            throw new Error(`400 : not enougth money on balance`);
         }
         const validation = new TransactionValidator (transaction);
         if (validation.validTransaction.id === ""){
            throw new Error(`400 : ${validation.errors}`);
         }
         if(await new PostgresBDT().insertTransaction(validation.validTransaction, type, value)){
            if (await new PostgresBDT().updateBalance(validation.validTransaction.account, newbalance)){
               return {
                  data: validation.validTransaction,
                  messages: []
               } as APIResponse
            }else{
               throw new Error ("Error in updating balance");
            }
            
         }else{
            return {
               data: {},
               messages: ["an error occurred with the transition insertion"]
            } as APIResponse
         }
         
      } catch (error) {
         throw new ExceptionTreatment(error as Error,500,"an error occurred during Transition insertion on database");
      }

   }
}

export {CreateTransaction};