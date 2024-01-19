import { Request, Response } from "express";
import { GameDTO, IGameDTO } from "../DTOs/GameDTO";
import { IGame } from "../Entities/Game";
import { GameHATEOAS } from "../HATEOAS/GameHATEOAS";

export class GameController {

    listAll(req: Request, res: Response, jsonGames: Array<IGame>){
        const _links: Array<GameHATEOAS> = [new GameHATEOAS(`http://localhost:4343/games`, "GET", "get_all_games"), ]

        jsonGames.forEach(info => {
            _links.push(new GameHATEOAS(`http://localhost:4343/game/${info.id}`, "GET", "get_game"))
            _links.push(new GameHATEOAS(`http://localhost:4343/game/${info.id}`, "PUT", "put_game"))
            _links.push(new GameHATEOAS(`http://localhost:4343/game/${info.id}`, "DELETE", "delete_game"))
        })

        return res.status(200).json({games: jsonGames, _links});
    }

    listOne(req: Request, res: Response, jsonGames: Array<IGame>){
        const { id } = req.params;

        const _links = [
            new GameHATEOAS(`http://localhost:4343/game/${id}`, "GET", "get_game"),
            new GameHATEOAS(`http://localhost:4343/game/${id}`, "PUT", "put_game"),
            new GameHATEOAS(`http://localhost:4343/game/${id}`, "DELETE", "delete_game"),
            new GameHATEOAS(`http://localhost:4343/games`, "GET", "get_all_games"),
            new GameHATEOAS(`http://localhost:4343/game`, "POST", "post_game")
        ]
            
        const game: IGame | undefined = jsonGames.find((game: IGame) => game.id == id);

        return !game ? res.status(404).json({message: "Not Found Game"}) : res.status(200).json({game, _links});
    }

    saveGame(req: Request, res: Response, jsonGames: Array<IGame>){
        const { name, year, price }: IGameDTO = req.body;

        if(!name || !year || !price){
            return res.status(400).json({message: "Por favor, preencha todos os campos!"});
        }

        const newGame = new GameDTO(name, year, price);

        const _links: Array<GameHATEOAS> = [
            new GameHATEOAS(`http://localhost:4343/game/${newGame.toEntity().id}`, "GET", "get_game"),
            new GameHATEOAS(`http://localhost:4343/game/${newGame.toEntity().id}`, "PUT", "put_game"),
            new GameHATEOAS(`http://localhost:4343/game/${newGame.toEntity().id}`, "DELETE", "delete_game"),
            new GameHATEOAS(`http://localhost:4343/games`, "GET", "get_all_games"),
            new GameHATEOAS(`http://localhost:4343/game`, "POST", "post_game")
        ]

        jsonGames.push(newGame.toEntity());

        return res.status(201).json({message: "Created", game: newGame, _links});
    }

    putGame(req: Request, res: Response, jsonGames: Array<IGame>){
        const { id } = req.params;

        const { name, year, price }: IGameDTO = req.body;

        const game: IGame | undefined = jsonGames.find((game: IGame) => game.id == id);

        if(!game) return res.status(404).json({message: "Not Found Game"});

        if(!name && !year && !price) return res.status(400).json({message: "Nenhum dado alterado"});

        const _links: Array<GameHATEOAS> = [
            new GameHATEOAS(`http://localhost:4343/game/${game.id}`, "GET", "get_game"),
            new GameHATEOAS(`http://localhost:4343/game/${game.id}`, "PUT", "put_game"),
            new GameHATEOAS(`http://localhost:4343/game/${game.id}`, "DELETE", "delete_game"),
            new GameHATEOAS(`http://localhost:4343/games`, "GET", "get_all_games"),
            new GameHATEOAS(`http://localhost:4343/game`, "POST", "post_game")
        ]

        if(name) game.name = name;
        if(year) game.year = year;
        if(price) game.price = price;

        return res.status(200).json({game, _links});
    }

    deleteGame(req: Request, res: Response, jsonGames: Array<IGame>){
        const { id } = req.params;

        const idGame: IGame | number = jsonGames.findIndex((game: IGame) => game.id == id);

        const game: IGame | undefined = jsonGames.find((game: IGame) => game.id === id);

        const _links: Array<GameHATEOAS> = [
            new GameHATEOAS(`http://localhost:4343/games`, "GET", "get_all_games"),
            new GameHATEOAS(`http://localhost:4343/game`, "POST", "post_game")
        ]

        if(idGame != -1){
            jsonGames.splice(idGame, 1);
            return res.status(200).json({message: "Game Delete", game_delete: game, _links});
        }
        return res.status(404).json({message: "Not Found Game"});
    }


}