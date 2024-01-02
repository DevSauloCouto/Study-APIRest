export interface IGameDTO {
    name: string;
    year: number;
    price: number;
}

export class GameDTO {

    private name: string;
    private year: number;
    private price: number;

    constructor(name: string, year: number, price: number){
        this.name = name;
        this.year = year;
        this.price = price;
    }

    toEntity(){
        const id = (Math.random() * 1000).toString();
        return {
            id: id.substring(id.indexOf(".") + 1, id.length),
            name: this.name,
            year: this.year, 
            price: this.price
        }
    }
}