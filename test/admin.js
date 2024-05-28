import { authUser } from "../out/controller/controller.auth.js";
import { expect } from 'chai';
import sinon from 'sinon';

describe('Check auth user', function () {
    it('Check validation data', async function () {
        const req = {
            body: {
                login: 'Dinara',
                password: 'datada'
            }
        };

        const reply = {
            setCookie: sinon.stub().returnsThis(),
            redirect: sinon.stub().returnsThis()
        };

        const result = await authUser(req, reply);

        expect(reply.setCookie.calledOnce).to.be.true;
        expect(reply.redirect.calledOnce).to.be.true;
    });

    it('Check not validation data', async function () {
        const req = {
            body: {
                login: 'Dinara',
                password: 'datwqada'
            }
        };

        const reply = {
            status: sinon.stub().returnsThis()
        };

        const result = await authUser(req, reply);

        expect(reply.status.calledOnceWith(400)).to.be.true;
        expect(result).to.have.property('error');
    });
});
