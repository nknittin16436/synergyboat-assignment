import app from './app';
import 'dotenv/config';
import connectToDb, { client, collectionData, dataBaseList } from './db/connection';


// connectToDb();

const name: string = "hello";


connectToDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
});
console.log(name);
