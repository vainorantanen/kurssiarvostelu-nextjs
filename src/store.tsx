import { configureStore } from '@reduxjs/toolkit'
import reviewsReducer from './reducers/reviews'


const store = configureStore({
  reducer: {
    reviews: reviewsReducer
  }
})

export default store