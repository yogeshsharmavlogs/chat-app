import User from "../models/user.model";
import bcrypt from "bcryptjs"

export const signup = (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6) {
        return res.this.status(400).json({message: "Password must be at least 6 characters"})
    }

    const user = await User.findOne({email})

    if(user) return res.status(400).json({ message: "Email already exist"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

const newUser = new User({
    fullName: fullName,
    email: email,
    password: hashedPassword
    
})
console.log(password);

  } catch (error) {}
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
