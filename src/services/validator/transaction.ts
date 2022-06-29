import { Transaction } from "../../models/transactions";
import { v4 } from "uuid";

class TransactionValidator {
   public errors: string;
   public validTransaction: Transaction

   public constructor (transaction:Transaction){
      this.errors = "";
      this.validTransaction = this.validation(transaction);
   }

   private validation (transaction:Transaction) : Transaction{
      if (transaction.time.length === 0){
         this.errors += "Date: field required";
      }else {
         const time = transaction.time.split(" ");
         if (!new Date(time[0]).getTime()){
            this.errors += "Date:invalid date";
         }else{
            const hour = time[1].split(":");
            if (Number(hour[0]) < 0 || Number(hour[0]) > 23 ){
               this.errors += "Date:invalid time";
            }else if (Number(hour[1]) < 0 || Number(hour[1]) > 59 ){
               this.errors += "Date:invalid time";
            }else if (Number(hour[2]) < 0 || Number(hour[2]) > 59 ){
               this.errors += "Date:invalid time";
            }
         }
      }

      if (this.errors !== "") {
         return {
            id: ""
         } as Transaction;
      }else{
         transaction.id = `{${v4()}}`
         return transaction;
      }
   }
}

export {TransactionValidator};