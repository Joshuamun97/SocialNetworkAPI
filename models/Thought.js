const { Schema, Types,model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        }
    });

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        userId: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        reactions: [reactionSchema],

    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,

    });

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
