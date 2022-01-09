


let cache=[]



function updateCache(d){
    if(d.length>1){
        cache=cache.concat(d)
    }else{
        cache.push(d)
    }
}
function getCache(){
    return cache
}


module.exports={getCache,updateCache}