import { expect } from "chai";
import sinon from "sinon";
import { gellAllbooks, UdpteSpace } from "../controllers/admin.controller.js"; 
import { Booking } from "../models/booking.js";
import { Space } from "../models/Spaces.js";

describe("GET /admin/bookings - gellAllbooks", () => {
  let req, res;

  beforeEach(() => {
    req = { query: { page: 1, limit: 10 } };

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    sinon.stub(Booking, "findAndCountAll").resolves({
      count: 2,
      rows: [{ id: 1 }, { id: 2 }]
    });
  });

  afterEach(() => sinon.restore());

  it("should return paginated bookings", async () => {
    await gellAllbooks(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({
      total: 2,
      currentPage: 1,
      totalPages: 1
    })).to.be.true;
  });
});


describe("PUT /admin/spaces/:id - UdpteSpace", () => {
  let req, res, spaceMock;

  beforeEach(() => {
    req = {
      params: { id: 1 },
      body: {
        Spaces_Name: "Sala A",
        Spaces_Types: "Meeting",
        Capacity: 5,
        Price_per_hour: 100,
        Location: 1,
        Premiun: false
      }
    };

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    spaceMock = {
      update: sinon.stub().resolves(),
    };

    sinon.stub(Space, "findByPk").resolves(spaceMock);
  });

  afterEach(() => sinon.restore());

  it("should update space successfully", async () => {
    await UdpteSpace(req, res);
    
    expect(res.status.calledWith(200)).to.be.true;
    expect(spaceMock.update.calledOnce).to.be.true;
    expect(res.json.calledWithMatch({ msg: "espacio actualizado" })).to.be.true;
  });

  it("should return 500 on error", async () => {
    sinon.restore();
    sinon.stub(Space, "findByPk").throws(new Error());

    await UdpteSpace(req, res);

    expect(res.status.calledWith(500)).to.be.true;
  });
});
