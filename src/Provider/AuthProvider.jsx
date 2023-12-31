import React, { createContext, useEffect, useState } from "react";
import app from "../Utilities/firebase.config";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
	GithubAuthProvider,
} from "firebase/auth";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const GitProvider = new GithubAuthProvider();
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (result) => {
			if (result) {
				setUser(result);
				console.log(result);
				setLoading(false);
			} else {
				setUser(null);
				setLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);
	const googleLogin = () => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

	const SignInWithGithub = () => {
		setLoading(true);
		return signInWithPopup(auth, GitProvider);
	};

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const logOut = () => {
		return signOut(auth);
	};

	const login = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const updateUserData = (user, name, profileImg) => {
		return updateProfile(user, {
			displayName: name,
			photoURL: profileImg,
		});
	};

	const userInfo = {
		user,
		createUser,
		login,
		logOut,
		setUser,
		googleLogin,
		updateUserData,
		loading,
		SignInWithGithub,
		setLoading,
	};

	return (
		<AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
