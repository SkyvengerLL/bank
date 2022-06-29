import { Request, Response } from "express";
import { GetExtract } from "../services";
import { ResponseWriter } from "../utils";

class Extract{
    public async handle (req: Request, res: Response)
    {
        try{
            const response = await new GetExtract().execute(req.body.account);
            ResponseWriter.success(res, 201, response);
        }
        catch (error)
        {
            ResponseWriter.error(res, error as Error);
        }
    }
}

export {Extract};