import React , { useState , useEffect} from 'react'
import { View, Text } from 'react-native'
import { SignedInStack, SignedOutStack } from './navigation'
import {firebase , db} from "./firebase"
import { selectUid, setUid } from './slices/userSlice'
import { useDispatch , useSelector } from "react-redux";


const AuthNavigation = () => {
    const dispatch = useDispatch();
    const uid = useSelector(selectUid);
    const[currentUser , setCurrentUser] = useState();
    

    const userHandler = (user) => 
        {
            user?setCurrentUser(user) : setCurrentUser(null);
            // user && dispatch(setUid(user))
        }

        useEffect(() => 
        firebase.auth().onAuthStateChanged(user => userHandler(user)),
      []);

      useEffect(() => {
          console.log("UserDetails is " , uid);
      } , [uid])

    return (
        <> 
          {currentUser? <SignedInStack/> : <SignedOutStack/>}
        </>
    )
}

export default AuthNavigation
