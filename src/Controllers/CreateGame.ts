import { Request, Response } from "express";

interface PropsCreateGame{
    name: string,
    year: number,
    price: number
}

export class CreateGame{

    create(req: Request, res: Response, json: any){
        const { name, year, price }: PropsCreateGame = req.body;

        if(!name || !year || !price){
            return res.status(400).json({message: "Data Invalid"});
        }

        const id = (Math.random() * 1000).toString();

        json.games.push({id: id.substring(id.indexOf(".")+1, id.length), name, year, price});

        return res.status(201).json({message: "Created", game: {name, year, price}});
    }

}