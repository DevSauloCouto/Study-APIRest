import { Request, Response } from "express";
import { GamesProps } from "../Interfaces/GamesProps";
import { JsonFicticy } from "../Interfaces/IGamesUsersRepository";

export class AlterGame{

    change(req: Request, res: Response, json: JsonFicticy){
        const { id } = req.params;

        const { name, year, price } = req.body;

        const game: GamesProps | undefined = json.games.find((game: GamesProps) => game.id == id);

        if(!game) return res.status(404).json({message: "Not Found Game"});

        if(!name && !year && !price) return res.status(400).json({message: "Nenhum dado alterado"});

        if(name) game.name = name;
        if(year) game.year = year;
        if(price) game.price = price;

        return res.status(200).json(game);
    }

}