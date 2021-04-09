const express = require("express");
const router = express.Router();
const passport = require("passport");
const { guest } = require("../middleware/GuestMiddleware");
// PAGE CONTROOLER
const pageController = require("../controoler/pageControoler");
// AUTH CONTROOLER
const authControoler = require("../controoler/authControoler");
// PASSPORT middleware
const google = require("../middleware/googleMiddleware");
const fb = require("../middleware/fbMidleware");

// PAGE ROUTES
router.get("/", pageController.homePage);
router.get("/about", pageController.aboutPage);
router.get("/course", pageController.coursePage);
router.get("/lms", pageController.lmsPage);
router.get("/login", guest, pageController.Signform);
router.get("/register", guest, pageController.registerForm);
router.get("/logout", authControoler.logoutUser);

// LOGIN/REGISTER ROUTES
router.post("/register", authControoler.registerUser);
router.post("/login", authControoler.loginUser);

// GOOGLE LOGIN SYSTEM
router.get("/google/auth", google.googleMiddleware);
router.get("/google/auth/callback", google.googleLogin);

// FACEBOOK LOGIN SYSTEM
router.get("/fb/auth", fb.fbMidleware);

router.get("/fb/auth/callback", fb.fbLogin);

module.exports = router;
