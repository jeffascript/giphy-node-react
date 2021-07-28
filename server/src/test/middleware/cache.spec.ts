// import { NextFunction } from 'express';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import Redis from 'redis';
// // import request from 'supertest';
// // import faker from 'faker';
// // import axios, { AxiosRequestConfig } from 'axios';
// // import randomWords from 'random-words';
// // import { APIFetchResponse, GifResponse } from '../../model';
// // import SearchController from '../../controllers';
// // import AxioFetch from '../../utils/axios';
// // import jsonResult from '../../model/sampleResponse.json';
// import { middleware } from '../../middleware/cache';

// describe('connection', function () {
//     it('should emit "connect" when connected', function (done) {
//         // Create stub on connect.
//         const stubRedisConnect = sinon.stub(Redis, 'createClient');
//         stubRedisConnect.callsFake(async function () {
//             // This will trigger connect event.
//             this.setStatus('connect');
//         });
//         const redis = Redis.createClient();
//         redis.on('connect', function () {
//             // Do not forget to restore the stub.
//             stubRedisConnect.restore();
//             done();
//         });
//     });
// });
