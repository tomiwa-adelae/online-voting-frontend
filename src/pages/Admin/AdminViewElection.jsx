import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getElection } from "../../functions/admin/election";
import moment from "moment";
import { getElectionCandidate } from "../../functions/admin/candidate";

const AdminViewElection = () => {
	const { electionId } = useParams();

	const [election, setElection] = useState([]);
	const [loadingElection, setLoadingElection] = useState(true);
	const [error, setError] = useState(false);
	const [candidates, setCandidates] = useState([]);
	const [loadingCandidate, setLoadingCandidate] = useState(true);
	const [showEdit, setShowEdit] = useState(false);

	const fetchElection = async () => {
		try {
			setLoadingElection(true);
			setError(null);
			const res = await getElection(electionId);
			setElection(res.election);
		} catch (error) {
			setError("Error fetching the election details.");
		} finally {
			setLoadingElection(false);
		}
	};

	const fetchCandidates = async () => {
		try {
			setLoadingCandidate(true);
			setError(null);

			const res = await getElectionCandidate(electionId);
			setCandidates(res.candidates);
		} catch (error) {
			setError("Error fetching the candidate details.");
		} finally {
			setLoadingCandidate(false);
		}
	};

	useEffect(() => {
		fetchElection();
		fetchCandidates();
	}, []);
	return (
		<div>
			<div className="">
				<div className="w-full">
					<img
						src={election?.image}
						alt=""
						className="w-full h-[200px] object-cover"
					/>
				</div>
				<div className="mt-4 px-5">
					<div className="text-[20px] font-bold ">
						{election?.title}
					</div>
					<div className="text-gray-500 text-[13px]">
						{election?.description}
					</div>
					<div className="text-[12px] text-red-400">
						{election?.date}
					</div>

					<div className="grid grid-cols-4 font-light mt-3 bg-slate-100 p-3 rounded">
						<div className="text-[14px]">
							<b>Conducted By</b>{" "}
							<span className="font-bold">
								{election?.conductedBy}
							</span>
						</div>
						<div className="text-[14px]">
							<b>Duration</b>{" "}
							<span className="font-bold">
								{election?.duration}
							</span>
						</div>
						<div className="text-[14px]">
							<b>status</b>{" "}
							<span className="font-bold">
								{election?.status}
							</span>
						</div>
						<div className="text-[14px]">
							<b>status</b>{" "}
							<span className="font-bold">
								{moment(election?.date).format(
									"YYYY-MM-DD HH:mm"
								)}
							</span>
						</div>
					</div>
				</div>

				<div className=" p-5">
					<div className="text-[18px] font-light">
						Candidate details for election.
					</div>
					<div className="text-[10px] text-gray-400">
						This is the details of the registerd candidates for the
						electioin.
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 mt-5">
						{candidates.map((item, i) => (
							<div className="rounded-xl overflow-hidden bg-white relative border">
								<div className="bg-gray-900 text-white absolute top-2 left-3 px-4 rounded">
									{item?.votes.length}
								</div>
								<img
									src={item?.image}
									className="w-full h-[300px] object-cover"
									alt=""
								/>
								<div className="p-2">
									<div className="font-bold">
										{item.full_name}
									</div>
									<div className="text-[10px] text-gray-400">
										{item?.details}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default AdminViewElection;
