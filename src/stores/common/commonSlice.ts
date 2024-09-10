import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CommonState {
   isLoadingFullScreen: boolean
}

const initialState: CommonState = {
   isLoadingFullScreen: false
}

const commonSlice = createSlice({
   name: 'common',
   initialState,
   reducers: {
      setLoadingFullScreen: (state, action: PayloadAction<boolean>) => {
         return { ...state, isLoadingFullScreen: action.payload }
      }
   }
})

export const { setLoadingFullScreen } = commonSlice.actions
export { commonSlice }
