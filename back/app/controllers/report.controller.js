const reports = require('../../data/reports');
const authors = require('../../data/authors');
const observations = require('../../data/observations');
const errorsKeyValue = require('../errors_message/errors_map');
const authorChecks = require('../middlewares/author.middleware');
const reportValidation = require('../middlewares/report.middleware');

exports.create = (req, res) => {
    try {
        const report = req.body.report;
        authorChecks.checkAuthorFields(report.author, res);
        if(authorChecks.emailAlreadyUsed(report.author.email)){
            res.status(500).send({message: errorsKeyValue.EMAIL_ALREADY_USED});
        };
        if( !reportValidation.productCodeIsvalid(report.productCode)) {
            res.status(500).send({message: errorsKeyValue.PRODUCT_CODE_INVALID});
        }
        if(!reportValidation.observationsAreValid(report.observations)) {
            res.status(500).send({message: errorsKeyValue.OBSERVATIONS_INVALID});
        }
        if(typeof report.description !== 'string') {
            res.status(500).send({message: errorsKeyValue.OBSERVATIONS_INVALID});
        }
    
        report.observations = mapToObservations(report.observations);
        authors.push(report.author);
        reports.push(report);
        report.id = reports.length+1;
        res.send(report);
    } catch (error) {
        res.status(500).send({message: 'erreur serveur'});
    }

};

exports.put = (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            res.send({
                message: errorsKeyValue.FINDONE_REPORT_API_NO_ID,
            });
        }
        console.log(req.body);
        const report = req.body.report;

        const oldEmail = authors.find(author => author.id == report.author.id).email;
        console.log(oldEmail);
        authorChecks.checkAuthorFields(report.author, res);
        if(authorChecks.emailAlreadyUsed(report.author.email, oldEmail)){
            res.status(500).send({message: errorsKeyValue.EMAIL_ALREADY_USED});
        };
        console.log('ok');
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
    
        report.observations = mapToObservations(report.observations);
    
        report.id = id;
        reports[reportIndex] = report;
        res.send(report);
    } catch (error) {
        res.status(500).send({message: 'erreur serveur'});
    }

}

const mapToObservations = (reportObservations) => {
    let mappedObservations = [];
    reportObservations.forEach(obs => {
        const correspendingObservation = observations.find(o => o.id == obs);
        mappedObservations.push(correspendingObservation);
    });
    return mappedObservations;
}
 
exports.findAll = (req, res) => {
    try {
        res.send(reports)
    } catch(err) {
        res.status(500).send({
            message: 'erreur serveur',
        });
    };
}

exports.findOne = (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({message: 'erreur serveur'});
    }
}
