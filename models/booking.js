import { DataTypes } from 'sequelize';
import { DB } from '../config/DB.js'; 

export const Booking = DB.define('Booking', {
    ID_Bokking: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    User: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
    },
    Space: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    Startat: {
        type: DataTypes.DATE,
        allowNull: false
    },
    EndAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Booking_Status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Confirm', 'cancelled'),
        defaultValue: 'Pending'
    },
    Total: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    Created_At: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Booking',
    timestamps: false 
});