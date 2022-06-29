import { Client } from "pg";
import { Costumer } from "../models/costumer";
import { config } from "../config";
import { Account } from "../models/account";

class PostgresBD{
   private client: Client;

   public constructor (){
      this.client = new Client({
         connectionString: config.dbstring
      });
   }

   public async insertCostumer (costumer:Costumer): Promise<boolean>{
      try {
         this.client.connect();
         const query = `INSERT INTO costumer (uniid, name, email, birthday, cpf) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id`;
         
         const result = await this.client.query(query, [costumer.id, costumer.name, costumer.email, costumer.birthday, costumer.cpf]);
         this.client.end();

         if (result.rows.length){
            return false;
         }else{
            return true;
         }
      } catch (error) {
         this.client.end();
         throw new Error("503: service temporarily unavailable");
      }
   }

   public async insertAccount (account:Account): Promise<boolean>{
      try {
         this.client.connect();
         const query = `INSERT INTO account (uniid, account, account_verifier, unit, unit_ver, balance, fgk_costumer) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING id`;

         
         
         const result = await this.client.query(query, [account.id, account.account, account.accountcheck, account.unit, account.unitcheck, 0, account.costumer]);
         this.client.end();

         if (result.rows.length){
            return true;
         }else{
            return false;
         }
      } catch (error) {
         console.log(error)
         this.client.end();
         throw new Error("503: service temporarily unavailable");
      }
   }

   public async verifyCostumer (cpf: string) : Promise<boolean>{
      try {
         this.client.connect();
         const query = `SELECT cpf FROM costumer WHERE CPF=$1;`;
         
         const result = await this.client.query(query, [cpf]);
         this.client.end();

         if (result.rowCount){
            return true;
         }else{
            return false;
         }
      } catch (error) {
         this.client.end();
         throw new Error("503: service temporarily unavailable");
      }
   }

   public async verifyAccount (account: string) : Promise<boolean>{
      try {
         this.client.connect();
         const query = `SELECT account FROM account WHERE account=$1;`;
         
         const result = await this.client.query(query, [account]);
         this.client.end();

         if (result.rowCount){
            return false;
         }else{
            return true;
         }
      } catch (error) {
         console.log(error);
         this.client.end();
         throw new Error("503: service temporarily unavailable");
      }
   }

   public async verifyMoney (account: string, value: number) : Promise<number>{
      try {
         this.client.connect();
         const query = `SELECT balance FROM account WHERE account=$1;`;
         
         const result = await this.client.query(query, [account]);
         this.client.end();

         return (result.rows[0].balance - value);
      } catch (error) {
         console.log(error);
         this.client.end();
         throw new Error("503: service temporarily unavailable");
      }
   }

   public async getBalance (account:string) : Promise<any>{
      try {
         this.client.connect();
         const query = `SELECT balance FROM account WHERE account=$1;`;
         
         const result = await this.client.query(query, [account]);
         this.client.end();

         return {"account": account, "balance":result.rows[0].balance};
      } catch (error) {
         console.log(error);
         this.client.end();
         throw new Error("503: service temporarily unavailable");
      }
   }
}

export {PostgresBD};