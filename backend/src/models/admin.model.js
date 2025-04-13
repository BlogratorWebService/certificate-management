import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

}, {timestamps: true});

// Hash the password before saving the admin document
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;
        this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
adminSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model('Admin', adminSchema)
export default Admin;