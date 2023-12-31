import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const { googleLogin, setUser, login, SignInWithGithub, setLoading } =
		useContext(AuthContext);

	const handleSubmit = (event) => {
		event.preventDefault();
		login(email, password)
			.then((result) => {
				console.log(result.user);
				navigate(from, { replace: true });
			})
			.catch((err) => console.log(err.message));

		event.target.reset();

		// You can perform additional actions here, such as sending a login request to a server
	};
	const handleGoogleLogin = () => {
		googleLogin()
			.then((result) => {
				setUser(result.user);
				navigate(from, { replace: true });
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleGithubLogin = () => {
		SignInWithGithub()
			.then((result) => {
				setUser(result.user);
				navigate(from, { replace: true });

				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="w-full flex flex-col items-center">
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/6"
				onSubmit={handleSubmit}
			>
				<div className="mb-4  ">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input
						className="shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 "
						id="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline  "
						id="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<div>
					<Link to="/signup" className="text-sm text-blue-700">
						Click the link if you donot register
					</Link>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						onSubmit={(event) => handleSubmit(event)}
					>
						Submit
					</button>
				</div>
			</form>
			<div className="flex">
				<button
					className="btn btn-primary bg-green-500"
					onClick={handleGoogleLogin}
				>
					Google Login
				</button>
				<button
					className="btn btn-primary mx-3 bg-green-400"
					onClick={handleGithubLogin}
				>
					Github Login
				</button>
			</div>
		</div>
	);
};

export default Login;
