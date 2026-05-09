const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoID: { type: String },
        level: { type: String },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    },
);
Course.pre('save', function () {
    if (this.name) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
            locale: 'vi',
        });
    }
});
module.exports = mongoose.model('Course', Course);
