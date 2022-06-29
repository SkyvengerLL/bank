import { Account } from "../../models/account";
import { v4 } from "uuid";

class AccountValidator {
   public errors: string;
   public validAccount: Account

   public constructor (account:Account){
      this.errors = "";
      this.validAccount = this.validation(account);
   }

   private validation (account:Account) : Account{
      if (account.account.length === 0){
         this.errors += "number: field required";
      }else if (account.account.length !== 9){
         this.errors += "number: invalid input";
      }
      
      if (account.accountcheck.length === 0){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "Account cheker: field required";
      }else if (account.accountcheck.length !== 2){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "Account cheker: invalid input";
      }

      if (account.unit.length === 0){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "Unit: field required";
      }else if (account.unit.length !== 3){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "Unit:invalid unit";
      }

      if (account.unitcheck.length === 0){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "Unit Checker: field required";
      }else if (account.unitcheck.length !== 1){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "Unit Checker: invalid checker";
      }

      if (this.errors !== "") {
         return {
            id: ""
         }as Account;
      }else{
         account.id = `{${v4()}}`
         return account;
      }
   }
}

export {AccountValidator};