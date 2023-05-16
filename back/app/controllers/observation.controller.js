const observations = require('../../data/observations');

exports.findAll = (req, res) => {
    try {
        res.send(observations)
    } catch(err) {
        res.status(500).send({
            message: errorsKeyValue.FINDALL_REPORT_API_DOWN,
        });
    };
}