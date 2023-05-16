const authors = require('../../data/authors'); 
const errorsKeyValue = require('../errors_message/errors_map');


const emailAlreadyUsed = (email) => {
    if(authors.find(author => author.email === email)) {
        return true;
    }
    return false;
};

const sexeIsValid = (sexe) => {
    return ['Homme', 'Femme', 'Non-Binaire'].includes(sexe);
}

const birthDateIsValid = (birthDate) => {
    const isdate = Date.parse(birthDate);
    if (isNaN(isdate)) {
        return false;
    }
    return true;
}
const birthDateIsLessThan100Years = (birthDate) => {
    const EnteredDate = new Date(birthDate);
    const now = new Date();
    if (EnteredDate.getFullYear()+100 < now.getFullYear()) {
        return false;
    }
    return true;
} 

module.exports = checkAuthorFields = (author, res) => {
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
} 
