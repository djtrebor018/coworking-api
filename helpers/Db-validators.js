import { Booking } from "../models/booking.js";
import { Op } from "sequelize";
import { Space } from "../models/Spaces.js";
import { User } from "../models/user.js";
import { Locations } from "../models/locations.js";



export const validateEmail = async (Email = '') => {
    const UserEmail = await User.findOne({where:{Email:Email}})

    if (UserEmail) {
        throw new Error('este email ya esta registrado')
    }
}

export const existeSpace =async(ID_Space)=>{
   const space = await Space.findByPk(ID_Space)
   if (!space) {
    throw new Error(`no existe espacio con el id: ${space}`);   
   }
}
 export const existLocation =async(ID_Location)=>{
   const location = await Locations.findByPk(ID_Location)
   if (!location) {
    throw new Error(`no existe espacio con el id: ${location}`);   
   }
}

export const validateDate =(value,{req})=>{

  const start = new Date(req.body.Startat);
  const end = new Date(value);
  if (end <= start) {
    throw new Error('La fecha de fin debe ser mayor que la de inicio');
  }
  return true;
}



export const validateNoOverlap = async (req, res, next) => {
  try {
    const userAuth = req.User; 
    const { Startat, EndAt } = req.body;

    const userConflict = await Booking.findOne({
      where: {
        User: userAuth.ID_User,
        Startat: { [Op.lt]: EndAt },
        EndAt: { [Op.gt]: Startat },
        Booking_Status: { [Op.ne]: 'cancelled' }
      }
    });

    if (userConflict) {
      return res.status(400).json({
        msg: 'Ya tienes una reserva en ese horario'
      });
    }

    next(); 

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno al validar reservas"
    });
  }
};


export const validateBooking = async (req, res, next) => {
     const { ID_Space, Startat, EndAt } = req.body;
    try {
        const conflict = await Booking.findOne({
      where: {
        Space: ID_Space,
        Startat: { [Op.lt]:EndAt },
        EndAt: { [Op.gt]: Startat },
        Booking_Status: { [Op.ne]: 'cancelled' } 
      }
    }); 
    if (conflict) {
        return res.status(400).json({
            msg:'El espacio seleccionado no está disponible en ese horario'
        })
    }
        next()
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      msg: "Error interno al validar reservas"
    });
    }
}


export const bookingCount =async (req,res,next) => {
    const { ID_Space, Startat, EndAt } = req.body;

    try {
       const space = await Space.findByPk(ID_Space) 
       if (!space) {
      return res.status(404).json({ msg: "El espacio no existe" });
    }

    const currentBookings = await Booking.count({
  where: {
    Space: ID_Space,
    Startat: { [Op.lt]: EndAt }, 
    EndAt: { [Op.gt]: Startat },
    Booking_Status: { [Op.ne]: 'cancelled' } 
  }
});

if (currentBookings >= space.Capacity) {
  return res.status(400).json({
    msg: `El espacio ha alcanzado su capacidad máxima (${space.Capacity}) para ese horario`
  });
}
next();
    } catch (error) {
          console.log(error);
    return res.status(500).json({
      msg: "Error interno al validar reservas"
    });
    }
}