import { authors } from '../../data/authors';

export const emailAlreadyUsed = (email) => {
    if(authors.find(author => author.email === email)) {
        return true;
    }
    return false;
};

export const sexeIsValid = (sexe) => {
    return ['Homme', 'Femme', 'Non-Binaire'].includes(author.sexe)
}

export const birthDateIsValid = (birthDate) => {
    const isdate = Date.parse(mydate);
    if (isNaN(isdate)) {
        return false;
    }
}
export const birthDateIsLessThan100Years = (birthDate) => {
    const EnteredDate = new Date(isdate);
    const now = new Date();
    if (EnteredDate.getFullYear() > now.getFullYear() + 100) {
        return false;
    }
    return true;
} 