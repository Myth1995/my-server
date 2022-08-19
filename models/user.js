const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    gender: String,
}, {
    timestamps: ['createdAt', 'updatedAt']
});

const User = model("User", UserSchema);

module.exports = User;