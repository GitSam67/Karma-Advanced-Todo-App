const jwt = require("jsonwebtoken");
const User = require("./database/model/user");

const authenticate = async (req,res,next) => {
    try {
        const auth_token = req.params.token;
        console.log(auth_token + ' auth_token');
        const verifyToken = jwt.verify(auth_token, process.env.REFRESH_SECRET_KEY, (err, result)=>{
            if (err) {
                return 406;
            }
            else {
                return result;
            }
        });

        if(verifyToken == 406) {
            req.user = "token expired";
            res.status(406);
            next();
        }
        else {
            console.log(verifyToken);

            const user = await User.findOne({_id: verifyToken._id})

            if(!user)
                throw new Error("User not found")

            req.token = auth_token;
            req.user = user;
            req.userId = user._id;
            console.log(user);

            next();
        }
    }
    catch (err) {
        req.user = "token expired";
        res.status(406);
        next(err);
    }

}

module.exports = authenticate;