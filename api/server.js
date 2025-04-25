const express = require('express');
const cors = require('cors');
const routes = require('./src/routes')

const app = express();
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(3000, (req,res) =>{
    console.log('Server running on port 3000') 
})