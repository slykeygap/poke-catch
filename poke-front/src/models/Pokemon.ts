export type Pokemon = {
    id:number,
    name: string,
    weight: number,
    height: number,
    sprite: string,
    shinySprite: string,
    animatedSprite: string,
    animatedShinySprite:string,
    isShiny: boolean,
    rarity: "legendary" | "rare" | "common"
    types: string[],
    
}