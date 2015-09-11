var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  bcrypt = require('bcrypt');

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  email: {
    type: String,
    index: true,
    sparse: true,
    unique: true
  },
  password: {
    type: String,
    index: true
  },
  firstName: String,
  lastName: String,
  profilePictureURL: {
    unique: true,
    sparse: true,
    type: String
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'accounts'
  }],
  profileUrl: {
    type: String,
    sparse: true,
    unique: true
  },
  settings: {
    type: Schema.Types.ObjectId,
    ref: 'settings'
  },
  lastLoggedIn: Date,
  dateSignedUp: {
    type: Date,
    default: Date.now
  },
  timezone: String,
  lastIP: String
});

userSchema.methods = {
  authenticate: function(password, hashedPassword, done) {
    bcrypt.compare(password, hashedPassword, function(err, validPassword) {
      done(err, validPassword);
    });
  },
  encrypt: function(password, done) {
    bcrypt.genSalt(14, function(err, salt) {
      if (err) {
        console.log(err);
        done(err, null);
      }
      bcrypt.hash(password, salt, function(err, hash) {
        done(err, hash);
      });
    });
  }
};

userSchema.plugin(timestamps);

module.exports = mongoose.model('users', userSchema);
