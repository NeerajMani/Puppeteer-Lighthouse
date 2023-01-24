async function subtractDuration(schema1,schema2) {
    var ret = {};
    for (var key in schema1) {
    if(schema1.hasOwnProperty(key) && schema2.hasOwnProperty(key)) {
    var obj = schema1[key];
    var obj2 = schema2[key]
    if(key=="LayoutDuration" || key=="RecalcStyleDuration" || key=="ScriptDuration" || key=="TaskDuration") {
    ret[key] = Math.round((obj-obj2)*100)/100;
    }
    else {
    if(typeof obj === 'object' && typeof obj2 === 'object') {
    ret[key] = subtractDuration(obj,obj2);
    }
    else {
    ret[key] = obj;
    }
    }
    }
    }
    return ret;
    }
    module.exports = subtractDuration;