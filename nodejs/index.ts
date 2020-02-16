import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as routes from './src/routes/crmRoutes';
import messenger from './src/controllers/createMessage';

const app = express();
const PORT: number = 3000;
const connectUser: string = "spark";
const connectPassword: string = "someLongPassordToGoHere";

let messages = new messenger(PORT);

const dataConnection = (user: string, pass: string): string => {
    return `mongodb+srv://${connectUser}:${connectPassword}@cluster0-2txeb.mongodb.net/test?retryWrites=true&w=majority\n`;
};

let database = dataConnection(connectUser, connectPassword);

mongoose.Promise = global.Promise;
mongoose.connect(database, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(messages.messagePrint())
);

app.listen(PORT, () =>
    console.log(messages.messagePrint())
);