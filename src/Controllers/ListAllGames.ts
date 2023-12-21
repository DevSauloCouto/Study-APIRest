import { Request, Response } from "express";
import { JsonFicticy } from "../Interfaces/IGamesUsersRepository";

export class ListAllGames{

    list(req: Request, res: Response, json: JsonFicticy){
        return res.status(200).json(json.games);
    }

}