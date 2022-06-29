import { Request, Response } from "express";
import { CreateCostumer, CheckCostumer, CreateAccount, CheckAccount } from "../services";
import { ResponseWriter } from "../utils";
import {Costumer} from "../models/costumer";
import { Account } from "../models/account";
import { APIResponse } from "../models/response";

class AccountCreator{
    public async handle (req: Request, res: Response)
    {
        try
        {
            const account = req.body.account as Account;
            if (await new CheckAccount().execute(account.account)){
                throw new Error(`300 : account already exists`);
            }
            const response = {response1: {} as APIResponse, response2: {} as APIResponse};
            if (await new CheckCostumer().execute(req.body.costumer.cpf)){
               response.response1 = await new CreateCostumer().execute(req.body.costumer as Costumer) ;
            }

            account.balance = "0.00";
            account.costumer = req.body.costumer.cpf;
            response.response2 = await new CreateAccount().execute(account);
            
            const finalresponse = {data: {"costomer": response.response1.data, "account": response.response2.data}, messages: [...response.response1.messages, ...response.response2.messages]} as APIResponse;
            ResponseWriter.success(res, 201, finalresponse);
        }
        catch (error)
        {
            ResponseWriter.error(res, error as Error);
        }
    }
}

export {AccountCreator};