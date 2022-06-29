import { CpfValidator, DateValidator, EmailValidator, NameValidator } from ".";
import { Customer } from "../../models";

class CustomerValidatio{
   private errors: string;
   private pass: boolean;
   
   public constructor (customer: Customer){
      this.errors = "";
      this.pass = this.validation(customer);
   }

   public getErrors (): string{
      return this.errors
   }

   private validation (customer: Customer): boolean{
      const cpfStatus = new CpfValidator(customer.cpf);
      const birthStatus = new DateValidator(customer.birthday);
      const emailStatus = new EmailValidator(customer.email);
      const nameStatus = new NameValidator(customer.name);
      
      this.errors += `cpf: ${cpfStatus.getError()}, birthday: ${birthStatus.getError()}, email: ${emailStatus.getError()}, name: ${nameStatus.getError()}`;

      const valid = this.errors.split(', ').reduce((accumulative, current) =>{
         if (accumulative){
            const error = current.split(": ");
            if (error[1].length > 0){
               return false;
            }
            return true;
         }
         return false
      }, true);

      return valid;
   }
}

