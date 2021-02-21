const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createdDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createdDomPurify(new JSDOM().window)//creates html and purify it

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true

    },
    sanitizedHtml: {
        type: String,
        required: true
    }

    
})

articleSchema.pre('validate' , function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true , strict: true })
    
    }

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))//converts markdown into html and then purify it. That way no one can hack it.
    }

    next()
})

module.exports = mongoose.model('Article', articleSchema) //model is Articles.




// This file stores all of the articles