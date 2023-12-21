import { GamesProps } from "./GamesProps";
import { UserProps } from "./UserProps";

export interface JsonFicticy {
    games: Array<GamesProps>;
    users: Array<UserProps>;
}