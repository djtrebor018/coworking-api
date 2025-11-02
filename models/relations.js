import { Space } from "./Spaces.js";
import { Locations } from "./locations.js";
import {User} from'../models/user.js'
import { Booking } from '../models/booking.js';

Space.belongsTo(Locations, {foreignKey:'Location',   as: 'location', })
Locations.hasMany(Space, { foreignKey:'Location',    as: 'spaces' })

Booking.belongsTo(User, { 
    foreignKey: 'User', 
    as: 'user' 
});


User.hasMany(Booking, { 
    foreignKey: 'User', 
    as: 'bookings' 
});


Booking.belongsTo(Space, { 
    foreignKey: 'Space', 
    as: 'space' 
});


Space.hasMany(Booking, { 
    foreignKey: 'Space', 
    as: 'bookings' 
});

