/**
 * Created by tech4GT on 9/30/18.
 */

const models = require('../models');

module.exports = {
    add: function(data){
        return models.Teacher.create(data);
    },
    edit: function (criteria,data) {
        return models.Teacher.update(data,{
            where: criteria
        });
    },
    find: function (criteria) {
        return models.Teacher.findAll({
            where: criteria
        });
    },
    remove: function(criteria) {
        return models.Teacher.destroy({
            where: criteria
        });
    }
};
