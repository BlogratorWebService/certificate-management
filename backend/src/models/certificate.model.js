import mongoose, {Schema} from 'mongoose';

const certificateSchema = new Schema({
    certificateId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    downloadUrl: {
        type: String,
        required: true,
        trim: true,
    },
});

certificateSchema.pre('save', async function (next) {
    // i need to first generate a pdf file using this details.
    // and then save the returned link as the the download link.
    // and also i need to manage the files efficiently.

    // i need to generate pdf everytime when anything changes in the certificate
    next();
}
);

export default mongoose.model('Certificate', certificateSchema);