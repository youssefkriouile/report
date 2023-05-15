import { observations } from '../../data/observations'

export const productCodeIsvalid = (productCode) => {
    if (typeof productCode !== 'string' || productCode.length > 13 || productCode.length < 10) {
        return false;
    }
    return true;
}

export const observationsAreValid = (selectedObservations) => {
    const observationsIds = observations.map(observation => observation.id);
    selectedObservations.forEach(observation => {
        if(observationsIds.includes(observation)) {
            return false;
        }
    });
    return true;
}