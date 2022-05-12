import mongoose from 'mongoose';
import 'dotenv/config';
import filmModel from '../schemas/scheme.js';

//const url = 'mongodb://127.0.0.1:27017/films_db'

const findFilm = async ( film_name ) => {
    try {
        mongoose.connect(process.env.MONGODB_MEDIA_URI, { useNewUrlParser: true } , () => {
            console.log('DB is connected!');
        });    

        const search = await filmModel.find({
            name: film_name
        }).exec();
        
        // mongoose.connection.close(()=>{
        //     console.log('DB is disconnected!');
        // });

        return {
            path: search[0].path, 
            format: search[0].format
        };
    } catch (e) {
        console.log(e);
    }
}

export {findFilm}
