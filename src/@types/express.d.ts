declare namespace Express {
    export interface Request {
        token: string;
        
        loggedUser: {
            id: string,
            name: string,
            email: string
        }
    }
}