import { defineStore } from "pinia";
import auth from "@/firebase";
import router from "@/router";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from 'firebase/auth';

export const useAuthStore = defineStore('authstore',{
    state: () => ({
        user: null
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
        clearUser() {
            this.$state.user = null;
        },
        async login(details) {
            const { email, password } = details;
            try {
                console.log(`email is ${email} and password is ${password}`);
                await signInWithEmailAndPassword(auth, email, password)
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
            const { email, password } = details;
            console.log(`email is ${email}, password is ${password}`);
            try {
                createUserWithEmailAndPassword(auth, email, password)
            } catch (error) {
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
                      alert("Something went wrong")
                }
                return ;
            }
            // this.setUser(auth.currentUser);
            router.push({
                path:'/home'     
            });
        },
        async logout() {
            try {
                signOut()
            } catch (error) {
                console.log(error.message);
            }
            this.clearUser();
            router.push({
                path:'/'
            })
        },
        setUserFromFirebase () {
            auth.onAuthStateChanged(async user => {
                console.log('onAuthStateChanged:', user);

                if (user === null) {
                    console.log('User is null, clearing user...');
                    this.clearUser();
                } else {
                    console.log('User is not null, setting user:', user);
                    this.setUser(user);
                    if (router.isReady() && router.currentRoute.value.path === '/login') {
                        router.push('/home')
                    }
                }
                
            })
        }
    }
});