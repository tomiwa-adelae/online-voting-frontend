import React, { useEffect, useState } from "react";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import VotePopUp from "./VotePopUp";
const Candidates = ({ item, handleVote, running, voted }) => {
	return (
		<div className="rounded-xl overflow-hidden bg-white relative border">
			<div className="relative">
				<div className="bg-gray-900 text-white absolute top-2 left-3 px-4 rounded">
					{item.votes.length}
				</div>
				<img
					src={item.image}
					className="w-full h-[300px] object-cover"
					alt=""
				/>
				{running ? (
					voted ? (
						<div className="absolute bottom-0 right-0 p-2 text-[12px] flex items-center gap-2  justify-center bg-blue-900 text-white">
							Voted
							<InlineIcon icon="lucide:vote" />
						</div>
					) : (
						<button
							onClick={() => handleVote(item)}
							className="absolute bottom-0 right-0 p-2 text-[12px] flex items-center gap-2  justify-center bg-red-900 text-white"
						>
							Cast Vote <InlineIcon icon="mdi:vote" />
						</button>
					)
				) : (
					<div className="absolute bottom-0 right-0 p-2 text-[12px] flex items-center gap-2  justify-center bg-orange-600 text-white">
						Election is Yet to start or has Endded
						<InlineIcon icon="lucide:vote" />
					</div>
				)}
			</div>
			<div className="p-2">
				<div className="font-bold">{item.full_name}</div>
				<div className="text-[10px] text-gray-400">{item.details}</div>
			</div>
		</div>
	);
};

export default Candidates;
