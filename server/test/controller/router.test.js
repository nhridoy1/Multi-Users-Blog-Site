const productRouter = require("../../../src/controllers/product-controller");
const roleRouter = require("../../../src/controllers/role-controller");

describe("Routes", () => {
  // product routes setup ok
  it("product routes setup ok", () => {
    const routes = productRouter.stack
      .filter((layer) => layer.route)
      .map((layer) => layer.route.path);
    expect(routes.includes("/search")).toBe(true);
  });

  // role routes setup ok
  it("role routes setup ok", () => {
    const routes = roleRouter.stack
      .filter((layer) => layer.route)
      .map((layer) => layer.route.path);
    expect(routes.includes("/search")).toBe(true);
  });
});

const jest = require("jest");
const { healthHandler } = require("../../../src/controllers/health-controller");

it("Health monitor controller", () => {
  const res = { json: jest.fn(), sendStatus: jest.fn() };
  healthHandler({}, res);
  expect(res.json.mock.calls[0][0]).toEqual({ message: "OK" });
});


const dbHandler = require("../db-handler");
const productService = require("../../../src/services/product-service");

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

/**
 * Product test suite.
 */
describe("Product", () => {
  /**
   * Complete product example.
   */
  const productComplete = {
    productName: "iPhone 11",
    sku: "iphone-11",
    cost: 500,
    price: 699,
    createdAt: "2020-01-01",
    updatedAt: "2020-04-01",
  };

  // create and search product test
  it("can be created and searched successfully", async () => {
    const productId = await productService.save(productComplete);
    expect(productId).toBeDefined();

    const products = await productService.search({ searchText: "iphone" });
    expect(products.length).toBe(1);
    expect(products[0].productName).toBe("iPhone 11");
  });

  // update product test
  it("can be updated successfully", async () => {
    const productId = await productService.save(productComplete);
    expect(productId).toBeDefined();

    const product = await productService.getById(productId);
    expect(product.productName).toBe("iPhone 11");

    product.productName = "iPhone X";
    await productService.update(product);

    const updatedProduct = await productService.getById(productId);
    expect(updatedProduct.productName).toBe("iPhone X");
  });
});

const app = require("../../src/app");

it("App Environment", () => {
  expect(app.settings.env).toEqual("test");
});

it("App Base Path", () => {
  expect(app.mountpath).toEqual("/");
});