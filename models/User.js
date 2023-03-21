const {Schema, model} = require('mongoose');
// import { isEmail } from 'validator';

const userSchema = new Schema (
{
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: [ isEmail, 'invalid email' ]
    },
    // thoughts: [thoughtSchema],
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
        ],
    // thoughts-Array of _id values referencing the Thought model
    // friends: [userSchema],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
    // friends-Array of _id values referencing the User model (self-reference)


// create a virtual called friendCount that retrieves the length of the user's friends array field on query.