import Users from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req,res)=>{
    try {
        const users = await Users.findAll({
            attributes :['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error)

    }
}

export const Register  = async(req,res)=>{
    const { name, email, password,confpassword }=req.body;
  
    if (password.length < 8) {
      return res.status(400).json({ msg: 'Password harus memiliki panjang minimal 8 karakter' });
  }
    if(password !== confpassword) return res.status(400).json({msg:'Password dan Confirm Password tidak cocok'});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);

    try {
     const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
      return res.status(400).json({ msg: 'Email sudah terdaftar. Gunakan email lain.' });

    }

        await Users.create({
        name : name,
        email : email,
        password : hashPassword,

      


        });
        res.json({msg:'Register Berhasil'});
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Terjadi kesalahan saat mendaftar' });

    }

};


export const Login = async(req,res)=>{
  try {
      const user = await Users.findOne({
          where:{
              email: req.body.email
          }
      });

      if (!user) {
          return res.status(404).json({msg: "Email tidak ditemukan"});
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
          return res.status(400).json({msg: "Password salah"});
      }

      const userId = user.id;
      const name = user.name;
      const email = user.email;

      // Menambahkan claim "sub" dengan nilai ID pengguna
      const accessToken = jwt.sign({sub: userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '60m',
      });

      const refreshToken = jwt.sign({sub: userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '1d',
      });

      await Users.update({refresh_token: refreshToken}, { 
          where: {
              id: userId
          }
      });

      res.json({ accessToken });

  } catch (error) {
      console.error(error);
      res.status(500).json({msg: "Terjadi kesalahan saat login"});
  }
};


export const Logout = async (req, res) => {
      try {
        const refreshToken = req.refresh_token;
    
        if (!refreshToken) {
          return res.sendStatus(204); // No refresh token provided, return success (204 No Content)
        }
    
        const user = await Users.findOne({
          where: {
            refresh_token: refreshToken
          }   
        });
        
        if (!user) {
          return res.sendStatus(204); // No user found with the provided refresh token, return success
        }
    
        const userId = user.id;
    
        await Users.update({ refresh_token: null }, {
          where: {
            id: userId
          }
        });
    
        return res.sendStatus(20); // Logout successful, return success (204 No Content)
      } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    };