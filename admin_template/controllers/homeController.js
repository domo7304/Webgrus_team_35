const indexView = (req, res, next) => {
    res.render('home');
}

const tableView = (req, res, next) => {
    res.render('table');
}
module.exports = {
    indexView,
    tableView
}