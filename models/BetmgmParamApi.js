const { DataTypes } = require('sequelize');
const sequelize = require("../configs/database");


const BetmgmParamApi = sequelize.define(
    "BetmgmParamApi",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tournamentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tournamentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        widgetId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sportId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        regionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "mgm_params_api",
        timestamps: false,
    },
);



module.exports = BetmgmParamApi;
