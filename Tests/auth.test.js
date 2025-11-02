
import { expect } from "chai";
import sinon from "sinon";
import { login, register, logout } from "../controllers/auth.controller.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/generatejwt.js";



describe("Auth Controller", () => {

  afterEach(() => sinon.restore());

  // ✅ TEST LOGIN

  it("should return 404 if email not found", async () => {
    const req = { body: { Email: "notfound@test.com", Password: "123456" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(User, "findOne").resolves(null);

    await login(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ msg: "email no encontrado" })).to.be.true;
  });

  it("should return 400 if password is invalid", async () => {
    const req = { body: { Email: "test@test.com", Password: "wrongpass" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(User, "findOne").resolves({ Password: "hashedpass" });
    sinon.stub(bcrypt, "compare").resolves(false);

    await login(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({ msg: " crendenciales invalidas" })).to.be.true;
  });

  it("should login successfully and return token", async () => {
    const req = { body: { Email: "test@test.com", Password: "123456" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(User, "findOne").resolves({ ID_User: 1, Password: "hash" });
    sinon.stub(bcrypt, "compare").resolves(true);
    sinon.stub(generateToken, "call").returns("mock-token");
    sinon.stub(generateToken, "apply").returns("mock-token");

    await login(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ msg: "inicio de session correcto", token: sinon.match.string })).to.be.true;
  });

  // ✅ TEST REGISTER

  it("should register a user successfully", async () => {
    const req = { body: { Name: "John", Email: "john@test.com", Password: "123456" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(bcrypt, "genSalt").resolves("salt");
    sinon.stub(bcrypt, "hash").resolves("hashedPass");
    sinon.stub(User, "create").resolves({ ID_User: 1 });

    await register(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWithMatch({ msg: "usuario creado correctamente" })).to.be.true;
  });

  // ✅ TEST LOGOUT

  it("should return 401 if token header missing", async () => {
    const req = { header: () => null };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await logout(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWithMatch({ msg: "no existe token para hacer logout" })).to.be.true;
  });

  it("should logout successfully when token exists", async () => {
    const req = { header: () => "validtoken" };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await logout(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ msg: "cerrando session" })).to.be.true;
  });

});
