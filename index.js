const { log } = require("console");

const fs = require("fs").promises;

class ProductManager {

    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(nuevoOjeto) {
        let {title, description, price, thumbnail,code, stock} = nuevoOjeto;

        if(!title || !description || !price || !thumbnail || !code || !stock)
        {
            console.log("Todos los campos son requeridos, compltalos o hasta la vista beibi");
            return;
        }

        if(this.products.some(item => item.code === code)){
            console.log("Que sea un codigo unico por favor");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        this.products.push(newProduct);

        await this.guardarArchivo(this.products);

    }

    getProducts(){
        console.log(this.products)
    }

    async getPruductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if(!buscado) {
                console.log("Producto no encontrado");
            }else {
                console.log("Yes, lo encontramos!");
                return buscado;
            }

        } catch (error) {
            console.log("Error al leer el archivo", error);
        }

    }

    async leerArchivo() {
        try{
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Error al leer un archivo", error);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    async updateProduct(id,productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if(index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("no se encuentra producto");
            }

        } catch (error){
            console.log("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if(index !== -1) {
                arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("no se encuentra producto");
            }

        } catch (error){
            console.log("Error al actualizar el producto", error);
        }
    }
}

const manager = new ProductManager("./productos.json");

manager.getProducts();


const sao = {
    title: "Sword Art Online",
    description: "Si te gusto el anime, te va a encantar el juego",
    price: 9000,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 20
}


manager.addProduct(sao);

const minecraft = {
    title: "Minecraft",
    description: "Vive aventuras en un mundo cuadrado",
    price: 5000,
    thumbnail: "sin imagen",
    code: "abc124",
    stock: 25
}

manager.addProduct(minecraft);

const fornite = {
    title: "Fornite",
    description: "Arriba las manos forajido",
    price: 4000,
    thumbnail: "sin imagen",
    code: "abc124",
    stock: 25
}

manager.addProduct(fornite);

const spiderman = {
    title: "Spiderman",
    description: "Arriba las manos forajido",
    price: 6000,
    thumbnail: "sin imagen",
    code: "abc125",
}

manager.addProduct(spiderman);


manager.getProducts();


async function testeamosBusquedaPorId() {
    const buscado = await manager.getPruductById(2);
    console.log(buscado);
}

testeamosBusquedaPorId();


const imperioAo = {
    id: 1,
    title: "Imperio AO",
    description: "elije tu clase de avatar y a la aventura",
    price: 3000,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 20,
};

async function testeamosActualizar() {
    await manager.updateProduct(1, imperioAo);
}

testeamosActualizar();

async function testeamosActualizar() {
    await manager.deleteProduct(2, minecraft);
}

testeamosActualizar();
