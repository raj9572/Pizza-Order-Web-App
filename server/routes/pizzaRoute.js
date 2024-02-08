const router = require('express').Router()
const pizzaModel = require('../models/pizzaModel')



// ! get all Pizza

router.get("/getAllPizzas", async (req, res) => {
    try {
        const pizzas = await pizzaModel.find({}).sort({ _id: "-1" })
        console.log('pizzas',pizzas)
        res.send(pizzas)

    } catch (error) {
        res.json({ message: error })
    }
})

//! get pizza by id
router.post("/getpizzabyid", async (req, res) => {
    try {
        const pizza = await pizzaModel.findById(req.body.pizzaId)
        res.send(pizza)

    } catch (error) {
        res.json({ message: error })
    }
})

//! add pizza

router.post("/addpizza", async (req, res) => {
    const { pizza } = req.body
    try {
        const newPizza = new pizzaModel({
            name: pizza.name,
            image: pizza.image,
            varients: ["small", "medium", "large"],
            description: pizza.description,
            category: pizza.category,
            prices: [pizza.prices]
        })
        await newPizza.save()
        res.status(201).send({ message: "new Pizza Added" })

    } catch (error) {
        res.json({ message: error })
    }
})



//! Update pizza

router.post("/updatepizza", async (req, res) => {
    const { updatedPizza } = req.body
    try {
        const pizza = await pizzaModel.findById(updatedPizza._id)
        pizza.name = updatedPizza.name,
            pizza.description = updatedPizza.description,
            pizza.image = updatedPizza.image,
            pizza.category = updatedPizza.category,
            pizza.prices = [updatedPizza.prices],

            await pizza.save()
        res.status(200).send("Pizza update Success")

    } catch (error) {
        res.status(400).json({ message: error })
    }
})


//! delete pizza

router.post("/deletepizza",async(req,res)=>{
    const pizzaId = req.body.pizzaId
    try {
        const deletedPizza = await pizzaModel.findByIdAndDelete(pizzaId)
        res.status(200).send("Pizza deleted successfully")
        
    } catch (error) {
        res.status(404).send({error:error})
    }
})




module.exports = router