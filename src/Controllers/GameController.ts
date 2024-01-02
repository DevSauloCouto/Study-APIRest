import { Request, Response } from "express";
import { GameDTO, IGameDTO } from "../DTOs/GameDTO";
import { IGame } from "../Entities/Game";

export class GameController {

    listAll(req: Request, res: Response, jsonGames: Array<IGame>){
        return res.status(200).json({jsonGames});
    }

    listOne(req: Request, res: Response, jsonGames: Array<IGame>){
        const { id } = req.params;

        const game: IGame | undefined = jsonGames.find((game: IGame) => game.id == id);

        return !game ? res.status(404).json({message: "Not Found Game"}) : res.status(200).json(game);
    }

    saveGame(req: Request, res: Response, jsonGames: Array<IGame>){
        const { name, year, price }: IGameDTO = req.body;

        if(!name || !year || !price){
            return res.status(400).json({message: "Por favor, preencha todos os campos!"});
        }

        const newGame = new GameDTO(name, year, price);

        jsonGames.push(newGame.toEntity());

        return res.status(201).json({message: "Created", game: {name, year, price}});
    }

    putGame(req: Request, res: Response, jsonGames: Array<IGame>){
        const { id } = req.params;

        const { name, year, price }: IGameDTO = req.body;

        const game: IGame | undefined = jsonGames.find((game: IGame) => game.id == id);

        if(!game) return res.status(404).json({message: "Not Found Game"});

        if(!name && !year && !price) return res.status(400).json({message: "Nenhum dado alterado"});

        if(name) game.name = name;
        if(year) game.year = year;
        if(price) game.price = price;

        return res.status(200).json(game);
    }

    deleteGame(req: Request, res: Response, jsonGames: Array<IGame>){
        const { id } = req.params;

        const game: IGame | number = jsonGames.findIndex((game: IGame) => game.id == id);

        if(game != -1){
            jsonGames.splice(game, 1);
            return res.status(200).json({message: "Game Delete", games: jsonGames});
        }
        return res.status(404).json({message: "Not Found Game"});
    }


}