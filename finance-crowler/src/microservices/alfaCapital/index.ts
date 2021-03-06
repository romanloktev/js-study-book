import {createConnection} from "typeorm";
import getPifGraph from './actions/getPifGraph';
import getProductsList from './actions/getProductsList';
import PifGraphPointEntity from './entity/PifGraphPointEntity';
import ProductsEntity from './entity/ProductsEntity';

let connection;

function setConnection(connec) {
  connection = connec;
}

function getConnection() {
  return connection
}

function alfaCapital() {
  try {
    this.add({ init: 'alfaCapital' }, async (msg, done) => {
      const connection = await createConnection({
        type: "sqlite",
        database:  `${process.env.HOME}/data/AlfaCapital.db`,
        entities: [
          PifGraphPointEntity,
          ProductsEntity,
        ],
        synchronize: true,
        logging: false
      })
      setConnection(connection)
      done();
    })
  
    this.add({role: 'alfaCapital', cmd: 'getPifGraph'}, getPifGraph)
    this.add({role: 'alfaCapital', cmd: 'getProductsInfo'}, getProductsList)
    
  } catch (error) {
    console.log(error)
  }
}

export default alfaCapital
