class EmailValidator{
   private email : string;
   private error: string;
   
   public constructor (email:string){
      this.error = "";
      this.email = this.validation(email);
   };

   public getEmail (): string{
      return this.email;
   }

   public getError (): string{
      return this.error;
   }

   private validation (email: string): string {
      const regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/; 
      if (email.length === 0){
         this.error += "email: field required";
         return "";
      }

      if (!regex.test(email)){
         this.error += "email:invalid email";
         return "";
      }

      return email;
   }
}

export { EmailValidator };