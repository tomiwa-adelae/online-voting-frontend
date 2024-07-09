import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Input, PasswordInput } from "components/UI/Input";
import {
	loginFunction,
	registerFunction,
} from "../functions/auth/authFunctions";
import { useDispatch } from "react-redux";
import { autenticated, setUserType } from "../functions/redux/Slice/authSlice";
import { Link } from "react-router-dom";

const SignIn = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const validationSchema = Yup.object().shape({
		identifier: Yup.string().required(
			"Your email or matric number is required"
		),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
	});

	const dispatch = useDispatch();
	const initialValues = {
		identifier: "",
		password: "",
	};
	const handleSubmit = async (values) => {
		try {
			setLoading(true);
			setError(null);
			const res = await loginFunction(values);

			if (res?.user?.userType === "admin") {
				dispatch(setUserType("admin"));
			}

			dispatch(autenticated(res.user));
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="w-full md:w-[50%] flex items-center justify-center">
				<div className="w-[500px] maz-w-[100%]">
					<div className="text-[30px] text-blue-800">
						Welcome Back!
					</div>
					<div className="">
						You can fill in your information to login in to your
						account with us.
					</div>
					<div className="mt-4">
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							<Form>
								<Input
									placeholder="Enter your email or matric number"
									name="identifier"
								/>
								<PasswordInput
									placeholder="Password"
									name="password"
								/>
								<button
									type="submit"
									disabled={loading}
									className="w-full px-2 py-2 text-center bg-blue-600 text-white"
								>
									{loading ? "Loading.." : "Sign In"}
								</button>
								{error && (
									<div className="text-red-500 text-[11px]">
										{error}
									</div>
								)}
								<div className="text-center mt-4">
									I already have an account,{" "}
									<Link to="/signup">Sign up</Link>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
			<div className="w-[50%] bg-blue-800 h-full hidden md:block"></div>
		</div>
	);
};

export default SignIn;
