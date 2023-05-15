const authors = require('../../data/authors');
import { errorsKeyValue} from '../errors_message/errors_map';
import { emailAlreadyUsed, sexeIsValid, birthDateIsValid, birthDateIsLessThan100Years } from '../middlewares/author.middleware'

exports.create = (req, res) => {
    const author = req.body.author;
    if(!author) {
        //TODO : create a middleware function  to send error with code 500
        res.status(500).send(errorsKeyValue.AUTHOR_CANNOT_BE_EMPTY);
    }
    if(!author.firstName || !author.lastName || !author.birthDate || !author.sexe || !author.email) {
        res.status(500).send(errorsKeyValue.AUTHOR_NOT_VALID)
    }
    if(author.firstName.length > 50 || author.lastName.length > 50) {
        res.status(500).send(errorsKeyValue.NAME_TOO_LONG)
    }
    if(emailAlreadyUsed(author.email)) {
        res.status(500).send(errorsKeyValue.EMAIL_ALREADY_USED);
    } 
    if(!sexeIsValid(author.sexe)) {
        res.status(500).send(errorsKeyValue.GENDER_NOT_VALID);
    }
    if(!birthDateIsValid(author.birthDate)) {
        res.status(500).send(errorsKeyValue.BIRTHDATE_NOT_VALID);
    }
    if(!birthDateIsLessThan100Years(author.birthDate)) {
        res.status(500).send(errorsKeyValue.BIRTHDATE_NOT_VALID);
    }
    authors.push(author);
    res.send(author);
};

exports.findAll = (req, res) => {
    try {
        res.send(authors)
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
