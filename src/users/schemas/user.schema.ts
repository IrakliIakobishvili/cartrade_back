import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ["local", "google", "facebook"],
        required: true
    },
    google: {
        id: String,
    },
    facebook: {
        id: String,
        avatar: String
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        // required: true,
        select: false
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
    }
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'

/*----------*/
// UserSchema.pre('save', function (next) {
//     let user = this;
//     if (user.method !== "local") {
//         next();
//     }
//     // Make sure not to rehash the password if it is already hashed
//     if (!user.isModified('password')) return next();
//     // Generate a salt and use it to hash the user's password
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });
/*-------------*/

UserSchema.methods.checkPassword = function (attempt, callback) {
    let user = this;
    // console.log(this);

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};


// userSchema.methods.isValidPassword = async function(newPassword) {
//     try {
//       return await bcrypt.compare(newPassword, this.local.password);
//     } catch (error) {
//       throw new Error(error);
//     }
//   };
