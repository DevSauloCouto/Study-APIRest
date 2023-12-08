import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { routes } from "./routes";


class App{

    public server: express.Application;
    public port: number;
    
    constructor(){
        this.server = express();
        this.port = 4343;
        this.ConfigCors();
        this.ConfigJson();
        this.Router();
        this.ListenPort();
    }

    ConfigCors(): void {
        this.server.use(cors());
    }

    ConfigJson(): void {
        this.server.use(bodyParser.urlencoded({extended: false})); 
        this.server.use(bodyParser.json());
    }

    ListenPort(): void {
        this.server.listen(this.port, () => console.log(`Server running on port ${this.port}`));
    }

    Router(): void {
        this.server.use(routes);
    }

}

const app = new App();