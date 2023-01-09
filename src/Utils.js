export function upperFirstChar(s){
    let curString = s.replace('_', ' ');
    return curString.charAt(0).toUpperCase() + curString.slice(1);
}

export function lowerAndReplace(s){
    let curString = s.replace(/\D/g, '');
    curString.toLowerCase();
    return curString;
}

export function createData(ingredients){
    var data = "";
    var courses = "";
    for(const [key, value] of Object.entries(ingredients)){
        if(key == 'courses'){
            for(const [key_c, value_c] of Object.entries(value)){
                if(value_c === true){
                    if(courses.length > 0) courses += ",";
                    courses += key_c;
                } 
            }
            if(courses.length > 0)
                data += "course="+courses;
        }
        else if(value === true){
            if(data.length > 0) data += "&";
            data += key+"="+value;
        } 
        else if(typeof(value) == 'object'){
            const ricData = createData(value); 
            if(data.length > 0 && ricData.length > 0) data += "&";
            data += ricData;
        }  
    }
    return data;
}