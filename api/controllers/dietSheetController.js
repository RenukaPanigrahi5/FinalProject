const DietSheet = require('../model/dietSheetModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
exports.getDietByCategory = function (req, res) {
    const dietCategory = req.body.dietCategory;
    DietSheet.getDietByCategory(dietCategory, (err, dietSheets) => {
        if (err) throw err;
        if (isEmptyObject(dietSheets)) {
            return res.json({
                success: true,
                msg: 'DietSheet not found for the user' + dietCategory
            });
        }
        else {
            res.json({
                success: true,
                dietSheets: dietSheets
            });
        }
    });
};

exports.addNewDiets = function (req, res) {
    if (req.body.dietSheets) {
        DietSheet.addManyDiets(req.body.dietSheets, (err, user) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to add multiple DietSheet' });
            } else {
                res.json({ success: true, msg: 'DietSheets added successfully' });
            }
        });
    } else {
        let newDietSheet = new DietSheet(req.body);
        DietSheet.addNewDiet(newDietSheet, (err, user) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to add new DietSheet' });
            } else {
                res.json({ success: true, msg: 'DietSheet added successfully' });
            }
        });
    }

};