import { Router } from "express";
import userService from "../services/userService.js";

const authController = Router();

authController.get('/register', (req, res) => {
  res.render('auth/register')
});

authController.post('/register', async (req, res) => {
  const userData = req.body;

  await userService.register(userData);

  res.redirect('auth/login');

})

//render login page
authController.get('/login', (req, res) => {
  res.render('auth/login');
})

//Handle login
authController.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const token = await userService.login(email, password);

  //Attach token to cooke
  res.cookie('auth', token)
  
  res.redirect('/');
})

//Logout
authController.get('/logout', (req, res) => {
  res.clearCookie('auth');

  res.redirect('/');
})

export default authController