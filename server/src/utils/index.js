'use strict';

const _ = require('lodash');

const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds);
}

//['a', 'b'] ---> {a: 1, b: 1}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]));
}

//['a', 'b'] ---> {a: 0, b: 0}
const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0]));
}

const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(key => {
        if (obj[key] == null) {
            delete obj[key];
        }
    })

    return obj;
}

/*
    const a= {
        c:{
            d:1
        }
    }
    ==>
    db.collection.updateOne({
        c.d : 1;
    })

*/
const updateNestedObjectParser = obj => {
    const final = {};
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === "Object" && !Array.isArray(obj[key])) {
            const response = updateNestedObjectParser(obj[key]);
            Object.keys(response).forEach(a => {
                final[`${key}.${a}`] = res[a];
            });
        } else {
            final[key] = obj[key];
        }
    })
    return final;
}

module.exports = {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    updateNestedObjectParser
}