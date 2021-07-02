import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/routes';


const app = express();
const PORT = 2000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true    
});

// bodyparser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.get('/', (req,res) => res.send(`Node and dexpress server running on port ${PORT}`));
app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));