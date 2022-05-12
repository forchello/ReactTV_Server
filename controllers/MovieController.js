import fs from 'fs';
import mime from 'mime-types';

import 'dotenv/config';

import { findFilm } from './FilmSearch.js'

const getMovies = async (req, res) => {

    if ( req.query.name != undefined ) {
        const film = await findFilm(req.query.name);

        const path = film.path;
        const format = mime.lookup(film.format);
        

        console.log('MOVIE CONTROLLER -> ' + path);

        if ( !fs.existsSync(path) ) {
            console.log(`ERROR 404 - File "${req.query.name}" not found`);
            res.status(404)
        } else {
            const stat = fs.statSync(path);
            const fileSize = stat.size;
            const range = req.headers.range;
            
            if (range) {
                const parts = range.replace(/bytes=/, "").split("-")
                const start = parseInt(parts[0], 10)
                const end = parts[1] 
                    ? parseInt(parts[1], 10)
                    : fileSize-1
                const chunksize = (end-start)+1
                const file = fs.createReadStream(path, {start, end})
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': format
                }
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': format
                }
                res.writeHead(200, head)
                fs.createReadStream(path).pipe(res)
            }
        }  
    } else if ( req.query.path != undefined ) {
        console.log(`req.query.path ==> ${req.query.path}`);
        try {
            const path = process.env.MEDIA_PATH+req.query.path;
            const files = fs.readdirSync(path).filter((n) => {return n != 'Thumbs.db'});


            let media = [];

            for ( const file of files ) {
                const type = fs.lstatSync(path+'/'+file).isFile() === true ? 'file' : 'folder'; 
                console.log(type);

                const mediaProperties = {
                    name: file,
                    type: type
                };

                media.push(mediaProperties)
            };

            console.log("MEDIA - " + media);
            res.status(200).json({
                data: media
            })
            
        } catch (e) {
            res.status(400).json({
                message: e
            })
        }   
    }  
}

export { getMovies };