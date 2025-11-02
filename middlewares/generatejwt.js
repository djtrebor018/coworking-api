import jwt from 'jsonwebtoken'

export const generateToken =(uid='')=>{
    const payload ={uid}
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '2h'})
}