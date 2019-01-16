var Request = require("request");

describe("Server", () => {
  path = 'http://localhost:8080';
  var server;
  beforeAll(() => {
    server = require('../server');
  });
  afterAll(() => {
    server.close();
  });

  describe('GET /orders generateOrders', () => {
    var data = {};
    var options = {
      method: 'GET',
      url: path + '/orders?genOrders=true'
    };
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
      expect(data.body.data.length).toBeLessThanOrEqual(10);
    });
  });

  describe('GET /orders pages', () => {
    var data = {};
    var options = {
      method: 'GET',
      url: path + '/orders?page=0'
    };
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
      expect(data.body.data.length).toBeLessThanOrEqual(10);
    });
  });

  describe('PATCH /orders tips', () => {
    var data = {};
    var options = {
      method: 'PATCH',
      url: path + '/orders',
      form: { id: 0, tip: 100 }
    };

    beforeAll((done) => {
      Request({
        method: 'GET',
        url: path + '/orders?genOrders=true',
      },(error, response, body)=> {
        Request(options, (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
      });

    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body tip", () => {
      expect(data.body.Tip).toBeGreaterThanOrEqual(0);
    });
    it("Body total", () => {
      expect(data.body.Total)
      .toBe(parseFloat((data.body.Subtotal + data.body.Taxes + data.body.Tip).toFixed(2)));
    });
  });
});
