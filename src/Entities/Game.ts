export interface IGame {
    id: number | string;
    name: string;
    year: number;
    price: number;
}

//dados fictícios
export const games: Array<IGame> = [
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