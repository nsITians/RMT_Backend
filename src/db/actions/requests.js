/**
 * Created by tech4GT on 17/10/18.
 */

const models = require('../models');

module.exports = {
    add: function(data){
        return models.Request.create(data);
    },
    edit: function (criteria,data) {
        return models.Request.update(data,{
            where: criteria
        });
    },
    find: function (criteria) {
        return models.Request.findAll({
            where: criteria
        });
    },
    findOrCreate: function(criteria,values){
        return models.Request.findOrCreate({
            where: criteria,
            defaults: values
        });
    },
    remove: function(criteria) {
        return models.Request.destroy({
            where: criteria
        });
    }
};