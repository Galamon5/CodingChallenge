var Request = require("request");

describe("Server", () => {
  var server;
  beforeAll(() => {
    server = require('../server');
  });
  afterAll(() => {
    server.close();
  });

  describe('GET /orders generateOrders', () => {
    var data = {};
    var options = { method: 'GET',
    url: 'http://localhost:8080/orders',
    form: { genOrders: 'true' } };
    beforeAll((done) => {
      Request(options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.body.data.length).toBeGreaterThan(0);
    });
    it("Body", () => {
      expect(data.body.data.length).toBeLessThanOrEqual(5);
    });
  });

  describe('GET /orders pages', () => {
    var data = {};
    var options = { method: 'GET',
    url: 'http://localhost:8080/orders?page=0'};
    beforeAll((done) => {
      Request(options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.body.data.length).toBeGreaterThanOrEqual(0);
    });
    it("Body", () => {
      expect(data.body.data.length).toBeLessThanOrEqual(5);
    });
  });

  describe('PATCH /orders tips', () => {
    var data = {};
    var options = { method: 'PATCH',
    url: 'http://localhost:8080/orders',
    form: { id: 0, tip: 100 } };
    beforeAll((done) => {
      Request.get({ method: 'GET',
        url: 'http://localhost:8080/orders',
        form: { genOrders: 'true' } },
        (error, response, body)=> response);
      Request(options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body tip", () => {
      expect(data.body.Tip).toBeGreaterThanOrEqual(0);
    });
    it("Body total", () => {
      expect(data.body.Total).toBe(data.body.Subtotal + data.body.Taxes + data.body.Tip);
    });
  });
});
