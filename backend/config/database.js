import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URL,{
    dialect: 'postgres',
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false,
        },
    },
})

try{
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch(error){
    console.error('Unable to connect to the database:', error);
}

export default sequelize;