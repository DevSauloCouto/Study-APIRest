import { Request, Response } from "express";

export class DeleteGame{

    delete(req: Request, res: Response, json: any){
        const { id } = req.params;

        const game = json.games.findIndex((game: any) => game.id == id);

        if(game != -1){
            json.games.splice(game, 1);
            return res.status(200).json({message: "Game Delete", games: json.games});
        }
        return res.status(404).json({message: "Not Found Game"});
    }

}