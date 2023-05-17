module.exports = app => {
    const  reports = require('../controllers/report.controller');
    const router = require('express').Router();
    
    router.post('/', reports.create);
    router.get('/', reports.findAll);
    router.get('/:id', reports.findOne);
    router.put('/:id', reports.put);

    app.use('/api/reports', router);
}