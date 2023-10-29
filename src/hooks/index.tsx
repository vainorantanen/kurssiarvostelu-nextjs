import { initializeReviews } from '@/reducers/reviews'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


export const useInitialization = () => {
  const dispatch = useDispatch()

  return ()  => {
    dispatch(initializeReviews())
  }
}