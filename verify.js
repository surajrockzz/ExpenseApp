module.exports = function (token) {
    
    jwt.verify(token, '"snuerearaj"', function(err, decoded) {
        // err
        // decoded undefined
        if(err)
            throw err;
        else{
            if(decoded){
                 return decoded.username;
            }
            else
                return false;
        }
      });    

};