import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Resume = sequelize.define('Resume', {
    data: {
        type : DataTypes.JSON,
        allowNull:false,
    },
    filePath:{
        type: DataTypes.STRING,
        allowNull:false,
    },
})

export default Resume;