const path = require('path');

const rootPath = (p) => path.join(__dirname, '../', p);

const {
    PORT = 3000
} = process.env;


const config = {
    port: PORT,
    paths: {
        eventsDb: rootPath('data/events.db'),
        public: rootPath('build'),
        indexHtml: rootPath('build/index.html')
    }
};

module.exports = config;
