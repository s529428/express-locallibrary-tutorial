const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

let AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

AuthorSchema.virtual('name').get(function(){
    let fullname = '';
    if(this.first_name && this.family_name) {
        fullname = this.family_name + ', ' + this.first_name;
    }
    if(!this.first_name && !this.family_name) {
        fullname = '';
    }
    return fullname;
});

AuthorSchema.virtual('url').get(function(){
    return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('lifespan').get(function() {
    let lifetime_string = '';
    if(this.date_of_birth) {
        lifetime_string = moment(this.date_of_birth).format('MMMM Do, YYYY');
    }
    lifetime_string += ' - ';
    if(this.date_of_death){
        lifetime_string += moment(this.date_of_death).format('MMMM Do, YYYY');
    }
    return lifetime_string
});

AuthorSchema.virtual('date_ofOburth_yyyy_mm_dd').get(function() {
    return moment(this.date_of_birth).format('YYYY-MM-DD');
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
    return moment(this.date_of_death).format('YYYY-MM-DD');
});

module.exports = mongoose.model('Author', AuthorSchema);