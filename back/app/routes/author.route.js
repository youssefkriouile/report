module.exports = app => {
    const  authors = require('../controllers/author.controller');
    const router = require('express').Router;
    
    router.post('/', authors.create);
    router.get('/', authors.findAll);
    router.get('/:id', authors.findOne);
    
    app.use('/api/authors', router);
}