const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const User = require("../model/userModel");
const { generateToken } = require("../config/jwttoken");
const Stripe = require("stripe")
const stripe= Stripe(process.env.Stripe)

// console.log(process.env.Stripe)
const signup = async (req, res) => {
  try {
    const { username, email, password, phonenumber, college, passingyear } =
      req.body;

    try {
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: "User with this email already exists.",
        });
      }

      // Generate salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phonenumber,
        college,
        passingyear,
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      // Generate JWT token
      const token = generateToken(savedUser._id);

      // Send success response
      res.status(201).json({ user: savedUser, token, message: "Profile Created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // Find user by email or phone number
    // const user = await User.findOne({ email : emailOrPhoneNumber
    //   // $or: [{ email: emailOrPhoneNumber }, { phonenumber: emailOrPhoneNumber }],
    // });
    const user = await User.findOne({
      email,
    });
    console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid email/phone number or password" });
    }
    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid email/phone number or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const checkout = async (req, res) => {
//   const { price_data } = req.body;
//   const { email } = req.body;
//   console.log(req.body);

//   let purchaseCourse = {};
//   purchaseCourse = price_data;
//   const lineItems = [price_data].map((product) => ({
//     price_data: {
//       currency: "inr",
//       product_data: {
//         name: product.name,
//         images: [product.url],
//       },
//       unit_amount: product.price * 100,
//     },
//     quantity: product.quantity,
//   }));
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url:
//       "http://localhost:4000/order/success?session_id={CHECKOUT_SESSION_ID}&email=" +
//       email,
//     cancel_url: `https://prepbytes-clone-three.vercel.app//master-competitive-programming`,
//   });
//   console.log(session);
//   res.json({ id: session?.id, session: session });
// };

// const order = async (req, res) => {
//   let purchaseCourse = {};
//   let email = req.query.email;
//   let checkUser = await User.findOne({ email: email });
//   if (checkUser) {
//     let data = {};
//     console.log(purchaseCourse);
//     checkUser.course
//       ? (data = {
//           ...checkUser,
//           course: [...checkUser.course, purchaseCourse],
//         })
//       : (data = {
//           ...checkUser,
//           course: [purchaseCourse],
//         });
//     console.log(data);
//     try {
//       await User.updateOne(
//         { email: email },
//         { $push: { course: purchaseCourse } },
//         (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(result);
//           }
//         }
//       );
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   res.redirect("https://prepbytes-clone-three.vercel.app/dashboard");
// };

// const offer = async (req, res) => {
//   let email = req.body.email;
//   let checkUser = await User.findOne({ email: email });
//   res.json(checkUser);
// };

// const enquiryform = async (req, res) => {
//   try {
//     console.log(req.body);
//     await enquiry.insertOne(req.body);
//     res.status(200).send("Enquiry Send to host");
//   } catch (e) {
//     res.status(500);
//   }
// };

let = purchaseCourse = {};
const createCheckOutSession = async (req, res) => {
  // console.log(req.body);
  const { products } = req.body;

  const { email } = req.body;
  // console.log(req.body.email);
  if (email === undefined) {
    res.json({ err: "user email missing" });
  }
    purchaseCourse = products;
    // console.log(purchaseCourse);


    const lineItems = [products].map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.url],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));
    // console.log(lineItems)
    
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: lineItems,
    //   mode: "payment",
    //   success_url:
    //     "https://prepbytes-clone-yczy.onrender.com/order/success?session_id={CHECKOUT_SESSION_ID}&email=" +
    //     email,
    //   cancel_url: `https://prepbytes-clone-1.netlify.app/master-competitive-programming`,
    // });

    // console.log(session)

    const customer = await stripe.customers.create(
      {
        description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
      },
      {
        idempotencyKey: 'KG5LxwFBepaKHyUD',
      }
    );
    console.log(customer)
    // res.json({ id: session.id, session: session });
  
};
module.exports = { signin, signup, createCheckOutSession };
