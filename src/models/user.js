var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        index: { 
            unique: true 
        }
    },
    password: { 
        type: String, 
        required: true 
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // aplicar hash cuando el texto es nuevo o modificado
    if (!user.isModified('password')) return next();

    // Genera el hash
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // Se sobreescribe el password en claro, al password con hash
            user.password = hash;
            next();
        });
    });
});

// bcrypt.compare('somePassword', hash, function(err, res) {
//     if(res) {
//      // Passwords match
//     } else {
//      // Passwords don't match
//     } 
// });

module.exports = mongoose.model('User', UserSchema);