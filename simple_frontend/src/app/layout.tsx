"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navigation from "./components/Navigation";
import AuthProvider from "./contexts/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<Navigation />
					<React.StrictMode>
						<main>
							{children}
						</main>
					</React.StrictMode>
				</AuthProvider>
			</body>
		</html>
	);
}
