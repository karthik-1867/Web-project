import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user : null,
    loading : false,
    error:false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
      loginStart : (state) => {
         state.loading = true;
      },
      loginSuccess : (state,action) => {
         state.loading =false;
         state.user = action.payload;
         state.error = false;
      },
      loginFailure : (state) => {
        state.loading =false;
        state.error = true;
      },
      logout : (state)=>{
        state.user = null;
        state.loading = false;
        state.error = false;
      },
      subscriptions : (state,action) => {
        if(state.user.subscribedUsers.includes(action.payload)){
            state.user.subscribedUsers.splice(
                state.user.subscribedUsers.findIndex((id)=>id===action.payload),1
            )
        }else{
            state.user.subscribedUsers.push(action.payload)
        }
      }
    }
})

export const {loginStart,loginSuccess,loginFailure,logout,subscriptions} = userSlice.actions

export default userSlice.reducer;