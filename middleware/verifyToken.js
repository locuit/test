const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    let token;
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            token = bearerToken;
        }
        if (token)
        {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
                if(err)
                {
                    return res.status(403).json('Token is not valid');
                }
                else
                {
                    req.user = decoded;
                    next();
                }
            })
        }
        else 
        {
            return res.status(401).json('You are not authenticated');
        }
}

module.exports = verifyToken;