const observations = require('../../data/observations');

exports.productCodeIsvalid = (productCode) => {
    if (!productCode || typeof productCode !== 'string' || productCode.length > 13 || productCode.length < 10) {
        return false;
    }
    return true;
}

exports.observationsAreValid = (selectedObservations) => {
    const observationsIds = observations.map(observation => observation.id);
    selectedObservations.forEach(observation => {
        if(observationsIds.includes(observation)) {
            return false;
        }
    });
    return true;
}