export const signup = (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6) {
        return res.this.status(400).json({message: "Password must be at least 6 characters"})
    }

    const user = await User.findOne({email})

    if(user) return res.status(400).json({ message: "Email already exist"})
  } catch (error) {}
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
