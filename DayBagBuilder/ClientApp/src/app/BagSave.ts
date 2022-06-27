export class BagSave{
    id: number;
    userName: string;
    itemName: string;
    itemweight: number;
    

    constructor(id: number, userName:string, itemName: string, itemweight: number){
        this.id = id;
        this.userName = userName;
        this.itemName = itemName;
        this.itemweight = itemweight;
    }
}