import { expect } from "chai";
import sinon from "sinon";

import { spaceFilter, spacesById, checkAvailability } from "../controllers/space.controller.js";
import { Space } from "../models/Spaces.js";
import { Booking } from "../models/booking.js";

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe("Spaces Controller", () => {
  afterEach(() => {
    sinon.restore();
  });

  // ------------------ spaceFilter ------------------
  describe("spaceFilter", () => {
    it("Debe retornar espacios filtrados correctamente", async () => {
      const req = {
        query: { location: 1, type: "Sala", capacity: 2 }
      };

      const spacesMock = [
        { ID_Space: 1, Spaces_Name: "Sala A" }
      ];

      sinon.stub(Space, "findAll").resolves(spacesMock);

      const res = mockResponse();
      await spaceFilter(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWithMatch({
        ok: true,
        total: 1,
        spaces: spacesMock
      })).to.be.true;
    });
  });

  // ------------------ spacesById ------------------
  describe("spacesById", () => {
    it("Debe devolver un espacio por ID", async () => {
      const req = { params: { id: 10 } };
      const spaceMock = { ID_Space: 10, name: "Cabina P2" };

      sinon.stub(Space, "findByPk").resolves(spaceMock);

      const res = mockResponse();
      await spacesById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWithMatch({
        msg: "space",
        space: spaceMock
      })).to.be.true;
    });

    it("Debe devolver 404 si no existe espacio", async () => {
      const req = { params: { id: 999 } };

      sinon.stub(Space, "findByPk").resolves(null);

      const res = mockResponse();
      await spacesById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({
        msg: "No existe espacio con este id"
      })).to.be.true;
    });
  });

  // ------------------ checkAvailability ------------------
  describe("checkAvailability", () => {
    it("Debe marcar espacio como NO disponible si existe reserva", async () => {
      const req = { query: { spaceId: 4, start: "2025-11-13T13:00:00", end: "2025-11-13T17:00:00" } };

      sinon.stub(Booking, "findOne").resolves({ Space: 4 });

      const res = mockResponse();
      await checkAvailability(req, res);

      expect(res.json.calledWithMatch({
        spaceId: 4,
        available: false
      })).to.be.true;
    });

    it("Debe marcar espacio como disponible si NO existe reserva", async () => {
      const req = { query: { spaceId: 4, start: "2025-11-13T13:00:00", end: "2025-11-13T17:00:00" } };

      sinon.stub(Booking, "findOne").resolves(null);

      const res = mockResponse();
      await checkAvailability(req, res);

      expect(res.json.calledWithMatch({
        spaceId: 4,
        available: true
      })).to.be.true;
    });

    it("Debe devolver 400 si faltan fechas", async () => {
      const req = { query: {} };

      const res = mockResponse();
      await checkAvailability(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWithMatch({
        msg: "Debes enviar start y end"
      })).to.be.true;
    });
  });
});
