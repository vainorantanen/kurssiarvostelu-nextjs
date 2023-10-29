import prisma from "@/db";
import { createReview, getAllReviews } from "@/services/reviews";


import { Dispatch, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'reviews',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
    add(state, { payload }) {
      return state.concat(payload)
    },
  },
})

const { set, add } = slice.actions

export const initializeReviews = () => {
  return async (dispatch: Dispatch) => {
    const data = await getAllReviews()
    console.log(data)
    dispatch(set(data))
  }
}

export const addReview = (description: string) => {
  return async (dispatch: Dispatch) => {
    try {
    const res = await createReview(description)
    dispatch(add(res))
    } catch (error) {
        return { type: 'ADD_REVIEW_ERROR', payload: error }
    }
  }
}

export default slice.reducer

/*
export async function deleteReview(id: string) {
    "use server"
  
    try {
      await prisma.review.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }
  */