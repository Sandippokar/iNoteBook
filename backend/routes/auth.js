const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'sandipproject';

//ROUTE 1 : create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter valid Name").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password must be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    //Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{
            id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);

    //   res.json(user);
      res.json({authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

//ROUTE 2 : Authentication a User using: POST "/api/auth/login". No login required
router.post(
    "/login",
    [
      body("email", "Enter valid Email").isEmail(),
      body("password", "Enter password").exists(),
    ],
    async (req, res) => {

        //If there are errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const {email, password} = req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "Please try to login with correct Credentials"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({error: "Please try to login with correct Credentials"});
            }

            const data = {
                user:{
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({authtoken});

        } catch (error){
            console.error(error.message);
            res.status(500).send("Internal server Error");
        }
    }
)

//ROUTE 3 : Get loggedin User Details using: POST "/api/auth/getuser". login required
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {

  try{
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Inetrnal Server Error");
  }

  }
)



module.exports = router;
