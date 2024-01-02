export interface IUser {
    id: string;
    name: string;
    email: string;
    pass: string;
}

//dados fictícios 
export const users: Array<IUser> = [
    {
        id: "9374747972982209102",
        name: "saulocouto",
        email: "slcouto12@gmail.com",
        pass: "12345"
    },
    {
        id: "382382839298281",
        name: "rklop04",
        email: "rkloop@hotmail.com",
        pass: "54321"
    },
    {
        id: "0929038803093091",
        name: "artur_avila",
        email: "avila@gmail.com",
        pass: "!@1234"
    }
]