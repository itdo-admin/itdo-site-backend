import { checkAuthUser } from '../out/model/auth.js'
import assert from "assert";

describe('Check auth user', function () {
    it('Должен вернутся true', async function() {
        assert.equal(Boolean((await checkAuthUser('test', 'test')).rows[0].result), true);
    });
});
