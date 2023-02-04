import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
// import GoogleButton from 'react-google-button' // optional

const Login = () => {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)

  function loginWithGoogle() {
    return firebase.login({ provider: 'google', type: 'popup' })
  }

  function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
  }
  useEffect(() => {
    disableScrolling()
  },[])

  return (
    <div>
      <div style={{ display: 'grid', placeItems: 'center', marginTop: '20em' }}>
        {
          !isLoaded(auth)
            ? <span>Loading...</span>
            : isEmpty(auth)
              // <GoogleButton/> button can be used instead
              ? <GoogleButton onClick={loginWithGoogle}>Login With Google</GoogleButton>
              : <Redirect to='/Home' />
        }
      </div>
    </div>
  )
}


export default Login
