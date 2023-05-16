const author = require('./authors')

const reports = 
[    
    {
        id:1,
        author:author[0],
        productCode:"11111111111",
        observations:[1],
        description:"BlaBlaBla"
    },
    {
        id:2,
        author:author[1],
        productCode:"22222222222",
        observations:[2, 3],
        description:"BlaBlaBla"
    }
    
];

module.exports = reports;