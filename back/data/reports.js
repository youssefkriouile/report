const author = require('./authors');
const observations = require('./observations');

const reports = 
[    
    {
        id:1,
        author:author[0],
        productCode:"11111111111",
        observations:[observations[2]],
        description:"BlaBlaBla"
    },
    {
        id:2,
        author:author[1],
        productCode:"22222222222",
        observations:[observations[1], observations[0]],
        description:"BlaBlaBla"
    }
    
];

module.exports = reports;