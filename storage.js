function saveArray(name,array){
    localStorage.setItem(name,JSON.stringify(array));
    return `Saved to ${name} as ${JSON.stringify(array)}`;
}

function loadArray(name){
    array = JSON.parse(localStorage.getItem(name));
    return array;
}