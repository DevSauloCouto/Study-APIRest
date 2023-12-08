import { Request, Response } from "express";

export class ListAllGames{

    list(req: Request, res: Response, json: any){
        return res.status(200).json(json.games);
    }

}