import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../components/UI/PopUp";
import { Link } from "react-router-dom";
import AddFace from "./AddFace";
import { updateUserProfile } from "../../functions/auth/userFunction";
import Cookies from "js-cookie";
import { autenticated } from "../../functions/redux/Slice/authSlice"; // Corrected import typo

const AddFaceId = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const [success, setSuccess] = useState(false);
	let faceio;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		faceio = new faceIO("fioa05ca");
		// Cleanup function for faceio instance
		return () => {
			// Perform cleanup if necessary
		};
	}, []);

	const dispatch = useDispatch();

	const handleUploadImage = async () => {
		try {
			setLoading(true);
			let response = await faceio.enroll({
				locale: "auto",
				payload: {
					name: currentUser?.full_name,
					email: currentUser?.email,
					pin: "12345",
				},
			});
			const data = {
				full_name: currentUser?.full_name,
				faceId: response.facialId, // Replace with actual faceId returned from faceIO
				// faceId: "fioaa810",
				id: currentUser?.id,
			};

			const res = await updateUserProfile(data);
			const userInfo = JSON.stringify(res.user);
			Cookies.set("currentUser", userInfo, {
				sameSite: "None",
				secure: true,
			});
			dispatch(autenticated(res.user)); // Corrected dispatch action name
			setSuccess(true);
		} catch (error) {
			console.error("Error uploading image:", error);
			setError("Error while perfomring face id.");
			// Handle error appropriately, e.g., show error message to the user
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full h-screen flex items-center justify-center p-5">
			<AddFace />
			<div className="w-[600px] h-[300px] max-w-full shadow rounded-xl p-5 flex flex-col justify-center">
				<div className="font-bold text-blue-700">
					Upload Your Face ID
				</div>
				<div className="text-gray-400 text-[12px]">
					You need to upload your face before you can do anything with
					your account.
				</div>{" "}
				{error && (
					<div className="text-[12px] text-red-500">{error}</div>
				)}
				{loading ? (
					<div className="mt-10 text-center">Uploading......</div>
				) : (
					<>
						<div className="flex justify-center items-center w-full mt-5 flex-col gap-3">
							<img
								src="https://cdn3.iconfinder.com/data/icons/new-apple-product-solid/24/face_id-512.png"
								className="w-[70px] h-[70px] object-cover"
								alt="Face ID Icon"
							/>
							<button
								className="bg-blue-500 text-white px-10 py-2 rounded"
								onClick={handleUploadImage}
							>
								Add Face
							</button>
						</div>
					</>
				)}
			</div>
			{success && (
				<PopUp>
					<div className="w-[500px] text-center h-[200px] bg-white max-w-full shadow rounded-xl p-5 flex flex-col justify-center">
						<div className="text-[25px] font-bold text-green-500">
							Face Enrolled successfully
						</div>
						<div className="text-gray-500 font-light">
							You can now navigate to your dashboard to place your
							vote for the candidate of your choice.{" "}
							<Link to="/dashboard" className="text-blue-400">
								Go to Dashboard
							</Link>
						</div>
					</div>
				</PopUp>
			)}
		</div>
	);
};

export default AddFaceId;
