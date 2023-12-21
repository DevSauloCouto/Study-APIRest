import { Request, Response } from "express";
import { GamesProps } from "../Interfaces/GamesProps";
import { JsonFicticy } from "../Interfaces/IGamesUsersRepository";

export class DeleteGame {

    delete(req: Request, res: Response, json: JsonFicticy) {
        const { id } = req.params;

        const game: GamesProps | number = json.games.findIndex((game: GamesProps) => game.id == id);

        if(game != -1){
            json.games.splice(game, 1);
            return res.status(200).json({message: "Game Delete", games: json.games});
        }
        return res.status(404).json({message: "Not Found Game"});
    }

}