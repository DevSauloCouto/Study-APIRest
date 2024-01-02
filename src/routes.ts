import { Router, Request, Response } from "express";
import { GameController } from "./Controllers/GameController";
import { Autenticator } from "./Auth/Autenticator";
import { games } from "./Entities/Game";
import { users } from "./Entities/User";

export const routes = Router();

//Endpoint de Autenticação
routes.post("/auth", (req: Request, res: Response) => {
    return new Autenticator().generateToken(req, res, users);
});

//Endpoint para listagem de todos os itens
routes.get("/games", Autenticator.middlewareAuthenticate, (req: Request, res: Response) => {
    return new GameController().listAll(req, res, games);
});

//Endpoint para listagem de um único item
routes.get("/game/:id", Autenticator.middlewareAuthenticate, (req: Request, res: Response) => {
    return new GameController().listOne(req, res, games);
});

//Endpoint para criação de um item
routes.post("/game", Autenticator.middlewareAuthenticate, (req: Request, res: Response) => {
    return new GameController().saveGame(req, res, games);
});

//Endpoint para deletar um item
routes.delete("/game/:id", Autenticator.middlewareAuthenticate, (req: Request, res: Response) => {
    return new GameController().deleteGame(req, res, games);
});

//Endpoint para alteração de um item
routes.put("/game/:id", Autenticator.middlewareAuthenticate, (req: Request, res: Response) => {
    return new GameController().putGame(req, res, games);
});