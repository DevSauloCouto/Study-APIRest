import { Request, Response } from "express";

export class ListGame {

    list(req: Request, res: Response, json: any){
        const { id } = req.params;

        const game = json.games.find((game: any) => game.id == id);

        return !game ? res.status(404).json({message: "Not Found Game"}) : res.status(200).json(game);
    }
    
}