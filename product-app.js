import { MongoClient, ObjectId } from 'mongodb'

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'product-app'

const client = new MongoClient (connectionURL)
const db = client.db(databaseName)
const products = db.collection('mobiles')

const insertProdcut = async () => {
    try {
         products.createIndex({productName: 1, seller: 1}, {unique: true})

        const addOne = {
            productName: 'iPad',
            category: 'Mobile',
            description: 'Electronic gadget',
            seller: 'Apple',
            quantity: 5,
            ratings: 4.1
        }

        const addMany = [{
            productName: 'Galaxy x',
            category: 'Mobile',
            description: 'Electronic gadget',
            seller: 'samsung',
            quantity: 6,
            ratings: 4.4
        }, {
            productName: 'Nord-2',
            category: 'Mobile',
            description: 'Electronic gadget',
            seller: 'OnePlus',
            quantity: 9,
            ratings: 4.5
        }, {
            productName: 'V23',
            category: 'Mobile',
            description: 'Electronic gadget',
            seller: 'Vivo',
            quantity: 15,
            ratings: 3.7
        }]

        const resultOne = await products.insertOne(addOne)
        console.log("🚀 ~ file: product-app.js:45 ~ insertProdcut ~ resultOne", resultOne)

        const resultMany = await products.insertMany(addMany)
        console.log("🚀 ~ file: product-app.js:48 ~ insertProdcut ~ resultMany", resultMany)


    } catch (e) {
        console.log('Duplicate Product found. kindly update quantity.')
        console.log(e)
    }
}

insertProdcut()


const findProduct = async () => {
    try {
        const query1 = { _id : ObjectId('63c8d8308da271c34af8868b') }
        const query2 = { ratings: { $gt : 4 } }

        const find1 = await products.findOne(query1)
        console.log("🚀 ~ file: product-app.js:66 ~ findProduct ~ find1", find1)

        const find2 = await products.find(query2).toArray()
        console.log("🚀 ~ file: product-app.js:69 ~ findProduct ~ find2", find2)


    } catch (e) {
        console.log (e)
    }
}

// findProduct()

const updateProduct = () => {
    try{
        products.updateOne({
            _id: ObjectId('63c8d8308da271c34af88689')
        }, {
            $inc: {
                quantity: 5
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

        products.updateMany({
            ratings: { $gt : 4 }
        }, {
            $inc: {
                ratings: 0.2
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    } catch (e) {
        console.log(e)
    }
    
}

// updateProduct()

const deleteProduct = () => {
    try {
        products.deleteMany({
            quantity: {$lt : 7}
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    } catch (e) {
        console.log(e)
    }
    
    
}

// deleteProduct()
