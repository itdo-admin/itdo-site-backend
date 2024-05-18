import assert from "assert";
import { authUser } from "../out/controller/controller.auth.js";

describe('Check auth user', function () {
    it('Check validation data', async function() {
        assert.ok(await authUser('Dinara', 'datada'), '');
    });

    it('Check not validation data', async function() {
        assert.equal(await authUser('Dinara', 'datwqada'), false)
    })
});
