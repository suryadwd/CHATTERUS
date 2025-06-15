import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Google Auth Init
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google Callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failed',
    successRedirect: '/auth/profile'
  })
);

// Auth Failure
router.get('/failed', (req, res) => {
  res.status(401).send("Authentication Failed");
});

// Auth Success
router.get('/profile', (req, res) => {
  if (!req.user) return res.redirect('/auth/google');
  res.send(`
    <h2>Welcome, ${req.user.displayName}</h2>
    <p>Email: ${req.user.email}</p>
    <img src="${req.user.photos?.[0]?.value}" alt="profile" width="100"/>
  `);
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

export default router;
