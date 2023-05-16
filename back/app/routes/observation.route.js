module.exports = app => {
    const  observations = require('../controllers/observation.controller');
    const router = require('express').Router();
    
    router.get('/', observations.findAll);
    app.use('/api/observations', router);
}