const app = require('../src/index');
const exampleData = require('./users.json');

const http = require("http");
const request = require("request-promise-native");

describe('Fantastec API Test', () => {
    let server;
    let link;

    beforeAll(async () => {
        server = await http.createServer(app);
        await server.listen(0);

        let port = await server.address().port;
        link = `http://localhost:${port}`;
    });

    afterAll(async () => {
        await server.close();
    });

    it('should fail and not continue', async () => {
        let res = await request({
            method: "GET",
            uri: `${link}/test`,
            resolveWithFullResponse: true
        }).catch(e => {
            return e;
        });

        expect(res.statusCode).toBe(404);
    });

    it('should return invalid body.', async () => {
        let res = await request({
            method: "GET",
            uri: `${link}/features`,
            form: {
                test: "test"
            },
            resolveWithFullResponse: true
        }).catch(e => {
            return e;
        });

        expect(res).toHaveProperty("error");
        expect(res.error).toContain("Invalid");
        expect(res.statusCode).toBe(500);
    });

    test('if correct format is used.', async () => {
        let res = await request({
            method: "GET",
            uri: `${link}/features`,
            form: {
                email: "test",
                location: "test"
            },
            resolveWithFullResponse: true
        }).catch(e => {
            return e;
        });

        expect(res.statusCode).toBe(200);
    });

    test('hardcoded example data.', async () => {
        let res = await request({
            method: "GET",
            uri: `${link}/features`,
            form: {
                email: "big@test.com",
                location: "CA"
            },
            resolveWithFullResponse: true
        }).catch(e => {
            return e;
        });

        expect(res.body).toMatch(/^EnhancedDashboardFeature|[]|$/);
        expect(res.statusCode).toBe(200);
    });

    test.each(exampleData)("Example Data.", async(data) => {
        let res = await request({
            method: "GET",
            uri: `${link}/features`,
            form: {
                email: data.email,
                location: data.location
            },
            resolveWithFullResponse: true
        }).catch(e => {
            return e;
        });

        expect(res.statusCode).toBe(200);
    });
});
