const reports = require('../../data/reports');
const authors = require('../../data/authors');
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
    if( !reportValidation.productCodeIsvalid(report.productCode)) {
        res.status(500).send({message: errorsKeyValue.PRODUCT_CODE_INVALID});
    }
    if(!reportValidation.observationsAreValid(report.observations)) {
        res.status(500).send({message: errorsKeyValue.OBSERVATIONS_INVALID});
    }
    if(typeof report.description !== 'string') {
        res.status(500).send({message: errorsKeyValue.OBSERVATIONS_INVALID});
    }
    const reportIndex = reports.findIndex(rep => rep.id == report.id);
    if(reportIndex === -1) {
        res.send({message: errorsKeyValue.REPORT_NOT_FOUND});
    }
    reports[reportIndex] = report;
    res.send(report);

}
 
exports.findAll = (req, res) => {
    //not important in the case of this technical test, but if we are using a database, it is beter to try catch 
    //we will not implement try catch for the other methods
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
    const report = reports.find(report => report.id === id); 
    if(!report) {
        res.send({
            message: errorsKeyValue.FINDONE_REPORT_NOT_FOUND
        });
    }
    res.send(report);
}
