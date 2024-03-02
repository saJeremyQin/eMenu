import { defineStore } from "pinia";
import auth from "@/firebase";
import router from "@/router";
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithEmailAndPassword, 
    signOut, 
    // updateProfile
} from 'firebase/auth';
import fetchClient from "@/utils/fetchClient";
import eventBus from "@/utils/eventBus";

// const continueUrl;


const actionCodeSettings = {
    url:'https://vigilant-palm-tree-577qwrxjwrgcvjjw-8080.preview.app.github.dev/home',
    handleCodeInApp: true,
};

export const useAuthStore = defineStore('authstore',{
    state: () => ({
        user: null,
        contentfulVerified: false,
    }),
    getters:  {
        getUser: (state) => {
            return state.user;
        }
    },
    actions: {
        setUser(user) {
            this.$state.user = user;
        },
        setContentfulVerified(currentState) {
            this.$state.contentfulVerified=currentState;
        },
        clearUser() {
            this.$state.user = null;
        },
        async login(details) {
            const { email, password } = details;
            try {
                // console.log(`email is ${email} and password is ${password}`);
                await signInWithEmailAndPassword(auth, email, password);

                // const authToken = await auth.currentUser.getIdToken();
                // console.log('authToken is ', authToken);

                // if(authToken) {
                //     fetchClient.defaults.headers.common['Authorization']=`Bearer ${authToken}`;
                // }
            } catch (error) {
                console.log('errow with code of',error.code);

                switch(error.code) {
                    case 'auth/user-not-found':
                      alert("User not found")
                      break
                    case 'auth/wrong-password':
                      alert("Wrong password")
                      break
                    default:
                      alert("Something went wrong")
                }
                return;
            }

            // this.setUser(auth.currentUser);
            router.push({
                path:'/home'     
            });
        },
        async register(details) {
            const { email, username, password } = details;
            console.log(`email is ${email}, password is ${password}, username is ${username}`);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
   
                try {
                    await sendEmailVerification(user, actionCodeSettings);
                    await fetchClient.post('/api/users/register', {
                        username
                    });
                    // use snack to replace alert later
                    const messageText='Verification email sent successfully!';
                    eventBus.emit('verification-email-sent', messageText);
                } catch (verificationError) {
                    console.error('Error sending verification email:', verificationError);
                    alert('Error sending verification email');
                    return;
                }
            } catch (error) {
                console.error('Error creating user:', error);
                /* To be added
                 "status": 422,
                "statusText": "Unprocessable Entity",
                "message": "Validation error",
                "details": {
                    "errors": [
                    {
                        "name": "unique",
                        ...
                    }
                }
                */
                switch(error.code) {
                    case 'auth/email-already-in-use':
                      alert("Email already in use")
                      break
                    case 'auth/invalid-email':
                      alert("Invalid email")
                      break
                    case 'auth/operation-not-allowed':
                      alert("Operation not allowed")
                      break
                    case 'auth/weak-password':
                      alert("Weak password")
                      break
                    default:
                      alert("Something went wrong:" +error.message)
                }
                return ;
            }
            // this.setUser(auth.currentUser);
            // router.push({
            //     path:'/home'     
            // });
        },
        async logout() {
            try {
                await signOut(auth);
            } catch (error) {
                console.log(error.message);
            }
            this.clearUser();
            router.push({
                path:'/login'
            })
        },
        setUserFromFirebase () {
            auth.onAuthStateChanged(async user => {
                // console.log('onAuthStateChanged:', user);

                if (user === null) {
                    // console.log('User is null, clearing user...');
                    this.clearUser();
                } else {
                    // console.log('User is not null, setting user:', user);
                    this.setUser(user);
                    if (router.isReady() && router.currentRoute.value.path === '/login') {
                        router.push('/home')
                    }
                }
            })
        }
    }
});