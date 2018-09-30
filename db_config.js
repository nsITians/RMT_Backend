/**
 * Created by tech4GT on 9/30/18.
 */
const db_url_dev = `postgres://rmt:rmtPass@localhost:5432/rmtdb`;

module.exports = {
    DATABASE_URL: process.env.DTABASE_URL || db_url_dev
};