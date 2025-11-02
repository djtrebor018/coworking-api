import { request, response } from "express";
import { Booking } from "../models/booking.js";
import { time_calculator } from "../helpers/calculate_hours.js";
import { dynamic_price } from "../helpers/dinamic_Price.js";
import { Space } from "../models/Spaces.js";
import { User } from "../models/user.js";
import {Locations} from '../models/locations.js'

export const createBooking = async (req=request,res=response) => {
    const {ID_Space,Startat,EndAt} = req.body;
    const useAuht = req.User;
    try {
        const space = await Space.findByPk(ID_Space)
    
    if (useAuht.Membership=='Basic' && space.Premiun ) {
         res.status(400).json({
            msg:'no puede reservar un sitio premiun con una membresia basica'
         })
     }  

    const hour = time_calculator(Startat,EndAt)
    if(hour<1){
        return res.status(400).json({
            msg:'el espacio deber ser reservado minimo por una hora'
        })
    }
   
    const total = dynamic_price(Startat,EndAt,space.Price_per_hour,useAuht.Membership)

       const newBooking = await Booking.create({
        User: useAuht.ID_User,
        Space: ID_Space,
        Startat,
        EndAt,
        Total:total
       })
       res.status(201).json({ msg: 'espacio reservado', newBooking });

    } catch (error) {
        console.log(error);
    res.status(500).json({ msg: 'error del servidor' });
  }
    }

    export const logUser_booking = async (req=request,res=response) => {
        const userAuth = req.User;
        try {
            const booking =  await Booking.findAll(
                {
                where:{
                    User:userAuth.ID_User
                },
                attributes:['ID_Bokking','Startat','EndAt','Booking_Status'],
                include:[
                    {
                        model:User, as:'user', attributes:['Name']
                    },
                    {
                        model:Space, as:'space', attributes:['Spaces_Name','Spaces_Types','Capacity'],
                        include:[
                           {
                            model:Locations, as: 'location', attributes:['Location_Name']
                           }
                        ]
                    }
                ],
                 order: [['Startat', 'DESC']]
            })
            if(!booking){
              res.status(404).json({
                msg:'este usuario no tiene ninguna reserva'
              })
            }
             res.status(202).json({ msg: 'espacios reservados', booking })

        } catch (error) {
              console.log(error);
         res.status(500).json({ msg: 'error del servidor' });
        }
    }


    export const bookingById = async (req = request, res=response) => {
        const {id} = req.params
        try {
            const book = await Booking.findByPk(id,{
                attributes:['ID_Bokking','Startat','EndAt','Booking_Status'],
                include:[
                    {
                        model:User, as:'user', attributes:['Name']
                    },
                    {
                        model:Space, as:'space', attributes:['ID_Space','Spaces_Name','Spaces_Types','Capacity'],
                        include:[
                           {
                            model:Locations, as: 'location', attributes:['Location_Name']
                           }
                        ]
                    }
                ],
                 order: [['Startat', 'DESC']]
        })
        
        res.status(200).json({
            book
        })
        } catch (error) {
            console.log(error);
         res.status(500).json({ msg: 'error del servidor' });
        }
    }
    export const cancelBooking = async (req= request , res= response) => {
        const {id} =req.params
        const status = 'cancelled'
        try {
            const book = await Booking.findByPk(id)
             if (!book) {
             return res.status(404).json({
               msg: 'No existe una reserva con ese ID'
             });
             }
             if (book.Booking_Status =='completed') {
                 return res.status(404).json({
               msg: 'No puede cancelar una reserva que ya fue completada'
               });
             }
             if (book.Booking_Status =='Confirm') {
                 return res.status(404).json({
               msg: 'No puede cancelar una reserva que ya fue completada'
               });
             }
                   
                if (book.Booking_Status ==status) {
                 return res.status(404).json({
               msg: 'No puede cancelar una reserva que ya esta cancelada'
               });
             }

            const now = new Date();
            const start = new Date(book.Startat);
    
            const diffHours = time_calculator(start,now) 

            let refund = 0;

            if (diffHours > 24) {
            refund = book.Total;
          } else if (diffHours >= 12 && diffHours <= 24) {
           refund = book.Total * 0.5;
          } else {
           refund = 0;
           }

            book.Booking_Status = status
            await book.save()
            res.status(200).json({
                msg:`reserva cancelada de manera existosa total a reembolsar: ${refund}`
            })
        } catch (error) {
            console.log(error);
         res.status(500).json({ msg: 'error del servidor' });
        }
    }
