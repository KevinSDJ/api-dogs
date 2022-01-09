


function logout(req,res){
    res.clearCookie('uTkn')
    res.status(200).json({msg:"ok"})
      
}


module.exports={logout}