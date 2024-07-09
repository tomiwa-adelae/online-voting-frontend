import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Input } from "components/UI/Input";
import { OptionInput, PasswordInput, RadioInput } from "../components/UI/Input";
import { dept } from "utils/data";
import { faculty } from "../utils/data";
import { registerFunction } from "../functions/auth/authFunctions";
import { useDispatch } from "react-redux";
import { autenticated } from "../functions/redux/Slice/authSlice";
import { Link } from "react-router-dom";

const SignUp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const validationSchema = Yup.object().shape({
		full_name: Yup.string().required("Full name is required"),
		matric: Yup.string().required("Matric number is required"),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		gender: Yup.string().required("Gender is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		confirm_password: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm password is required"),
	});

	const dispatch = useDispatch();
	const initialValues = {
		full_name: "",
		matric: "",
		email: "",
		gender: "",

		password: "",
		confirm_password: "",
	};
	const handleSubmit = async (values) => {
		try {
			setLoading(true);
			setError(null);
			const res = await registerFunction(values);
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
				<div className="w-[400px] max-w-[100%]">
					<div className="text-[30px] text-blue-800">Welcome !!!</div>
					<div className="">
						You can fill in your information to create an account
						with us.
					</div>
					<div className="mt-4">
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							<Form>
								<Input
									placeholder="Full Name"
									name="full_name"
								/>
								<Input
									placeholder="Matric Number"
									name="matric"
								/>
								<Input placeholder="Email" name="email" />
								<div className="mt-2 text-[12px]">Gender</div>
								<div className="grid grid-cols-2 gap-2 items-center">
									<RadioInput
										name="gender"
										label="Female"
										value="female"
									/>
									<RadioInput
										name="gender"
										label="Male"
										value="male"
									/>
								</div>

								<PasswordInput
									placeholder="Password"
									name="password"
								/>
								<PasswordInput
									placeholder="Confirm Password"
									name="confirm_password"
								/>
								<button
									type="submit"
									disabled={loading}
									className="w-full px-2 py-2 text-center bg-blue-600 text-white"
								>
									{loading ? "Loading.." : "Sign Up"}
								</button>
								{error && (
									<div className="text-red-500 text-[11px]">
										{error}
									</div>
								)}
								<div className="text-center mt-4">
									I don't have an account,{" "}
									<Link to="/signin">Sign In</Link>
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

export default SignUp;
