import React, { useState, useRef, useEffect } from "react";
import { Input, OptionInput } from "../UI/Input";
import CloseIcon from "../../assets/icon/close.svg";
import { Form, Formik } from "formik";
import { fetchElectionHandler } from "../../functions/Election/electionFunction";
import { updateCandidate } from "../../functions/admin/candidate"; // Import the function to update a candidate
import * as Yup from "yup";
import { uploadMedia } from "../../functions/media/MediaFunction";

const EditCandidate = ({ candidate, setShowEditCandidate }) => {
	const [elections, setElections] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const refInputProfile = useRef(null);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(
		candidate.image ||
			"https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"
	);

	const handleProfileImage = (e) => {
		const file = e.target.files?.[0];
		setImage(file);
		setPreview(URL.createObjectURL(file));
	};

	const fetchElections = async () => {
		try {
			const res = await fetchElectionHandler();
			setElections(res.elections);
		} catch (error) {
			setError("Error fetching elections. Please try again later.");
		}
	};

	useEffect(() => {
		fetchElections();
	}, []);

	const handleSubmit = async (values) => {
		try {
			setLoading(true);
			setError(null);
			let updatedValues = { ...values };

			if (image) {
				const data = { files: [image], path: "elections" };
				const uploadedUrl = await uploadMedia(data);
				updatedValues = { ...values, image: uploadedUrl.medias[0].url };
			}

			await updateCandidate(candidate._id, updatedValues); // Call the function to update candidate
			setShowEditCandidate(false);
		} catch (error) {
			setError("Error updating candidate. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const validationSchema = Yup.object().shape({
		full_name: Yup.string().required("Full name is required"),
		details: Yup.string().required("Details are required"),
		election: Yup.string().required("Please select an election"),
	});

	return (
		<div className="w-[700px] min-h-[300px] bg-white rounded-xl p-5 relative">
			<input
				type="file"
				accept="image/*"
				ref={refInputProfile}
				hidden
				onChange={handleProfileImage}
			/>

			<img
				src={CloseIcon}
				alt=""
				className="absolute top-5 right-5 cursor-pointer"
				onClick={() => {
					setShowEditCandidate(false);
				}}
			/>
			<div className="text-[20px] font-bold">Edit Candidate</div>
			<div className="text-gray-500 mb-4 text-[13px]">
				Update the Candidate details.
			</div>
			<Formik
				initialValues={{
					full_name: candidate.full_name,
					details: candidate.details,
					election: candidate.election?._id || "",
					image: candidate.image || "",
				}}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				{() => (
					<Form>
						<div className="grid grid-cols-2 gap-5">
							<div>
								<div>
									<Input
										placeholder="Full Name"
										name="full_name"
									/>
								</div>
								<div>
									<Input
										placeholder="Details"
										as="textarea"
										label="Details"
										name="details"
									/>
								</div>
								<div>
									<OptionInput
										name="election"
										label="Election"
										options={elections}
									/>
								</div>
							</div>
							<div>
								<div className="w-full cursor-pointer h-[200px]">
									<img
										src={preview}
										className="w-full object-cover h-full rounded"
										alt=""
										onClick={() =>
											refInputProfile.current?.click()
										}
									/>
								</div>
							</div>
						</div>
						{error && <div className="text-red-500">{error}</div>}
						<div></div>
						<button
							type="submit"
							className="btn btn-primary bg-blue-600 px-6 py-3 rounded text-white mt-4"
							disabled={loading}
						>
							{loading
								? "Updating Candidate..."
								: "Update Candidate"}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default EditCandidate;
