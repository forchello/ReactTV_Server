import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    path: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ['film', 'tv_series'],
        // required: true
    },
    // ico: {
    //     type: String,
    // },
    format: {
        type: String,
        enum: [
            'mkv',
            'mp4',
            'avi',
            'mpg',
            'wmv'
        ],
        required: true
    }
}, {
    versionKey: false
});

export default mongoose.model('Media', filmSchema);