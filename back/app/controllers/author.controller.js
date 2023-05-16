const authors = require('../../data/authors');
const checkAuthorFields = require('../middlewares/author.middleware');
const errorKeyValue = require('../errors_message/errors_map');

exports.create = (req, res) => {
    const author = req.body.author;
    checkAuthorFields(author, res);
    authors.push(author);
    res.send(author);
};

exports.findAll = (req, res) => {
    try {
        res.send(authors);
    } catch(err) {
        res.status(500).send({
            message: errorsKeyValue.FINDALL_AUTHOR_API_DOWN,
        });
    };
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status.send({
            message: errorsKeyValue.FINDONE_AUTHOR_API_NO_ID,
        });
    }
    const author = authors.find(author => author.id === id); 
    if(!author) {
        res.status(500).send({
            message: errorsKeyValue.FINDONE_AUTHOR_NOT_FOUND
        });
    }
    res.send(author);
}
