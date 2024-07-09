import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDataAPI } from "../../utils/api";
import { Table, Modal } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [runningElection, setRunningElection] = useState([]);
	const [selectedElection, setSelectedElection] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const parseDuration = (durationStr) => {
		const match = durationStr.match(/(\d+)\s*hours?/i);
		if (match) {
			return parseInt(match[1]) * 60 * 60 * 1000; // Convert hours to milliseconds
		}
		// Add more parsing logic if needed for other formats (minutes, days, etc.)
		return 0;
	};

	const fetchDashboard = async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await getDataAPI("admin");
			const ongoingElections = res.elections.filter(
				(election) => election.status === "Running"
			);
			setRunningElection(ongoingElections);
			setData(res);
		} catch (error) {
			setError("Error fetching data");
		} finally {
			setLoading(false);
		}
	};

	const calculateTimeLeft = (startDate, duration) => {
		const endDate = moment(startDate).add(duration, "hours");
		const now = moment();
		const timeLeft = moment.duration(endDate.diff(now));
		return timeLeft;
	};

	useEffect(() => {
		fetchDashboard();
	}, []);

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			filterType: "input",
		},
		{
			title: "Duration",
			dataIndex: "duration",
		},
		{
			title: "Date",
			dataIndex: "date",
			render: (date) => moment(date).format("YYYY-MM-DD HH:mm"),
		},
		{
			title: "Conducted By",
			dataIndex: "conductedBy",
		},
		{
			title: "Time Left",
			dataIndex: "election",
			key: "timeLeft",
			render: (date, render) => {
				const timeLeft = calculateTimeLeft(
					render?.date,
					render?.duration
				);
				return `${timeLeft.days()}d ${timeLeft.hours()}h ${timeLeft.minutes()}m ${timeLeft.seconds()}s`;
			},
		},
	];

	const onRowClick = (record) => {
		setSelectedElection(record);
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
		setSelectedElection(null);
	};

	return (
		<div className="p-4">
			<div className="text-[25px]">
				Welcome Back!{" "}
				<span className="uppercase font-light text-blue-700">
					{currentUser?.full_name}
				</span>
			</div>
			<div className="text-gray-500">
				This is the admin dashboard, summary of all the project details
				can be found here.
			</div>

			<div className="grid grid-cols-4 mt-5 gap-2">
				<div className="border border-gray-400 w-full rounded-xl p-5">
					<div className="text-[18px] font-light">Users</div>
					<div className="font-bold text-[25px]">
						{loading ? "..." : data?.users?.length}
					</div>
					<div className="text-gray-400">
						This is the total sum of all the Users
					</div>
				</div>
				<div className="border border-gray-400 w-full rounded-xl p-5">
					<div className="text-[18px] font-light">Elections</div>
					<div className="font-bold text-[25px]">
						{loading ? "..." : data?.elections?.length}
					</div>
					<div className="text-gray-400">
						This is the total number of all the Elections
					</div>
				</div>
				<div className="border border-gray-400 w-full rounded-xl p-5">
					<div className="text-[18px] font-light">Candidates</div>
					<div className="font-bold text-[25px]">
						{loading ? "..." : data?.candidates?.length}
					</div>
					<div className="text-gray-400">
						This is the total sum of all the Candidates
					</div>
				</div>
				<div className="border border-gray-400 w-full rounded-xl p-5">
					<div className="text-[18px] font-light">
						Current Election
					</div>
					<div className="font-bold text-[25px]">
						{loading ? "..." : runningElection?.length}
					</div>
					<div className="text-gray-400">
						This is the number of current ongoing elections
					</div>
				</div>
			</div>

			<div className="mt-4 capitalize">
				<div className="text-[25px] font-bold">Elections</div>
				<div className="text-gray-500">
					These are the list of the ongoing elections.
				</div>
				<div className=" cursor-pointer">
					<Table
						columns={columns}
						dataSource={runningElection}
						onRow={(record) => ({
							onClick: () => onRowClick(record),
						})}
						pagination={true}
					/>
				</div>
			</div>

			<Modal
				title="Election Details"
				visible={isModalVisible}
				onCancel={handleModalClose}
				footer={null}
			>
				{selectedElection && (
					<div>
						<p>
							<strong>Title:</strong> {selectedElection.title}
						</p>
						<p>
							<strong>Description:</strong>{" "}
							{selectedElection.description}
						</p>
						<p>
							<strong>Date:</strong>{" "}
							{moment(selectedElection.date).format(
								"YYYY-MM-DD HH:mm"
							)}
						</p>
						<p>
							<strong>Duration:</strong>{" "}
							{selectedElection.duration} hours
						</p>
						<p>
							<strong>Conducted By:</strong>{" "}
							{selectedElection.conductedBy}
						</p>
						<p>
							<strong>Time Left:</strong>
							{`${calculateTimeLeft(
								selectedElection.date,
								selectedElection.duration
							).days()}d 
                ${calculateTimeLeft(
					selectedElection.date,
					selectedElection.duration
				).hours()}h 
                ${calculateTimeLeft(
					selectedElection.date,
					selectedElection.duration
				).minutes()}m 
                ${calculateTimeLeft(
					selectedElection.date,
					selectedElection.duration
				).seconds()}s`}
						</p>
						<Link to={`/admin/election/${selectedElection?._id}`}>
							<button className="text-blue-500 text-right w-full font-bold ">
								View Election
							</button>
						</Link>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default AdminDashboard;
