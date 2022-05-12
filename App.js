import fs from 'fs';
import http from 'http';
import express from 'express';
import cors from "cors";

import getMovies from './routes/getMovies.js'

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/api/', getMovies);

app.use('/coco', express.static('\\\\Droncomp\\VIDEO\\Мультики\\Disney\\Тайна Коко.mkv'));

const server = http.createServer(app);
  
server.listen(PORT, () => {
    console.log('Server started');
});