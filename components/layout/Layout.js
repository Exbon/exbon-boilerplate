import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import Header from './Header';

const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{ name: 'Team', href: '#', current: false },
	{ name: 'Projects', href: '#', current: false },
	{ name: 'Calendar', href: '#', current: false },
];
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Settings', href: '#' },
	{ name: 'Sign out', href: '#' },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example({ children }) {
	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
			<div className="min-h-full">
				<Header />

				<div className="py-10">
					<header>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h1 className="text-3xl font-bold leading-tight text-gray-900">
								Dashboard
							</h1>
						</div>
					</header>
					<main>
						<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
							{children}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
