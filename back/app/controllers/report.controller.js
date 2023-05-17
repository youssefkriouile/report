const reports = require('../../data/reports');
const authors = require('../../data/authors');
const observations = require('../../data/observations');
const errorsKeyValue = require('../errors_message/errors_map');
const checkAuthorFields = require('../middlewares/author.middleware');
const reportValidation = require('../middlewares/report.middleware');

exports.create = (req, res) => {
    const report = req.body.report;
    checkAuthorFields(report.author, res);
    if( !reportValidation.productCodeIsvalid(report.productCode)) {
        res.status(500).send({message: errorsKeyValue.PRODUCT_CODE_INVALID});
    }
    if(!reportValidation.observationsAreValid(report.observations)) {
        res.status(500).send({message: errorsKeyValue.OBSERVATIONS_INVALID});
    }
    if(typeof report.description !== 'string') {
        res.status(500).send({message: errorsKeyValue.OBSERVATIONS_INVALID});
    }

    let mapObservations = [];
    report.observations.forEach(obs => {
        const correspendingObservation = observations.find(o => o.id == obs);
        mapObservations.push(correspendingObservation);
    });

    report.observations = mapObservations;
    authors.push(report.author);
    reports.push(report);
    report.id = reports.length+1;
    res.send(report);

};

exports.put = (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.send({
            message: errorsKeyValue.FINDONE_REPORT_API_NO_ID,
        });
    }
    const report = req.body.report;

    if(!report.productCode) {
        res.status(500).send({message: errorsKeyValue.PRODUCT_CODE_INVALID});
    }
    if(!reportValidation.productCodeIsvalid(report.productCode)) {
        res.status(500).send({message: errorsKeyValue.PRODUCT_CODE_INVALID});
    }
    if(!reportValidation.observationsAreValid(report.observations)) {
        res.status(500).send({message: errorsKeyValue.OBSERVATIONS_INVALID});
    }
    if(typeof report.description !== 'string') {
        res.status(500).send({message: errorsKeyValue.OBSERVATIONS_INVALID});
    }
    const reportIndex = reports.findIndex(rep => rep.id == id);
    if(reportIndex === -1) {
        res.send({message: errorsKeyValue.REPORT_NOT_FOUND});
    }
    let mapObservations = [];
    report.observations.forEach(obs => {
        const correspendingObservation = observations.find(o => o.id == obs);
        mapObservations.push(correspendingObservation);
    });
    report.observations = mapObservations;

    report.id = id;
    reports[reportIndex] = report;
    res.send(report);

}
 
exports.findAll = (req, res) => {
    try {
        res.send(reports)
    } catch(err) {
        res.status(500).send({
            message: errorsKeyValue.FINDALL_REPORT_API_DOWN,
        });
    };
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status.send({
            message: errorsKeyValue.FINDONE_REPORT_API_NO_ID,
        });
    }
    const report = reports.find(rep => rep.id == id); 
    if(!report) {
        res.send({
            message: errorsKeyValue.FINDONE_REPORT_NOT_FOUND
        });
    }
    res.send(report);
}
