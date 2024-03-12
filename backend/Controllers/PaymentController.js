const dotenv=require("dotenv")
dotenv.config()
const asynchandler=require("../utils/asynchandler")
const stripe = require('stripe')('sk_test_51Oad13SET0Tbrnai1SP8oHBIRJ37u406NcTo09WGFODoj2X9KRmOhMbbMbIrBZwQP3nIZ03daMc22Pse612Iec6B00pZOsxrFR');



exports.processPayment =async(req,res,next)=>{
    try {
        const myPayment=await stripe.paymentIntents.create({
            description: 'Flipzone services',
            amount: req.body.amount,
            currency: 'inr',
            metadata:{
                company:"Flipzone"
            },
            shipping: {
                name: 'Flipzones',
                address: {
                  line1: 'GandhiNagar',
                  postal_code: '22005',
                  city: 'Kanpur',
                  state: 'UP',
                  country: 'IN',
                },
              },
            automatic_payment_methods: {
                    enabled: true,
            }
           
        });
        res.status(200).json({
                succes:true,
                client_secret: myPayment.client_secret
        })
    }catch (e) {
        switch (e.type) {
          case 'StripeCardError':
            console.log(`A payment error occurred: ${e.message}`);
            break;
          case 'StripeInvalidRequestError':
            console.log('An invalid request occurred.');
            break;
          default:
            console.log('Another problem occurred, maybe unrelated to Stripe.');
            break;
        }
      }
}


//react will get publishable key by this response , so that it can use it for generating token

exports.getPublishableKey = asynchandler(async(req, res, next)=>{
    const key=process.env.STRIPE_API_KEY
    
    res.status(200).json({key:key})
})











// const dotenv=require("dotenv")
// dotenv.config()
// const asynchandler=require("../utils/asynchandler")
// const stripe = require('stripe')('sk_test_51Oad13SET0Tbrnai1SP8oHBIRJ37u406NcTo09WGFODoj2X9KRmOhMbbMbIrBZwQP3nIZ03daMc22Pse612Iec6B00pZOsxrFR');



// exports.processPayment =asynchandler(async(req,res,next)=>{
//     const myPayment=await stripe.paymentIntents.create({
//         description: 'Flipzone services',
//         amount: req.body.amount,
//         currency: 'inr',
//         metadata:{
//             company:"Flipzone"
//         },
//         shipping: {
//             name: 'Flipzones',
//             address: {
//               line1: 'GandhiNagar',
//               postal_code: '22005',
//               city: 'Kanpur',
//               state: 'UP',
//               country: 'IN',
//             },
//           },
//         automatic_payment_methods: {
//                 enabled: true,
//         }
       
//     });
//     res.status(200).json({
//             succes:true,
//             client_secret: myPayment.client_secret
//     })
// })


// //react will get publishable key by this response , so that it can use it for generating token

// exports.getPublishableKey = asynchandler(async(req, res, next)=>{
//     const key=process.env.STRIPE_API_KEY
  
//     res.status(200).json({key:key})
// })




































