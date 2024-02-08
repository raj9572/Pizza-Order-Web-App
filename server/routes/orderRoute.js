const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const stripe = require('stripe')('sk_test_51Mh7qiSFVs0Xzc6RvPqwVysDYzA3gwI2BTqO4wp27QJwh2OlTbiHALOmCqgB166Qo619Yg7Ct1qxlLtVoMkJmup3009nGYqZe1')
const bodyParser = require('body-parser')
const orderModel = require('../models/orderModel')

// ! place order pizza

router.post('/placeorder', async (req, res) => {
    // console.log('body', req.body)

    const customer = await stripe.customers.create({
        metadata: {
            user: JSON.stringify(req.body.user),
            cart: JSON.stringify(req.body.products)
        }
    })

    const line_items = req.body.products.map((item) => {
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                    metadata: {
                        id: item._id
                    }
                },
                unit_amount: item.prices[0][item.varient] * 100,
            },
            quantity: item.quantity,
        }
    })
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            line_items,
            phone_number_collection: {
                enabled: true,
            },
            customer: customer.id,
            mode: 'payment',
            success_url: `http://localhost:3000/payment/success`,
            cancel_url: `http://localhost:3000/cart`,
        });

        res.send({ url: session.url, message: "payment-successfull" })
    } catch (error) {
        console.log('error', error)
        res.status(400).json({ message: "something went wronge", error: error })
    }
});



const createOrder = async (customer, data) => {
    const item = JSON.parse(customer.metadata.cart)
    const user = JSON.parse(customer.metadata.user)

    const newOrder = new orderModel({
        name: user.name,
        email: user.email,
        userId: user._id,
        customerId: data.customer,
        customerDetails: data.customer_details,
        orderItems: item,
        orderAmount: data.amount_subtotal,
        shippingAddress: {
            street: data.shipping_details.address.line1,
            city: data.shipping_details.address.city,
            country: data.shipping_details.address.country,
            pincode: data.shipping_details.address.postal_code
        },
        transactionId: data.payment_intent
    })

    try {
        const savedOrder = await newOrder.save()
        // console.log('savedOrder', savedOrder)
    } catch (error) {
        console.log('error', error)
    }
}


// ! Create pizza pizza


let endpointSecret;
// endpointSecret = "whsec_3002822324c8dbbfe58da28a7f9bbdafd75777cc4068c32291ce8e61869b77ec";

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    let data;
    let eventType

    if (endpointSecret) {
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log('webhook verify')
        } catch (err) {
            console.log('webhook error', err.message)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type

    } else {

        data = req.body.data.object
        eventType = req.body.type
    }



    // Handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then((customer) => {
            // console.log('customer', customer)
            // console.log('data', data)
            createOrder(customer, data)
        }).catch(err => console.log(err.message))
    }


    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
});


// ! get user Order

router.post('/getuserorder', async (req, res) => {
    const { userId } = req.body
    try {
        const orders = await orderModel.find({ userId }).sort({ _id: '-1' })
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send({ message: "something went wrond", error: error.stack })
    }

})
// ! get All user  Order

router.get('/allusersorders', async (req, res) => {

    try {
        const orders = await orderModel.find()
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send({ message: "something went wrond", error: error.stack })
    }

})
// ! get All user  Order

router.post('/deliverorder', async (req, res) => {
    const { orderId } = req.body
    try {
        const orders = await orderModel.findById(orderId)
        orders.isDelivered = true
        await orders.save()
        return res.status(200).send("order deliverd success")
    } catch (error) {
        res.status(400).send({ message: "something went wrond", error: error.stack })
    }

})


module.exports = router