
const homePage = (req, res) => {
    res.render('homepage')
}

const Signform = (req, res) => {
    res.render('./forms/signin')
}

const registerForm = (req, res) => {
    res.render('./forms/registration')
}


const aboutPage = (req, res) => {
    res.render('aboutPage')
}

const coursePage = (req, res) => {
    res.render('coursePage')
}

const lmsPage = (req, res) => {
    res.render('lmspage')
}

module.exports = {homePage,Signform,registerForm,aboutPage,coursePage,lmsPage};