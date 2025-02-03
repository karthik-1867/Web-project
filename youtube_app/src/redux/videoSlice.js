import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    videoUser : null,
    loading : false,
    error:false,
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers:{
      fetchStart : (state) => {
         state.loading = true;
      },
      fetchSuccess : (state,action) => {
         state.loading =false;
         state.videoUser = action.payload;
         state.error = false;
      },
      fetchFailure : (state) => {
        state.loading =false;
        state.error = true;
      },
      likes: (state,action) => {
        if(!state.videoUser.likes.includes(action.payload)){
            state.videoUser.likes.push(action.payload);
            state. videoUser.dislikes.splice(
                // return the like id 
                state.videoUser.dislikes.findIndex((id)=>id===action.payload),1
                // the above statement return id
            )
        }
      },
      dislikes: (state,action) => {
        if(!state.videoUser.dislikes.includes(action.payload)){
            state.videoUser.dislikes.push(action.payload);
            state. videoUser.likes.splice(
                // return the like id 
                state.videoUser.likes.findIndex((id)=>id===action.payload),1
                // the above statement return id
            )
        }
      }
    },
    
})

export const {fetchStart,fetchSuccess,fetchFailure,likes,dislikes} = videoSlice.actions

export default videoSlice.reducer;