export class User{
    userId: string;
    tripLocation: string;

    constructor(userId: string, tripLocation: string){
        this.userId = userId;
        this.tripLocation = tripLocation;
    }
}