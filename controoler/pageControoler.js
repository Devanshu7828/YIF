
const homePage = (req, res) => {
    res.render('homepage')
}

const form = (req, res) => {
    res.render('./forms/form')
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

module.exports = {homePage,form,aboutPage,coursePage,lmsPage};