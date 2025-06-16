import { Router } from 'express';
import { getUserInfo, login, logout, register } from '../controllers/auth.js';
import { protectRoute } from '../utils/middleware.js';
import passport from 'passport';
import { User } from '../models/user.modal.js';

const router = Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", protectRoute, getUserInfo);
// Google Auth Init
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google Callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/auth/failed',
    successRedirect: 'http://localhost:5173/home'
  })
);

// Auth Failure
router.get('/failed', (req, res) => {
  res.status(401).send("Authentication Failed");
});

// Auth Success
router.get('/profile', (req, res) => {
  if (!req.user) return res.redirect('/auth/failed');

  const { _id, email, name, photo, loginMethod } = req.user;

  return res.status(200).json({
    id: _id,
    email,
    name,
    photo,
    loginMethod
  });
});




// Home route (Google login button)
router.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/auth/');
    });
  });
});


// Start GitHub Auth
router.get('/github', passport.authenticate('github'));

// GitHub Callback
router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/failed',
    successRedirect: 'http://localhost:5173/home'
  })
);

// LinkeIn Auth
router.get('/auth/linkedin',passport.authenticate('linkedin'));

// LinkeIn callback
router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: '/failed',
  }));

export default router;
