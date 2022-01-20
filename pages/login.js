import React, { useRef, useEffect } from 'react';
import { signIn, useSession, getCsrfToken } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import toast from 'react-hot-toast';

const Login = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const { data: session } = useSession();
	const router = useRouter();

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const result = await signIn('credentials', {
			redirect: false,
			username: usernameRef.current.value,
			password: passwordRef.current.value,
			callbackUrl: '/',
		});

		if (!result.error) {
			router.push('/');
		} else {
			alert('Invalid username or password');
		}
	};

	useEffect(() => {
		console.log(session);
		if (session) {
			router.push('/');
		}
	}, [session]);

	if (session) {
		return <div>You already logged in</div>;
	}
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:max-w-md text-center">
					<Link href="/" passHref>
						<a>
							<Image width={64} height={56} src="/logo.png" alt="Exbon" />
						</a>
					</Link>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" onSubmit={onSubmitHandler}>
							<div>
								<label htmlFor="username" className="block text-sm font-medium text-gray-700">
									Username
								</label>
								<div className="mt-1">
									<input
										ref={usernameRef}
										id="username"
										name="username"
										type="text"
										autoComplete="username"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Password
								</label>
								<div className="mt-1">
									<input
										ref={passwordRef}
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember_me"
										name="remember_me"
										type="checkbox"
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
										Remember me
									</label>
								</div>

								<div className="text-sm">
									<Link href="/forget-password" passHref>
										<a className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
									</Link>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
