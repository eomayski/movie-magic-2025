import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth, isGuest } from "../middleware/authMiddleware.js";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
  res.render('auth/register')
});

authController.post('/register', isGuest, async (req, res) => {
  const userData = req.body;

  await authService.register(userData);

  res.redirect('auth/login');

})

//render login page
authController.get('/login', isGuest, (req, res) => {
  res.render('auth/login');
})

//Handle login
authController.post('/login', isGuest, async (req, res) => {
  const {email, password} = req.body;

  const token = await authService.login(email, password);

  //Attach token to cooke
  res.cookie('auth', token)
  
  res.redirect('/');
})

//Logout
authController.get('/logout', isAuth, (req, res) => {
  res.clearCookie('auth');

  res.redirect('/');
})

export default authController