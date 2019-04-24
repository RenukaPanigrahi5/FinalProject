const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// User Schema
const DietSheetSchema = mongoose.Schema({
    dietName: {
        type: String
    },
    dietType: {
        type: String,
        required: true
    },
    dietCategory: {
        type: String,
        required: true
    },
    daysToFollow: {
        type: String,
        required: true
    }

});
const DietSheet = module.exports = mongoose.model('DietSheet', DietSheetSchema);
module.exports.getDietByCategory = function(dietCategory, callback) {
    const query = {dietCategory: dietCategory}
DietSheet.find(query, callback);
}
module.exports.addNewDiet = function(newDiet, callback){
    newDiet.save(callback);
}
module.exports.addManyDiets = function(newDiets, callback){
    DietSheet.create(newDiets, callback);
}