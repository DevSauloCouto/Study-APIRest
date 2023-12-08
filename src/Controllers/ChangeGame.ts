import { Request, Response } from "express";

export class ChangeGame{

    change(req: Request, res: Response, json: any){
        const { id } = req.params;

        const { name, year, price } = req.body;

        const game: any | undefined = json.games.find((game: any) => game.id == id);

        if(!game) return res.status(404).json({message: "Not Found Game"});

        if(!name && !year && !price) return res.status(400).json({message: "Nothing Data Informated"});

        if(name) game.name = name;
        if(year) game.year = year;
        if(price) game.price = price;

        return res.status(200).json(game);
    }

}