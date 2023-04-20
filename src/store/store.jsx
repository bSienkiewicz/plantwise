import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counter'
import devicesReducer from './devices/devices'
import plantsReducer from './plants/plants'
import systemReducer from './system/system'

export default configureStore({
  reducer: {
    counter: counterReducer,
    devices: devicesReducer,
    plants: plantsReducer,
    system: systemReducer,
  }
})