var jwt = require("jsonwebtoken")
module.exports = function (token) {
    
    jwt.verify(token, '"snuerearaj"', function(err, decoded) {

        if(err)
            throw err;
        else{
            if(decoded){
                 return true;
            }
            else
                return false;
        }
      });    

};