/**
 * Created by tech4GT on 10/05/18.
 */

const models = require('../models');

module.exports = {
    add: function(data){
        return models.Course.create(data);
    },
    edit: function (criteria,data) {
        return models.Course.update(data,{
            where: criteria
        });
    },
    find: function (criteria) {
        return models.Course.findAll({
            where: criteria
        });
    },
    remove: function(criteria) {
        return models.Course.destroy({
            where: criteria
        });
    }
};