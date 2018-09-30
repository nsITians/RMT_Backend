/**
 * Created by tech4GT on 9/30/18.
 */

const models = require('../models');

module.exports = {
    add: function(data){
        return models.Post.create(data);
    },
    edit: function (criteria,data) {
        return models.Post.update(data,{
            where: criteria
        });
    },
    find: function (criteria) {
        return models.Post.findAll({
            where: criteria
        });
    }
};