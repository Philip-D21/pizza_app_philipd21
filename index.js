const express = require('express');


const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})



app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})