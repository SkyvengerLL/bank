class BirthdayValidator{
   private date : string;
   private error: string;
   
   public constructor (date:string){
      this.error = "";
      this.date = this.validation(date);
   };

   public getBirthdate (): string{
      return this.date;
   }

   public getError (): string{
      return this.error;
   }

   private validation (date: string): string { 
      if (date.length === 0){
         this.error += "field required";
         return "";
      }

      if (!new Date(date).getTime()){
         this.error += "birthdate:invalid date";
         return "";
      }

      return date;
   }
}

export { BirthdayValidator };