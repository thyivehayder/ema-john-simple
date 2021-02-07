import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UsingContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
firebase.initializeApp(firebaseConfig);
function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        signIn: false,
        email: '',
        displayName: '',
        password: '',
        photoURL: '',
        error: '',
        success: false
    })
    const [loggedInUser,setLoggedInUser] = useContext(UsingContext)
    let history=useHistory()
    let location=useLocation()
    let { from } = location.state || { from: { pathname: "/" } };
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { email, displayName, photoURL } = result.user
                const signedInUser = {
                    signIn: true,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                }
                setUser(signedInUser)
                setLoggedInUser(signedInUser)
                history.replace(from);
                
            })
            .catch(error => { console.log(error) })
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(result => {
                const signedOutUser = {
                    signIn: false,
                    email: '',
                    displayName: '',
                    photoURL: ''
                }
                setUser(signedOutUser)
            })
            .catch(err => { console.log(err) })
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            // console.log(user.email,user.password)
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    // Signed in 
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    updateUserName(user.displayName)
                    // ...
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo)
                    //   var errorCode = error.code;
                    //   var errorMessage = error.message;
                    // console.log(errorCode,errorMessage)
                    //   // // ..
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    setLoggedInUser(newUserInfo)
                    history.replace(from);
                    console.log(res.user)
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo)
                });
        }
        e.preventDefault()
    }
    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name

        })
            .then(function () {
                // Update successful.
            })
            .catch(function (error) {
                // An error happened.
            });
    }
    const gotInputValue = (event) => {
        // console.log(event.target.name,event.target.value)
        let isFormValid;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value)

        }
        if (event.target.name === 'password') {
            const validatePassword = event.target.value.length > 7
            const validatePassword1 = /\d{1}/.test(event.target.value)
            isFormValid = (validatePassword && validatePassword1)
        }
        if (event.target.name === 'displayName') {
            isFormValid = event.target.value
        }

        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value
            setUser(newUserInfo)
        }
    }
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbLogIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;


                // The signed-in user info.
                var user = result.user;



                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    }
    return (
        <div style={{ textAlign: 'center' }}>
             <h4>LogIn Form</h4>
            {user.signIn ? <button onClick={handleSignOut}>Google Sign out</button>
                : <button onClick={handleSignIn}>Google Sign In</button>
            }
            <br />
            <button onClick={handleFbLogIn}>Log In Using Facebook</button>
            {user.signIn && <div>
                <h3>Welcome, Mr. {user.displayName} !</h3>
                <p>Email :{user.email}</p>
                <img style={{ width: '10%' }} src={user.photoURL} alt="" />
            </div>}

           
            <h3>Name: {user.displayName}</h3>


            <input type="checkbox" onClick={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="">New User Sign Up</label>

            <form onSubmit={handleSubmit}>
                {newUser && <input name='displayName' onBlur={gotInputValue} type="text" placeholder="Enter Your Name" required />}
                <br />
                <input onBlur={gotInputValue} type="email" name="email" id="" placeholder='Enter Your Email' required />
                <br />
                <input onBlur={gotInputValue} type="password" name="password" id="" placeholder='Enter Your Password' required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'log in'} Successfully!</p>}

            {/* <h2> Email: {user.email}</h2>
        <p>Password: {user.password}</p>  */}




        </div>
    );
}

export default Login;