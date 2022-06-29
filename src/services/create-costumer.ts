import { Costumer } from "../models/costumer";
import { APIResponse } from "../models/response";
import { CostumerValidator } from "./validator/costumer";
import {PostgresBD} from "../bd/postgresAccount"
import {ExceptionTreatment} from "../utils"

class CreateCostumer{
   public async execute (costumer: Costumer): Promise<APIResponse>{
      try {
         const validation = new CostumerValidator (costumer);
         if (validation.validCustomer.id === ""){
            throw new Error(`400 : ${validation.errors}`);
         }
         if(await new PostgresBD().insertCostumer(validation.validCustomer)){
            return {
               data: validation.validCustomer,
               messages: []
            } as APIResponse
         }else{
            return {
               data: {},
               messages: ["an error occurred with costumer insertion"]
            } as APIResponse
         }
         
      } catch (error) {
         throw new ExceptionTreatment(error as Error,500,"an error occurred during costumer insertion on database");
      }

   }
}

export {CreateCostumer};