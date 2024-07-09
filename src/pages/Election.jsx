import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getElection } from "../functions/admin/election";
import {
	getCandidate,
	getElectionCandidate,
} from "../functions/admin/candidate";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import Candidates from "../components/UI/Candidates";
import VotePopUp from "../components/UI/VotePopUp";

const Election = () => {
	const [voted, setVoted] = useState(false);
	const { electionId } = useParams();
	const [showVote, setShowVote] = useState(false);
	const [running, setRunning] = useState(false);
	const [election, setElection] = useState({});
	const [loadingElection, setLoadingElection] = useState(true);
	const [error, setError] = useState(null);
	const [candidates, setCandidates] = useState([]);
	const [loadingCandidate, setLoadingCandidate] = useState(true);
	const [candidateId, setCandidateId] = useState(null);

	const fetchElection = async () => {
		try {
			setLoadingElection(true);
			setError(null);
			const res = await getElection(electionId);
			setElection(res.election);
			if (res.election.status === "Running") {
				setRunning(true);
			}
		} catch (error) {
			console.error("Error fetching the election details:", error);
			setError("Error fetching the election details.");
		} finally {
			setLoadingElection(false);
		}
	};

	const handleVote = async (candid) => {
		setShowVote(true);
		setCandidateId(candid);
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
	}, [electionId]);

	return (
		<div>
			<div className="">
				<div className="w-full">
					<img
						src={election.image}
						alt=""
						className="w-full h-[200px] object-cover"
					/>
				</div>
				<div className="mt-4 px-5">
					<div className="text-[20px] font-bold ">
						{election.title}
					</div>
					<div className="text-gray-500 text-[13px]">
						{election.description}
					</div>
					<div className="text-[12px] text-red-400">
						{election.date}
					</div>

					<div className="grid grid-cols-4 font-light mt-3 bg-slate-100 p-3 rounded">
						<div className="text-[14px]">
							<b>Conducted By</b>{" "}
							<span className="font-bold">
								{election.conductedBy}
							</span>
						</div>
						<div className="text-[14px]">
							<b>Duration</b>{" "}
							<span className="font-bold">
								{election.duration}
							</span>
						</div>
						<div className="text-[14px]">
							<b>Status</b>{" "}
							<span className="font-bold">{election.status}</span>
						</div>
						<div className="text-[14px]">
							<b>Date</b>{" "}
							<span className="font-bold">
								{moment(election.date).format(
									"YYYY-MM-DD HH:mm"
								)}
							</span>
						</div>
					</div>
				</div>

				<div className=" p-5 pb-0">
					<div className="text-[18px] font-light">
						Candidate details for election.
					</div>
					<div className="text-[10px] text-gray-400">
						This is the details of the registered candidates for the
						election.
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
						{candidates.map((item, i) => (
							<Candidates
								key={i}
								item={item}
								handleVote={handleVote}
								running={running}
							/>
						))}
					</div>
				</div>
			</div>
			{showVote && (
				<VotePopUp
					candidateId={candidateId}
					setShowVote={setShowVote}
				/>
			)}
		</div>
	);
};

export default Election;