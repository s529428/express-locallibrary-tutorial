const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const BookInstanceShema = new Schema({
    book: {type: Schema.ObjectId, reg: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum:['Available', 'Maintenance', 'Loanded', 'Reserved'], default:'Maintenance'},
    due_back: {type: Date, default: Date.now},
});

BookInstanceShema.virtual('url').get(function(){
    return ' /catalog/bookinstance/'+this._id;
});

BookInstanceShema.virtual('due_back_formatted').get(function() {
    return moment(this.due_back).format('MMMM Do, YYYY');
});

BookInstanceShema.virtual.get('due_back_yyyy_mm_dd').get(function() {
    return moment(this.due_back).format('YYYY-MM-DD');
});

module.exports = mongoose.model('BooksInstance', BookInstanceShema);