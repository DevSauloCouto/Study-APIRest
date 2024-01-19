import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { IUser } from "../Entities/User";

export class Autenticator {

    generateToken(req: Request, res: Response, jsonUser: Array<IUser>){
        const { email, pass } = req.body;

        if(!email && !pass) {
            return res.status(401).json({message: "Por favor, preencha todos os campos!"});
        }

        const user = jsonUser.find((user: IUser) => user.email === email);

        if(!user){
            return res.status(401).json({error: "Credentials Invalid"});
        }

        if(user.email === email && user.pass === pass){
            //Isso deveria está em uma variável de ambiente
            const keySecret = "!@#SlCoutoSystemInAuthenticateJWT010100011110";

            sign({id: user.id, name: user.name, email: user.email}, keySecret, {expiresIn: "24h"}, (err, token) => {
                if(err){
                    return res.status(500).json({error: "Error Internal Server"});
                }

                return res.status(200).json({message: "User Logged Success", token});
            })
        } else {
            return res.status(401).json({error: "Credentials Invalid"});
        }

    }

    static middlewareAuthenticate(req: Request, res: Response, next: NextFunction){
        const authToken = req.headers.authorization;
        const keySecret = "!@#SlCoutoSystemInAuthenticateJWT010100011110";

        if(!authToken){
            return res.status(401).json({error: "Token Invalid - Access Not Authorized"});
        }

        const tokenBearer = authToken.split(" ")[1];

        verify(tokenBearer, keySecret, (err, data: any) => {
            if(err){
                return res.status(401).json({error: "Token Invalid - Access Not Authorized"});
            }

            console.log(data);

            req.loggedUser = {
                id: data.id,
                name: data.name,
                email: data.email
            };

            console.log(req.loggedUser);
            
            next();
        })


    }

}