import { Router, Request, Response } from "express";
import { ListAllGames } from "./Controllers/ListAllGames";
import { ListGame } from "./Controllers/ListGame";
import { CreateGame } from "./Controllers/CreateGame";
import { DeleteGame } from "./Controllers/DeleteGame";
import { ChangeGame } from "./Controllers/ChangeGame";

export const routes = Router();

//json fictício
const json = {
    games: [
        {
            id: "48476257",
            name: "God of War",
            year: 2012,
            price: 25
        },
        {
            id: "27226282",
            name: "PES 2020",
            year: 2019,
            price: 35
        },
        {
            id: "9737972",
            name: "Call Of Duty - Warfare",
            year: 2018,
            price: 30
        },
        {
            id: "981272491",
            name: "Minecraft",
            year: 2015,
            price: 40
        }
    ]
}
//Endpoint para listagem de todos os itens
routes.get("/games", (req: Request, res: Response) => {
    return new ListAllGames().list(req, res, json);
});

//Endpoint para listagem de um único item
routes.get("/game/:id", (req: Request, res: Response) => {
    return new ListGame().list(req, res, json);
});

//Endpoint para criação de um item
routes.post("/game", (req: Request, res: Response) => {
    return new CreateGame().create(req, res, json);
});

//Endpoint para deletar um item
routes.delete("/game/:id", (req: Request, res: Response) => {
    return new DeleteGame().delete(req, res, json);
});

//Endpoint para alteração de um item
routes.put("/game/:id", (req: Request, res: Response) => {
    return new ChangeGame().change(req, res, json);
})