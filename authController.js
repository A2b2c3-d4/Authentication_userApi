const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {

        const email = await User.findOne({ email: req.body.email })
        if (email) {
            return res.status(404).json({ msg: "email all ready exist" })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = await User.create({
            email: req.body.email,
            password: hashedPassword,
            userName: req.body.userName
              });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ message: 'User not found' });
    }
};

exports.getUserById = async(req,res)=>{
    try{
       const data = req.params.id;
       const user = await User.findById(data);
       if(!user){
        return res.status(404).json({ message: 'User not created' });
       }
       return res.status(200).json(user)
    }
    catch{
        return res.status(400).json({ error: 'User not found' });
    }
}

exports.updateUser = async(req,res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!updatedUser) {
            return res.status(409).json({ msg: "User not found" });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(501).json({message: "Internal server error"})
    }
};




exports.createRegister =  async (req, res) => {
    
    const { userName, email, password, role, gender } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ userName, email, password: hashedPassword, role, gender });
        await user.save();
        console.log(user);

        res.json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
   
  };
  
  // Login
  exports.createLogin  = async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    } 
    const token = jwt.sign({ id: user.userName, role: user.role }, process.env.JWT_SECRET,  { expiresIn: "1h" });
    res.json({ token });
    console.log(token);
    };

  