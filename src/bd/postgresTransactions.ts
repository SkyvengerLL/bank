import { Client } from "pg";
import { config } from "../config";
import { Transaction } from "../models/transactions";

class PostgresBDT {
   private client: Client;

   public constructor (){
      this.client = new Client({
         connectionString: config.dbstring
      });
   }

   public async insertTransaction (transaction:Transaction, type: Number, balance: number): Promise<boolean>{
      try {
         this.client.connect();
         const query = `INSERT INTO transition (uniid, time, code, value, fgk_account) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id`;
         
         const result = await this.client.query(query, [transaction.id, transaction.time, type, balance,transaction.account]);

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

   public async getTransactions (account:string): Promise <any[]>{
      try{
         this.client.connect();
         const query = `SELECT uniid as id, time as time, code as code, value as value, fgk_account as account
         FROM transition
         WHERE fgk_account=$1`

         const result = await this.client.query(query, [account]);
         this.client.end();

         return result.rows;

      } catch (error) {
         console.log(error)
         this.client.end();
         throw new Error("503: service temporarily unavailable");
      }
   }

   public async updateBalance (account:string, balance: number) : Promise<boolean>{
      try {
         this.client.connect();
         const query = `UPDATE account SET balance=$1 WHERE account=$2`;
         
         const result = await this.client.query(query, [balance, account]);

         this.client.end();

         if (result.rows.length){
            return false;
         }else{
            return true;
         }
      } catch (error) {
         console.log(error)
         this.client.end();
         throw new Error("503: service temporarily unavailable");
      }
   }
}

export {PostgresBDT};