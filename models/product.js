const products = [];

module.exports = class Product{
    constructor(TITLE, PRICE, DESCRIPTION){
        this.title = TITLE,
        this.price = PRICE,
        this.description = DESCRIPTION
    }

    save(){
        products.push(this);
    }

    static fetchAll(){
        return products;
    }
}