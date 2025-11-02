import { expect } from "chai";
import sinon from "sinon";
import { createBooking,logUser_booking, bookingById }  from "../controllers/booking.controller.js";
import { Booking } from "../models/booking.js";
import { Space } from "../models/Spaces.js";
import * as timeHelper from "../helpers/calculate_hours.js";
import * as priceHelper from "../helpers/dinamic_Price.js";

describe("POST /booking - createBooking", () => {
  let req, res, spaceStub, bookingStub;

  beforeEach(() => {
    req = {
      body: {
        ID_Space: 1,
        Startat: "2025-11-05 10:00",
        EndAt: "2025-11-05 12:00"
      },
      User: { ID_User: 1, Membership: "Premium" }
    };

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

 
    spaceStub = sinon.stub(Space, "findByPk").resolves({
      Premiun: false,
      Price_per_hour: 100
    });

    // sinon.stub(timeHelper, "time_calculator").returns(2);
    // sinon.stub(priceHelper, "dynamic_price").returns(200);

    bookingStub = sinon.stub(Booking, "create").resolves({ id: 1 });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create booking successfully", async () => {
    await createBooking(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWithMatch({ msg: "espacio reservado" })).to.be.true;
  });
});
describe("GET /booking/user - logUser_booking", () => {
  let req, res, bookingStub;

  beforeEach(() => {
    req = { User: { ID_User: 1 } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    bookingStub = sinon.stub(Booking, "findAll").resolves([]);
  });

  afterEach(() => sinon.restore());

  it("should return user bookings", async () => {
    await logUser_booking(req, res);
    expect(res.status.calledWith(202)).to.be.true;
  });
});

describe("GET /booking/:id - bookingById", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: 1 } };
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(Booking, "findByPk").resolves({ ID_Booking: 1 });
  });

  afterEach(() => sinon.restore());

  it("should return booking by id", async () => {
    await bookingById(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });
});


