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
const linkedin = require("../middleware/linkedinMiddleware");
const github = require("../middleware/gitMiddleware");

// PAGE ROUTES
router.get("/", pageController.homePage);
router.get("/login", guest, pageController.Signform);
router.get("/register", guest, pageController.registerForm);
router.get("/about", pageController.aboutPage);
router.get("/course", pageController.coursePage);
router.get("/lms", pageController.lmsPage);

// LOGIN/REGISTER ROUTES
router.post("/register", authControoler.registerUser);
router.post("/login", authControoler.loginUser);
router.get("/logout", authControoler.logoutUser);

// GOOGLE LOGIN SYSTEM
router.get("/google/auth", google.googleMiddleware);
router.get("/google/auth/callback", google.googleLogin);

// FACEBOOK LOGIN SYSTEM
router.get("/fb/auth", fb.fbMidleware);

router.get("/fb/auth/callback", fb.fbLogin);

// GIHUB LOGIN SYSTEM
router.get("/git/auth", github.gitMiddleware);
router.get("/git/auth/callback", github.gitLogin);

// LINKEDIN LOGIN SYSTEM
router.get("/linkedin/auth", linkedin.linkedinMiddleware);
router.get("/auth/linkedin/callback", linkedin.linkedinLogin);
module.exports = router;
