import React, { useEffect, useState } from "react";
import {
	Outlet,
	RouterProvider,
	createBrowserRouter,
	useNavigate,
} from "react-router-dom";

// importing pages
import Welcome from "pages/Welcome";
import SignUp from "pages/SignUp";
import Signin from "pages/SignIn";
import { useSelector } from "react-redux";
import Dashboard from "pages/User/Dashboard";
import Loading from "components/UI/Loading";
import Layout from "components/Layout/Layout";
import AdminLayout from "pages/Admin/AdminLayout";
import AdminDashboard from "pages/Admin/AdminDashboard";
import AdminUsers from "pages/Admin/AdminUsers";
import AdminElection from "../pages/Admin/AdminElection";
import AdminCandidate from "../pages/Admin/AdminCandidate";
import Election from "../pages/Election";
import AdminViewElection from "../pages/Admin/AdminViewElection";
import AddFaceId from "../pages/User/AddFaceId";

// Private route dictator
const PrivateRoutes = () => {
	const navigate = useNavigate();
	const [authState, setAuthState] = useState(null);
	const { isAuthenticated, userType, currentUser } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		isAuthenticated === true ? setAuthState(true) : setAuthState(false);
	}, [isAuthenticated]);

	if (authState === null && !currentUser) {
		return <Loading />;
	}

	return authState === true ? (
		currentUser?.userType === "admin" ? (
			navigate("/admin")
		) : (
			<Outlet />
		)
	) : (
		<Signin />
	);
};

const AdminRoutes = () => {
	const [authState, setAuthState] = useState(null);
	const { isAuthenticated, userType, currentUser } = useSelector(
		(state) => state.auth
	);
	useEffect(() => {
		isAuthenticated === true ? setAuthState(true) : setAuthState(false);
	}, [isAuthenticated]);

	if (authState === null) {
		return <Loading />;
	}

	return authState === true && currentUser?.userType === "admin" ? (
		<Outlet />
	) : (
		<Signin />
	);
};

// Public router dicattor
const PublicRoutes = () => {
	const [authState, setAuthState] = useState(null);
	const { isAuthenticated, userType, currentUser } = useSelector(
		(state) => state.auth
	);
	const navigate = useNavigate();
	useEffect(() => {
		isAuthenticated === true ? setAuthState(true) : setAuthState(false);
	}, [isAuthenticated]);

	if (authState === null) {
		return <Loading />;
	}

	return authState !== true ? (
		<Outlet />
	) : currentUser?.userType === "admin" ? (
		navigate("/admin")
	) : (
		navigate("/dashboard")
	);
};

const Routes = () => {
	const routes = createBrowserRouter([
		// Free routes
		{
			path: "/",
			element: <Welcome />,
		},

		// Public ROutes
		{
			element: <PublicRoutes />,
			children: [
				{
					path: "/signup",
					element: <SignUp />,
				},
				{
					path: "/signin",
					element: <Signin />,
				},
			],
		},

		// PRivate route

		{
			element: <PrivateRoutes />,
			children: [
				{
					element: <Layout />,
					children: [
						{
							path: "/dashboard",
							element: <Dashboard />,
						},
						{
							path: "/election/:electionId",
							element: <Election />,
						},
					],
				},
			],
		},

		{
			element: <AdminRoutes />,
			children: [
				{
					element: <AdminLayout />,
					children: [
						{
							path: "/admin",
							element: <AdminDashboard />,
						},
						{
							path: "/admin/users",
							element: <AdminUsers />,
						},
						{
							path: "/admin/elections",
							element: <AdminElection />,
						},
						{
							path: "/admin/candidate",
							element: <AdminCandidate />,
						},
						{
							path: "/admin/election/:electionId",
							element: <AdminViewElection />,
						},
					],
				},
			],
		},
	]);
	return (
		<>
			<RouterProvider router={routes} />
		</>
	);
};

export default Routes;
