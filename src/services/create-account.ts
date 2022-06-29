import { APIResponse } from "../models/response";
import { AccountValidator } from "./validator/account";
import {PostgresBD} from "../bd/postgresAccount"
import {ExceptionTreatment} from "../utils"
import { Account } from "../models/account";

class CreateAccount{
   public async execute (account: Account): Promise<APIResponse>{
      try {
         const validation = new AccountValidator (account);
         if (validation.validAccount.id === ""){
            throw new Error(`400 : ${validation.errors}`);
         }
         if(await new PostgresBD().insertAccount(validation.validAccount)){
            return {
               data: validation.validAccount,
               messages: []
            } as APIResponse
         }else{
            return {
               data: {},
               messages: ["an error occurred with the Account insertion"]
            } as APIResponse
         }
         
      } catch (error) {
         throw new ExceptionTreatment(error as Error,500,"an error occurred during Account insertion on database");
      }

   }
}

export {CreateAccount};