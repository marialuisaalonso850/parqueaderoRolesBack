const { jsonResponse }=require( "../controllers/jsonResponse");
const User =require( "../models/user");
const getUserInfo =require("../models/getUserInfo");
const postUser= async (req, res)=>{
    

        const { gmail, password } = req.body;
    
        if (!!!gmail || !!!password) {
            return res.status(400).json(jsonResponse(400, {
                error: "archivos son requeridos"
            }));
        }
        //autenticar usuario
    
        const user = await User.findOne({ gmail });
    
        if (user) {
            const correctPassword = await user.comparePassword(password, user.password);
    
            if (correctPassword) {
                const accessToken = user.createAccessToken();
                const refreshToken = await user.createRefreshToken();
                console.log('refresToken  de login',refreshToken);
                console.log('/n');
                console.log('---------------------------------');
                console.log('accessToken de login', refreshToken);
                res.status(200)
                    .json(
                        jsonResponse(200, {
                            user: getUserInfo(user),
                            accessToken,
                            refreshToken
                }));
            } else {
                res.status(400)
                    .json(
                        jsonResponse(400, {
                            error: "Usuario o contraseña incorrectos"
                }))
            }
        } else {
            res.status(400).json(jsonResponse(400, {
                error: "Usuario no encontrado"
            }))
        }
    }
module.exports=postUser;