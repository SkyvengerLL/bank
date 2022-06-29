class NameValidator {
   private error: string;
   private name: string;

   public constructor (name:string){
      this.error = "";
      this.name = this.validation(name);
   };

   public getName (): string{
      return this.name;
   }

   public getError (): string{
      return this.error;
   }

   private validation (name:string): string {
      const divided = name.split('/');
      const totalChars = divided.reduce((accumulator, current) => accumulator + current.length, 0 );
      if (totalChars === 0){
         this.error += "name: field required";
         return "";
      }

      if (totalChars < 3){
         this.error += "name: name too short";
         return "";
      }

      return divided.reduce((accumulator, current) => { if (current.length > 0) accumulator += current + ' '; return accumulator} , '').slice(0, -1);
   };
};

export { NameValidator };