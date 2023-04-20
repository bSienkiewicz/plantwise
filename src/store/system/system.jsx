import { createSlice } from '@reduxjs/toolkit'

export const status = createSlice({
  name: 'status',
  initialState: {
    mqtt_connected: false,
    database_connected: false,
    mqtt_error: false,
    database_error: false,
  },
  reducers: {
    setMqttConnected: (state, action) => {
        state.mqtt_connected = action.payload
        },
    setDatabaseConnected: (state, action) => {
        state.database_connected = action.payload
        },
    setMqttError: (state, action) => {
        state.mqtt_error = action.payload
        },
    setDatabaseError: (state, action) => {
        state.database_error = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setDatabaseConnected, setDatabaseError,setMqttConnected,setMqttError } = status.actions

export default status.reducer