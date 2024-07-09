import { InlineIcon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchElectionHandler } from "../../functions/Election/electionFunction";
import { Link } from "react-router-dom";
import VotePopUp from "../../components/UI/VotePopUp";

const Dashboard = () => {
	const [loadingElection, setLoadingElection] = useState(true);
	const [elections, setElections] = useState([]);

	useEffect(() => {
		const fetchElections = async () => {
			try {
				setLoadingElection(true);
				const res = await fetchElectionHandler();
				setElections(res.elections);
			} catch (error) {
			} finally {
				setLoadingElection(false);
			}
		};
		fetchElections();
	}, []);
	const { currentUser } = useSelector((state) => state.auth);

	return (
		<div className="w-screen mt-5 p-3">
			<div className="container mx-auto">
				<div className="w-full flex items-center gap-3">
					<div className="">
						<img
							src={currentUser?.image}
							className="w-[40px] h-[40px] object-cover rounded-full"
							alt=""
						/>
					</div>
					<div className="">
						<div className="md:text-[25px]">
							Welcome{" "}
							<span className="uppercase font-bold text-blue-700">
								{currentUser?.full_name}
							</span>
						</div>
						<div className="text-gray-400">
							With the matric number {currentUser?.matric}
						</div>
					</div>
				</div>

				<div className="mt-4 w-full grid md:grid-cols-2 gap-2">
					<div className="border broder-gray-200 rounded-xl p-4">
						<div className="flex items-center gap-3 capitalize mt-3">
							<div className="text-[20px]">
								<InlineIcon icon="fa:user-o" />
							</div>
							<div className="text-[16px]">
								{currentUser?.full_name}
							</div>
						</div>
						<div className="flex items-center gap-3 capitalize mt-3">
							<div className="text-[20px]">
								<InlineIcon icon="material-symbols:school" />
							</div>
							<div className="text-[16px]">
								{currentUser?.matric}
							</div>
						</div>
						<div className="flex items-center gap-3 capitalize mt-3">
							<div className="text-[20px]">
								<InlineIcon icon="ic:baseline-email" />
							</div>
							<div className="text-[16px]">
								{currentUser?.email}
							</div>
						</div>
						<div className="flex items-center gap-3 capitalize mt-3">
							<div className="text-[20px]">
								<InlineIcon icon="solar:users-group-two-rounded-bold" />
							</div>
							<div className="text-[16px]">
								{currentUser?.gender}
							</div>
						</div>
						{/* <div className="flex items-center gap-3 capitalize mt-3">
              <div className="text-[20px]">
                <InlineIcon icon="icon-park-solid:book" />
              </div>
              <div className="text-[16px]">{currentUser?.dept}</div>
            </div>
            <div className="flex items-center gap-3 capitalize mt-3">
              <div className="text-[20px]">
                <InlineIcon icon="ic:round-space-dashboard" />
              </div>
              <div className="text-[16px]">{currentUser?.faculty}</div>
            </div> */}
						<div className="flex items-center gap-3 capitalize mt-3">
							<div className="text-[20px]">
								<InlineIcon icon="iconoir:face-id" />
							</div>
							<div className="text-[16px]">
								{currentUser?.faceId}
							</div>
						</div>
					</div>
					<div className="border broder-gray-200 rounded-xl p-4">
						<div className="text-blue-700 font-bold">
							Current Election
						</div>
						{loadingElection ? (
							<div>Loading </div>
						) : (
							<div className="text-gray flex items-center justify-center flex-col">
								<div className="text-[140px] text-gray-300">
									<InlineIcon icon="tabler:mood-empty-filled" />
								</div>
								<div className=" capitalize text-[17px]">
									Sorry no current election
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="w-full border mt-5 p-5 rounded-xl">
					{loadingElection ? (
						<div>Loading </div>
					) : (
						<div className="">
							<div className="text-blue-700 font-bold ">
								Elections
							</div>
							<div className=" mb-5 text-gray-500">
								This is the list of all the registed ellections.
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								{elections &&
									elections?.map((item, i) => (
										<Link to={`/election/${item?._id}`}>
											<div className="flex gap-2 items-center cursor-pointer">
												<div className="w-[100px] h-[100px]">
													<img
														src={item?.image}
														alt=""
														className="rounded w-full h-full object-top"
													/>
												</div>{" "}
												<div className="">
													<div className="font-light text-[20px]">
														{item?.title}
													</div>
													<div className="text-[12px]">
														{item?.description}
													</div>
													<div className="text-right text-red-500">
														{item?.status}
													</div>
												</div>
											</div>
										</Link>
									))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
