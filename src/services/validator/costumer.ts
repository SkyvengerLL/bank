import { Costumer } from "../../models/costumer";
import { v4 } from "uuid";

class CostumerValidator {
   public errors: string;
   public validCustomer: Costumer

   public constructor (costumer:Costumer){
      this.errors = "";
      this.validCustomer = this.validation(costumer);
   }

   private validation (costumer:Costumer) : Costumer{
      const cpfregex = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;
      const emailregex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
      const divided = costumer.name.split('/');
      const totalChars = divided.reduce((accumulator, current) => accumulator + current.length, 0 );
      
      if (totalChars === 0){
         this.errors += "name: field required";
      }else if (totalChars < 3){
         this.errors += "name: name too short";
      }
      
      if (costumer.birthday.length === 0){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "Date: field required";
      }else if (!new Date(costumer.birthday).getTime()){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "birthdate:invalid date";
      }

      if (costumer.cpf.length === 0){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "cpf: field required";
      }else if (!cpfregex.test(costumer.cpf)){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "cpf:invalid cpf";
      }

      if (costumer.email.length === 0){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "email: field required";
      }else if (!emailregex.test(costumer.email)){
         if (this.errors !== "") {
            this.errors += ", ";
         }
         this.errors += "email:invalid email";
      }

      if (this.errors !== "") {
         return {
            id: "",
            name: "",
            email: "",
            birthday: "",
            cpf: ""
         };
      }else{
         costumer.id = `{${v4()}}`
         return costumer;
      }
   }
}

export {CostumerValidator};