export class BagItem{
    id: number;
    itemName: string;
    forSunny: boolean;
    forHot: boolean;
    forCold: boolean;
    forRain: boolean;
    forSnow: boolean;
    itemweight: number;

    constructor(id: number, itemName: string, forSunny: boolean, forHot: boolean, forCold: boolean, forRain: boolean, forSnow: boolean, itemweight: number){
        this.id = id;
        this.itemName = itemName;
        this.forSunny = forSunny;
        this.forHot = forHot;
        this.forCold = forCold;
        this.forRain = forRain;
        this.forSnow = forSnow;
        this.itemweight = itemweight;
    }
}