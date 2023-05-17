const authors = require('../../data/authors');
const authorChecks = require('../middlewares/author.middleware');
const errorKeyValue = require('../errors_message/errors_map');

exports.create = (req, res) => {
    const author = req.body.author;
    authorChecks.checkAuthorFields(author, res);
    if(authorChecks.emailAlreadyUsed(author.email)){
        res.status(500).send({message: errorsKeyValue.EMAIL_ALREADY_USED});
    };
    authors.push(author);
    res.send(author);
};

exports.findAll = (req, res) => {
    try {
        res.send(authors);
    } catch(err) {
        res.status(500).send({message: 'erreur serveur'});
    };
}

exports.findOne = (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({message: 'erreur serveur'});
    }
}
