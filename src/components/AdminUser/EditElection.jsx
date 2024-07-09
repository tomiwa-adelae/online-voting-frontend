import { useRef, useState, useEffect, ChangeEvent } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../UI/Input"; // Assuming this is the custom Input component
import { uploadMedia } from "../../functions/media/MediaFunction";
import { updateElection } from "../../functions/admin/election"; // Assume this is the function for updating an election
import CloseIcon from "../../assets/icon/close.svg";

const validateImage = (file) => {
	if (!file) {
		return "Empty image";
	} else if (
		![
			"image/jpeg",
			"image/png",
			"image/jpg",
			"image/webp",
			"image/gif",
		].includes(file.type)
	) {
		return `${file.name} format not supported`;
	} else if (file.size > 1024 * 1024 * 5) {
		return `${file.name} is too large, the maximum size is 5mb`;
	}
	return null; // No error
};

const EditElection = ({ setShowEditElection, electionData, fetchData }) => {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(
		electionData.image ||
			"https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"
	);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);
	const refInputProfile = useRef(null);

	useEffect(() => {
		setPreview(
			electionData.image ||
				"https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"
		);
	}, [electionData]);

	const handleProfileImage = (e) => {
		const file = e.target.files?.[0];
		const errorMessage = validateImage(file);
		if (errorMessage) {
			setError(errorMessage);
			return;
		}

		setImage(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setPreview(reader.result);
			setError(null);
		};
	};

	const initialValues = {
		title: electionData.title || "",
		description: electionData.description || "",
		date: electionData.date || "",
		duration: electionData.duration || "",
		conductedBy: electionData.conductedBy || "",
		status: electionData.status || "",
	};

	const validationSchema = Yup.object({
		title: Yup.string().required("Required"),
		description: Yup.string().required("Required"),
		date: Yup.string().required("Required"),
		duration: Yup.string().required("Required"),
		conductedBy: Yup.string().required("Required"),
	});

	const handleSubmit = async (values) => {
		try {
			setLoading(true);
			setError(null);
			let imageUrl = preview;
			if (image) {
				const data = { files: [image], path: "elections" };
				const uploadedUrl = await uploadMedia(data);
				imageUrl = uploadedUrl.medias[0].url;
			}
			const updatedValues = { ...values, image: imageUrl };

			fetchData();
			setShowEditElection(false);
		} catch (error) {
			setError("Error while updating election data");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-[700px] min-h-[600px] bg-white rounded-xl p-5 relative">
			<img
				src={CloseIcon}
				alt=""
				className=" absolute top-5 right-5 cursor-pointer"
				onClick={() => {
					setShowEditElection(false);
				}}
			/>
			<div className="text-[25px] font-bold">Edit Election</div>
			<div className="text-gray-500">
				Modify the details of the election.
			</div>
			<input
				type="file"
				accept="image/*"
				ref={refInputProfile}
				hidden
				onChange={handleProfileImage}
			/>
			<div className="mt-5">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form>
							<div className="">
								<Input
									placeholder="Election Title"
									name="title"
								/>
							</div>
							<div className="">
								<Input placeholder="Duration" name="duration" />
							</div>
							<div className="">
								<Input
									placeholder="Conducted By"
									name="conductedBy"
								/>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div className="">
									<div className="">
										<Input
											placeholder="Election Date/Time"
											type="datetime-local"
											name="date"
											label="Election Date/Time"
										/>
									</div>
									<div className="">
										<Input
											placeholder="Description"
											name="description"
											label="Description"
										/>
									</div>
								</div>
								<div className="w-full cursor-pointer">
									<img
										src={preview}
										className="w-full object-cover h-auto rounded"
										alt=""
										onClick={() =>
											refInputProfile.current?.click()
										}
									/>
								</div>
							</div>
							{error && (
								<div className="text-red-500">{error}</div>
							)}
							{message && (
								<div className="text-green-500">{message}</div>
							)}
							<div className="mt-4">
								<button
									disabled={loading}
									type="submit"
									className="btn btn-primary bg-blue-600 px-6 py-3 rounded text-white"
								>
									{loading ? "Loading..." : "Update Election"}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default EditElection;
