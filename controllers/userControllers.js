const User = require("../models/userModels");
const brcypt = require('bcrypt');

module.exports.register = async (req,res) => {
   try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if(usernameCheck){
         return res.json({ msg:"Username already used",status:false });
      }
      const emailCheck = await User.findOne({email});
      if(emailCheck){
        return res.json({ msg:"Email already used",status:false }); 
      }
      const hashedPassword = await brcypt.hash(password.toString(), 10);
      const user = await User.create({
         email,
         username,
         password:hashedPassword  
      });
      delete user.password;
      return res.json({ status:true , user});
   } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error" });
   }
};
module.exports.login = async (req,res) => {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if(!user){
         return res.json({ msg:"Incorrect username or password",status:false });
      }
      const isPasswordvalid = await brcypt.compare(password, user.password);
      if(!isPasswordvalid){
        return res.json({ msg:"Incorrect username or password",status:false }); 
      }
      delete user.password;
      return res.json({ status:true , user});
   } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error" });
   }
};
module.exports.setAvatar = async (req, res, next) => {
   try {
     const userId = req.params.id;
     const avatarImage = req.body.image;
     const userData = await User.findByIdAndUpdate(
       userId,
       {
         isAvatarImageSet: true,
         avatarImage,
       },
       { new: true }
     );
     return res.json({
       isSet: userData.isAvatarImageSet,
       image: userData.avatarImage,
     });
   } catch (ex) {
      return res.status(500).json({ msg: "Internal Server Error" });
   }
 };   
module.exports.getAllUser = async (req, res) => {
   try {
     const users = await User.find({_id : {$ne: req.params.id}}).select([
       "email",
       "username",
       "avatarImage",
       "_id"
     ]);
     return res.json(users);
   } catch (ex) {
      return res.status(500).json({ msg: "Internal Server Error" });
   }
 };   

module.exports.test = async (req,res) =>{
   res.send("done")
}