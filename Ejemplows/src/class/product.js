//import
import fs from 'fs'

export default class Product {
    constructor(path) {
        this.path = path
        this.products = []
    }

    //Defines id incrementally. If there are any products it starts in 1. Otherwise increments the last existing id in 1.
    setId() {
        try {
            let id = 1
            if (this.products.length > 0) {
                id = (Math.max(...this.products.map(product => product.id))) + 1
            }

            return id
        }
        catch (error) {
            console.log(`ERROR: ${error}`)
        }
        
    }

    //Validates object has only the properties defined in properties array.
    validateProperties(product) {
        const properties = ['title', 'description', 'price', 'thumbnail', 'code', 'stock']
         let status = {status: 'successful', error: ''}

        //Validates all mandatory properties are defined in a product
        for (let property in properties) {
            if (!(properties[property] in product)) {
                status.status = 'failed'
                status.error += `Mandatory property ${properties[property]} missing`
            }
        }

        //Validates all keys in a product are valid properties. 
        Object.keys(product).forEach(property => {
            if (!(properties.includes(property))) {
                status.status = 'failed'
                status.error += `Property ${property} is not valid for this product. `
            }
        });

        
        if (status.status == 'successful') {
            return true
        } 
        else {
            throw status 
        }
    }

    //Validates the object sent in product has the property property defined and it is not the id.
    validateProperty(property, product) {
        if ((property == 'id') || !(property in product)) {
            
            throw new Error (`Property ${property} is not valid`)
        }
        
        return true
    }

    //Validates the code is not already defined for a product
    validateCode(code) {
        const product = this.products.filter(item => item.code == code)
        if (product.length) {
            throw new Error(`Code ${product[0].code} already exists`)
        } else { 
            return true
        }
    }

    //Gets all products in the file specified in path
    async getProducts(limit = undefined) {
        this.products = await fs.promises.readFile(this.path)
        if (this.products.length == 0) {
            this.products = []
        }
        else {
            this.products = JSON.parse(this.products)
            
            this.products = (limit != undefined ? this.products.filter(item => item.id <= limit) : this.products)
        }
        return this.products
    }

    //Adds a product into the path file
    async addProduct(product) {
        try{
            this.products = await this.getProducts()
            this.validateProperties(product)
            this.validateCode(product.code)
            product.id = this.setId()
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            return {status: 'successful', value: product}
        }catch (error) {
            console.log (`ERROR adding product ${JSON.stringify(product)}. Msg: ${error.error}`)
            return {status: 'failed', error: `ERROR adding product ${JSON.stringify(product)}. Msg: ${JSON.stringify(error)}`}
        }        
    }
    
    //Get a product by a particular id
    async getProductById(id) {
        try{
            let products = await this.getProducts()
            products = products.filter(item => item.id == id)
            if (products.length) {
                return {status: 'successful', value: products[0]}
            } else { 
                throw new Error(`ID ${id} not found`)
            }
        }
        catch (error) {
            console.log (`ERROR getting product with id ${id}. Msg: ${error}`)
            return {status: 'failed', error: `ERROR getting product with id ${id}. Msg: ${error}`}
            
        }
    }

    //Updates the property with value of a product with matching id  
    async updateProduct(id, newValues) {
        try {
            let oldProduct = (await this.getProductById(id)).value

            Object.keys(newValues).forEach(property => {
                if (this.validateProperty(property, oldProduct)) {
                    oldProduct[property] = newValues[property]
                }
            });
           
            let products = (await this.getProducts()).filter(item => item.id != id)
            products.push(oldProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))

            return {status: 'successful', value: oldProduct}
        }
        catch (error) {
            return {status: 'failed', error: `there is an invalid property trying to be modified.`}
        }

    }

    //Deletes a product with the id sent
    async deleteProduct(id) {
        try {
            let products = (await this.getProducts()).filter(item => item.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(products))

            return {status: 'successful', value: `Product ${id} deleted`}
        }
        catch (error) {
            console.log (`ERROR deleting product ${id}. Msg: ${error}`)
            return {status: 'failed', error: `ERROR deleting product ${id}. Msg: ${error}`} 
        }
    }
}
