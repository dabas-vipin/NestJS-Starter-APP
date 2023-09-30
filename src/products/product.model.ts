

export class Product{
    id:string;
    title:string;
    description:string;

    constructor(id:string,title:string,description:string,public price:number){
        this.id = id ;
        this.title = title;
        this.description = description
    };
    

}