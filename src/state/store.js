/** import the store from **/
import {Store} from "react-persistent-store-manager"

//Schema
export const Stores = {
  loggedUser:{
    token: null, 
    email: null,
    _id: null,
    ruolo: null
  }
};

//Reading the schema
export const AppStore = Store(Stores);