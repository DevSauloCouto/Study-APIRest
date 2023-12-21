import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


interface PropsJWT {
    id: string;
    name: string;
    email: string;
}

export class MiddlewareAuth {

    static isRequestAuth(req: Request, res: Response, next: NextFunction){
        const authToken = req.headers['authorization'];
        const keySecret = "!@#SlCoutoSystemInAuthenticateJWT010100011110";

        if(!authToken){
            return res.status(401).json({err: "Token Inválido - Acesso Não Autorizado"});
        }

        const tokenBearer = authToken.split(" ")[1];

        verify(tokenBearer, keySecret, (err: any, data: PropsJWT | any) => {
            if(err){
                return res.status(401).json({err: "Token Inválido - Acesso Não Autorizado"});
            }

            console.log(data);

            req.token = tokenBearer;
            req.loggedUser = {
                id: data.id,
                name: data.name,
                email: data.email
            };

            console.log(req.loggedUser);

            next();
        });

    }

}