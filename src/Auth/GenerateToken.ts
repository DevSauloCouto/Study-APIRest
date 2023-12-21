import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { UserProps } from "../Interfaces/UserProps";

export class GenerateToken {

    generate(req: Request, res: Response, json: any){

        const { email, pass } = req.body;

        if(!email || !pass) {
            return res.status(404).json({message: "Por favor preencha os campos"});
        }

        const user = json.users.find((user: UserProps) => user.email === email);

        if(!user){
            return res.status(401).json({err: "Credenciais inválidas"});
        }

        if(user.email === email && user.pass === pass){
            //Isso deveria está em uma variável de ambiente
            const keySecret = "!@#SlCoutoSystemInAuthenticateJWT010100011110";

            sign({id: user.id, name: user.name, email: user.email}, keySecret, {expiresIn: "24h"}, (err, token) => {
                if(err){
                    return res.status(500).json({err: "Error Internal Server"});
                }
                return res.status(200).json({message: "User Log Success", token});
            });

        } else {
            return res.status(401).json({err: "Credenciais inválidas"});
        }

    }

}