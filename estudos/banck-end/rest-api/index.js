//APP////////////////////////////////////

const app = require('./app')

//PORTA///////////////////////////
app.listen(`${process.env.PORT}`, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT}`)
    console.log(`MONGODB: ${process.env.MONGO_URL}`)
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    console.log(`PORT: ${process.env.PORT}`)
})