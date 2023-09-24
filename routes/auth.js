const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    // Check the role of the user and redirect accordingly
    switch (req.user.role) {
      case 'shipper':
        res.redirect('/shipper');
        break;
      case 'vendor':
        res.redirect('/vendor');
        break;
      case 'customer':
        res.redirect('/customer');
        break;
      default:
        res.redirect('/login'); // Redirect to login page if role is not recognized
    }
  } else {
    res.redirect('/login'); // Redirect to login page if not authenticated
  }
});

module.exports = router;
