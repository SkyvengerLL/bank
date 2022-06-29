class CpfValidator{
   private cpf : string;
   private error: string;
   
   public constructor (cpf:string){
      this.error = "";
      this.cpf = this.validation(cpf);
   };

   public getCpf (): string{
      return this.cpf;
   }

   public getError (): string{
      return this.error;
   }

   private validation (cpf: string): string { 
      const regex = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;
      if (cpf.length === 0){
         this.error += "cpf: field required";
         return "";
      }

      if (!regex.test(cpf)){
         this.error += "cpf:invalid cpf";
         return "";
      }

      return cpf;
   }
}

export { CpfValidator };