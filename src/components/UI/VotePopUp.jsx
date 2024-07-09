import { useEffect, useRef, useState } from "react";
import PopUp from "./PopUp";
import { castVote } from "../../functions/auth/userFunction";
import { useSelector } from "react-redux";

import * as faceapi from "face-api.js";

const VotePopUp = ({ candidateId, setShowVote }) => {
	const { currentUser } = useSelector((state) => state.auth);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const [showScan, setShowScan] = useState(false);
	const [showButton, setShowButton] = useState(false);

	const videoRef = useRef();
	const canvasRef = useRef();

	useEffect(() => {
		const loadModels = async () => {
			await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
			await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
			await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
			startVideo();
			setShowScan(true);
		};

		const startVideo = () => {
			navigator.mediaDevices
				.getUserMedia({ video: {} })
				.then((stream) => (videoRef.current.srcObject = stream))
				.catch((err) => console.error(err));
		};

		loadModels();
	}, []);

	const handleVideoPlay = async () => {
		try {
			const canvas = faceapi.createCanvasFromMedia(videoRef.current);
			canvasRef.current.append(canvas);
			const displaySize = {
				width: videoRef.current.width,
				height: videoRef.current.height,
			};
			faceapi.matchDimensions(canvas, displaySize);

			setInterval(async () => {
				const detections = await faceapi
					.detectAllFaces(
						videoRef.current,
						new faceapi.TinyFaceDetectorOptions()
					)
					.withFaceLandmarks()
					.withFaceDescriptors();
				const resizedDetections = faceapi.resizeResults(
					detections,
					displaySize
				);
				canvas
					.getContext("2d")
					.clearRect(0, 0, canvas.width, canvas.height);
				faceapi.draw.drawDetections(canvas, resizedDetections);
				faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

				if (detections.length > 0) {
					setShowScan(false);
					setShowButton(true);
				}
			}, 100);
		} catch (error) {}
	};

	const handleUploadImage = async () => {
		try {
			const data = {
				userId: currentUser.id,
			};
			await castVote(data, candidateId._id);
			setSuccess(true);
		} catch (error) {
			setError("Error validating your account");
		} finally {
			setLoading(false);
		}
	};
	return (
		<PopUp>
			<div className="w-[500px] max-w-full max-h-full p-4 rounded-xl bg-white shadow relative">
				<div
					className=" absolute top-2 right-4 text-blue-700 cursor-pointer"
					onClick={() => {
						setShowVote(false);
					}}
				>
					Close
				</div>
				<div className="text-[20px] font-bold">Cast your vote</div>
				<div className="text-gray-600 text-[12px]">
					To cast your vote for {candidateId.full_name} you have to
					verify your face id
				</div>
				{error && <div className="text-[11px] text-red">{error}</div>}
				<div className="">
					<div className="flex justify-center items-center w-full mt-5 flex-col gap-3">
						<img
							src="https://cdn3.iconfinder.com/data/icons/new-apple-product-solid/24/face_id-512.png"
							className="w-[70px] h-[70px] object-cover"
							alt="Face ID Icon"
						/>
						{showScan && (
							<PopUp>
								<div className="flex items-center justify-center flex-col gap-4 relative">
									<video
										ref={videoRef}
										onPlay={handleVideoPlay}
										width="720"
										height="560"
										autoPlay
										muted
									/>
									<div
										className="absolute top-0 left-0 z-50"
										ref={canvasRef}
									></div>
								</div>
							</PopUp>
						)}
						{showButton && (
							<button
								className="bg-blue-500 text-white px-10 py-2 rounded"
								onClick={handleUploadImage}
							>
								Verify vote
							</button>
						)}
					</div>
				</div>
			</div>
			{success && (
				<PopUp>
					<div className="w-[500px] text-center h-[200px] bg-white max-w-full shadow rounded-xl p-5 flex flex-col justify-center">
						<div className="text-[25px] font-bold text-green-500">
							Vote casted sussesfully
						</div>
						<div className="text-gray-500 font-light">
							You have successfully vast your vote to{" "}
							{candidateId.full_name}
							<div
								className="bg-blue-400 mt-4 text-white py-2 rounded-lg cursor-pointer"
								onClick={() => {
									setShowScan(false);
									setShowVote(false);
									window.location.reload();
								}}
							>
								Go back
							</div>
						</div>
					</div>
				</PopUp>
			)}
		</PopUp>
	);
};

export default VotePopUp;
