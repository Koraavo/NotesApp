import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
Main Controller for the users
The three things that can be done with the data:
- register the user
- login the user
- verify the user to access the data
*/

const userCtrl = {
  /*
  registering a user requires
  - username, 
  - email
  - password
  This information is requested by the user and generated as a json object/file
  */

  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      //   res.json(req.body);

      /*
      check if the user exists in the database using the email
      if user exists return that it exists, else 
      hash the password that the user sends
      create a new user using the details posted by the user with the hashed password
      save the data in the database
      */

      const user = await userModel.findOne({ email: email });
      if (user) return res.status(400).json({ msg: "The email already exists" });

      const passwordHash = await bcrypt.hash(password, 10);
      //   res.json(passwordHash);
      const newUser = new userModel({
        username,
        email,
        password: passwordHash,
      });

      await newUser.save();
      res.status(200).json({ msg: "User Registered Successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  loginUser: async (req, res) => {
    /*
    get the email and password from the data the user has entered
    check if the email exists and the password is correct
    check password :
      - check the data entered using req.body (save the password)
      - check the users password from database, after you find the mail
    if login is successful, generate a token
    a jwt token consists of headers with payload and the token
    create payload and token using the payload, and the token
    check the token using res.json
    */

    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

      // if login is successful create a token
      // A token contains payload, headers and the token itself created with the secret key
      const payload = { id: user._id, name: user.username };
      // payload, secret token and an expiry date for the token
      const token = jwt.sign(payload, process.env.TOKEN, { expiresIn: "1d" });
      // generate the token and save it under response.json
      // thus the file will look like:
      // Response: {token:xyz}
      res.json({ token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  verifiedToken: (req, res) => {
    /* 
    In order to verify token
    all the tokens are in the header with a bearer
    verify the token, with the token saved 
    if the token is verified, find the user in the userschema by its id
    if the user does not exist, do not send token 
    */
    try {
      /*
      get the token from the headers under authorization as key
      if there is no token, do not send any response
      else verify the token with the token saved in the dotenv file
      Since becrypt is async, it will give an async req, response
      if no err, find the user by its id in the usermodel
      */
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN, async (err, verified) => {
        if (err) return res.send(false);
        const user = await userModel.findById(verified.id);
        if (!user) return res.send(false);
        return res.send(true);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default userCtrl;
