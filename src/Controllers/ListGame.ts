import { Request, Response } from "express";
import { JsonFicticy } from "../Interfaces/IGamesUsersRepository";
import { GamesProps } from "../Interfaces/GamesProps";

export class ListGame {

    list(req: Request, res: Response, json: JsonFicticy){
        const { id } = req.params;

        const game: GamesProps | undefined = json.games.find((game: GamesProps) => game.id == id);

        return !game ? res.status(404).json({message: "Not Found Game"}) : res.status(200).json(game);
    }
    
}