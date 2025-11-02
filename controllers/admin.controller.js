import { request, response } from "express";
import { User } from "../models/user.js";
import { Space } from "../models/Spaces.js";
import { Locations } from "../models/locations.js";
import { Booking } from "../models/booking.js";

export const gellAllbooks = async (req = request , res = response) => {
    try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Booking.findAndCountAll({
      limit,
      offset,
      order: [["Created_At", "DESC"]],
      include: [
        { model: User, as:'user', attributes: ["ID_User", "Name", "Email"] },
        { model: Space, as:'space', attributes: ["ID_Space", "Spaces_Name", "Capacity"],
        include: [ {model: Locations, as:'location',attributes:['Location_Name']}]
         }
      ]
    });
    res.status(200).json({
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      pageSize: limit,
      bookings: rows
    });

    } catch (error) {
         console.log(error);
        res.status(500).json({ msg: 'error del servidor' });
    }
}

export const UdpteSpace = async (req = request, res = response) => {
 const{id}= req.params;
 const { Spaces_Name,Spaces_Types,Capacity, Price_per_hour, Location,Premiun}= req.body;
 try {
  const space = await Space.findByPk(id)

  await space.update({Spaces_Name,Spaces_Types,Capacity, Price_per_hour, Location,Premiun})
  
  res.status(200).json({
    msg:'espacio actualizado',
    space
  })

 } catch (error) {
   console.log(error);
        res.status(500).json({ msg: 'error del servidor' })
 }
}