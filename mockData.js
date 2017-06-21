const getFixtures = require('./server/fixtures')
const db = require('./server/db')

const loadFixtures = async (fixtures, db) => {
    await db.insert(fixtures);
};

(async () => {
    try {
        const fixtures = getFixtures();
        await Promise.all(loadFixtures(db.events, fixtures.events));
        console.log('Fixtures loaded!')
    } catch (error) {
        console.error('Fixutres load failure:', error);
    }
})();
