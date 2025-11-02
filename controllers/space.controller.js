import { request,response } from "express";
import { Space } from "../models/Spaces.js";
import {Locations }from '../models/locations.js'
import { Op } from "sequelize";
import { Booking } from "../models/booking.js";

export const spaceFilter = async (req= request , res = response) => {
    try {
    const { location, type, capacity, Spaces_Name} = req.query;

    let filters = {};

    if (location) filters.Location = location;
    if (type) filters.Spaces_Types = type;
    if (capacity) filters.Capacity = { [Op.gte]: capacity };
    if (Spaces_Name) filters.Spaces_Name = { [Op.like]: `%${Spaces_Name}%` };

    const spaces = await Space.findAll({
      where: filters,
      include: [
        {
          model: Locations,
          as: "location",
          attributes: ["Location_Name", "Location_City"]
        }
      ],
      order: [["ID_Space", "ASC"]]
    });
    res.status(200).json({
      ok: true,
      total: spaces.length,
      spaces
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servirdor" });
  }
}


export const spacesById= async (req= request , res = response) => {
    const {id} = req.params
    try { 
        const space = await Space.findByPk(id)

          if(!space){
            return  res.status(404).json({ msg: "No existe espacio con este id" });
          }

        res.status(200).json({
            msg:'space',
            space
        })
    } catch (error) {
        console.log(error);
    res.status(500).json({ msg: "Error del servirdor" });
  }
    }

export const checkAvailability = async (req= request, res =response) => {
   try {
    const { spaceId, start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        msg: "Debes enviar start y end"
      });
    }

    
    if (spaceId) {
      const existingBookings = await Booking.findOne({
        where: {
          Space: spaceId,
          Booking_Status: { [Op.ne]: 'cancelled' },
          Startat: { [Op.lt]: end },
          EndAt: { [Op.gt]: start }
        }
      });

      return res.json({
        spaceId,
        available: !existingBookings
      });
    }

    const bookedSpaces = await Booking.findAll({
      where: {
        Booking_Status: { [Op.ne]: "Cancelled" },
        [Op.and]: [
          { Startat: { [Op.lt]: end } },
          { EndAt: { [Op.gt]: start } }
        ]
      },
      attributes: ["Space"]
    });

    const bookedIds = bookedSpaces.map(b => b.Space);

    const spaces = await Space.findAll({
      where: {
        ID_Space: { [Op.notIn]: bookedIds }
      }
    });

    return res.json({
      availableSpaces: spaces
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error en el servidor",
      err
    });
  }
};
