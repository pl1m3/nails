import express from 'express'
import { regForm } from './controllers/regForm.js';
import { autForm } from './controllers/autForm.js';
import cors from "cors"
import bodyParser from 'body-parser';
import { getMasters } from './controllers/getMasters.js';
import { createRequest } from './controllers/createRequest.js';
import { requestHistory } from './controllers/requestHistory.js';
import { getAllRequest } from './controllers/getAllRequest.js';
import { updateStatus } from './controllers/UpdateStatus.js';

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))


app.post('/reg', regForm)
app.post('/aut', autForm)
app.get('/getM', getMasters)
app.post('/request', createRequest); 
app.post('/history', requestHistory)
app.get('/getAllRequest', getAllRequest)
app.put('/updateStatus', updateStatus)


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})