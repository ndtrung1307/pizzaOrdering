

module.exports.mergeUpdateObject = (object1, object2) => {
    
    let keys = Object.keys(object1);

    keys.forEach( key => {
        console.log(object1[key]);
    });
};