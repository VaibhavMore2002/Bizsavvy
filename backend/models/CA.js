const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CASchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'ca' },
        licenseNumber: { type: String, required: true, unique: true },
        yearOfRegistration: { type: String, required: true },
        practiceArea: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        // profileImageUrl: { type: String, default: null },
    },
    { timestamps: true }
);

CASchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

CASchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("CA", CASchema);