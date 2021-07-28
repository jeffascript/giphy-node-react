// import request from 'supertest';

// describe('gif router check', () => {
//     it('server instantiated without error', (done) => {
//         request(app).get('/_status').expect(200, done);
//     });
// });

import { expect } from 'chai';
import randomWords from 'random-words';
import request from 'supertest';
import { GifResponse } from '../../model/index';
import app from '../../app';

// function getRandomIntInclusive(min: number, max: number) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }
// function generateStringsWithNum(num: number) {
//     // eslint-disable-next-line no-bitwise
//     // return [...Array(num)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
//     const chars = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
//     // eslint-disable-next-line no-bitwise
//     return [...Array(num)].map(() => chars[(Math.random() * chars.length) | 0]).join;
// }

// const threeToThreeHun = getRandomIntInclusive(3, 10);
// const inputPositive = generateStringsWithNum(threeToThreeHun);
// console.log(inputPositive);

// const numLessThanThree = Math.floor(Math.random() * 3);

function letterLessThanThree() {
    const numLessThanThree: number = Math.floor(Math.random() * 3);
    const threeToThreeHun = randomWords({ min: 0, max: 2 });
    const oneWord: string = threeToThreeHun[Math.floor(Math.random() * threeToThreeHun.length)];
    const lessThanThreewords = oneWord.slice(numLessThanThree, 3);
    return lessThanThreewords;
}

function numGreaterThanThree() {
    const minThreeNum = randomWords({ min: 3, max: 10 });
    const data = minThreeNum[Math.floor(Math.random() * minThreeNum.length)];
    console.log(data);
    return data;
}

describe('POST /gifs/search', () => {
    it('Response fails if the searchString is less than 3 characters ', async () => {
        const input = letterLessThanThree();

        const response = await request(app).post('/gifs/search').send({
            searchString: input,
        });
        expect(response.status).to.eql(400);
        expect(response.body.message[0].msg).to.eql('The search string must be a minimum of 3 characters');
        // expect(response.body.message.map((e: any) => e.msg)[0]).to.eql(
        //     'The search string must be a minimum of 3 characters',
        // );
        // expect(response.body.message).to.be.an('array').that.contains.any.keys('msg');
        // expect(response.body)
        //     .to.have.property('message')
        //     .to.includes.keys('msg', 'The search string must be a minimum of 3 characters');
    });

    it('with search string between 3 and 300 returns a valid response collection with  url,id,width and height ', async () => {
        const input = numGreaterThanThree();

        const response = await request(app).post('/gifs/search').send({
            searchString: input,
        });

        expect(response.status).to.eql(200);
        expect(response.body).to.be.an('array');
        expect(response.body.map((d: GifResponse) => d)[0]).to.have.have.property('url');
        expect(Object.keys(response.body.map((d: GifResponse) => d)[0])).to.eql([
            'id',
            'height',
            'width',
            'size',
            'url',
        ]);
    });
});
