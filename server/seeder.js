require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/config')
require('colors')
const Pizza = require('./models/pizzaModel')
const Pizzas = require("./data/pizza-data")



connectDB()

const importData = async ()=>{
    try {
        await Pizza.deleteMany()
        const sampleData = Pizzas.map(pizza => {return {...pizza}})
        await Pizza.insertMany(sampleData)
        console.log('Data inported'.bgGreen.white)
        process.exit()
    } catch (error) {
        console.log(`${error}`.bgRed.white)
        process.exit(1)
    }
}

const dataDestroy = ()=>{}

if(process.argv[2] === '-d'){
    dataDestroy()
}else{
    importData()
}

