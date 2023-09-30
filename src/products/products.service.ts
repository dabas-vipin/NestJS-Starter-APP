import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./product.model";

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title:string,description:string,price:number){
        const prodId = Math.random().toString()
        const newProduct = new Product(prodId,title,description,price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts(){
        return [...this.products];
    }

    getSingleProduct(prodId:string){
        const product = this.findProdById(prodId)[0];
        return {...product}
    }

    updateProduct(productId:string,title:string,description:string,price:number){
        const product = this.findProdById(productId)[0];
        const index = this.findProdById(productId)[1];
        const updatedProduct ={...product};
        if(title){
            updatedProduct.title = title;
        }
        if(description){
            updatedProduct.description= description;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index]= updatedProduct;
    }

    deleteProduct(productId:string){
        const index = this.findProdById(productId)[1];
        this.products.splice(index,1);
    }

    private findProdById(prodId:string): [Product,number] {
        const productIndex = this.products.findIndex((prod)=>prod.id===prodId);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException(`Product with this id doesn't exist`)
        }
        return [product,productIndex]; 
    }
}