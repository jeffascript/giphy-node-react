import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import faker from 'faker';
import axios, { AxiosRequestConfig } from 'axios';
import randomWords from 'random-words';
import { APIFetchResponse, GifResponse } from '../../model';
import SearchController from '../../controllers';
import AxioFetch from '../../utils/axios';
import jsonResult from '../../model/sampleResponse.json';

function letterGreaterThanThree() {
    const minThreeNum = randomWords({ min: 3, max: 10 });
    const data = minThreeNum[Math.floor(Math.random() * minThreeNum.length)];
    console.log(data);
    return data;
}

// describe('sendAPIRequest', function () {
//     afterEach(() => {
//         sinon.restore();
//     });

//     it('should make api', async (t) => {
//         const instance = new A()
//         const stubbedHttpInit = sinon.stub(httpClient, 'init')
//         sinon.stub(fetch).returns(Promise.resolve({payload: 'data'})) //this doesn't work

//         const searchString = letterGreaterThanThree();
//         const key = faker.datatype.uuid();
//         console.log(key, searchString);
//         // const message = await SearchController.fetchGifs({ searchString, apiKey: key });
//         await AxioFetch.searchWithParams({ searchString, apiKey: key })
//         t.true(stubbedHttpInit.init.calledWith('data'))
//     });
// });

describe('Get result with mocked API method', () => {
    let fetchApiCallStub: sinon.SinonSpy<any, any>;
    beforeEach(() => {
        // const resp = {
        //     id: faker.datatype.uuid(),
        //     height: faker.datatype.string(),
        //     width: faker.datatype.string(),
        //     size: faker.datatype.string(),
        //     url: faker.internet.url(),
        // };
        fetchApiCallStub = sinon.stub(AxioFetch, 'searchWithParams').callsFake(() => {
            return Promise.resolve(jsonResult);
        });
    });

    afterEach(() => {
        fetchApiCallStub.restore();
    });

    it('Return formatted result from API fetch', async () => {
        const searchString = letterGreaterThanThree();
        const key = faker.datatype.uuid();
        console.log(key, searchString);
        const message = await SearchController.fetchGifs({ searchString, apiKey: key });
        // const stubValue = {
        //     id: faker.datatype.uuid(),
        //     height: faker.datatype.string(),
        //     width: faker.datatype.string(),
        //     size: faker.datatype.string(),
        //     url: faker.internet.url(),
        // };

        const stubValue = ['id', 'height', 'width', 'size', 'url'];
        sinon.assert.called(fetchApiCallStub);
        console.log(message);
        expect(Object.keys(message.map((d: GifResponse) => d)[0])).to.eql(stubValue);
        // expect(message[0]).to.equal(stubValue);
    });
});

// describe('Axios Fetch', () => {
//     describe('#fetch', () => {
//         let stub: sinon.SinonStub<[url: string, config?: AxiosRequestConfig | undefined], Promise<unknown>>;
//         beforeEach(() => {
//             stub = sinon.stub(axios, 'get');
//         });
//         afterEach(() => {
//             stub.restore();
//         });
//         it('should send request with correct parameters', async () => {
//             const searchString = letterGreaterThanThree();
//             const key = faker.datatype.uuid();
//             console.log(key, searchString);

//             const message = await AxioFetch.searchWithParams({ searchString, apiKey: key });
//             sinon.assert.called(stub);
//             expect(message).to.equal(jsonResult);
//             // expect(stub.calledWith(faker.internet.url())).to.be.true;
//         });
//     });
// });

// describe('MyService save', () => {
//     it('should return info', () => {
//         const expectedResponse = 'hello!';
//         const res = sinon.spy();
//         const searchString = letterGreaterThanThree();
//         const key = faker.datatype.uuid();
//         const url = `https://example.com?${searchString}&api_key=${apiKey}`;
//         const aStub = sinon.stub(axios, 'get').resolves(expectedResponse);

//         const req = request({ method: 'get', url });
//        await AxioFetch.searchWithParams({ searchString, apiKey: key });

//         // At this point, I need to evaluate the response received (which should be expectedResponse)
//         chai.assert(res.data, expectedResponse); // data is undefined, res.status is also undefined

//         // How do I read the response received?
//     });
// });
