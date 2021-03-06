import { Request, Response } from "express";
import { CreateTransaction } from "../services";
import { ResponseWriter } from "../utils";
import {Transaction} from "../models/transactions";

class Withdraw{
    public async handle (req: Request, res: Response)
    {
        try{
            const response = await new CreateTransaction().execute(req.body as Transaction, 3);
            ResponseWriter.success(res, 201, response);
        }
        catch (error)
        {
            ResponseWriter.error(res, error as Error);
        }
    }
}

export {Withdraw};