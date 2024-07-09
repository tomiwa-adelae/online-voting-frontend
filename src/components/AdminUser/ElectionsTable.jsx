import React, { useEffect, useState } from "react";
import { Table, Space, Button, Tag } from "antd";
import { fetchElectionHandler } from "../../functions/Election/electionFunction";
import PopUp from "../UI/PopUp";
import EditElection from "./EditElection";
import { deleteElection, updateElection } from "../../functions/admin/election";

const ElectionsTable = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [elections, setElections] = useState([]);
	const [showEditElection, setShowEditElection] = useState(false);
	const [selectedElection, setSelecteedElection] = useState(null);
	const [deleteMessage, setDeleteMessage] = useState(null);
	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await fetchElectionHandler();
			setElections(res.elections || []); // Ensure it's an array
		} catch (error) {
			setError("Error fetching elections from the database");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const handleStart = async (record) => {
		try {
			setDeleteMessage(null);
			setLoading(true);
			const updatedRecord = { ...record, status: "Running" };
			await updateElection(record._id, updatedRecord);
			fetchData();
			setDeleteMessage("Election is starting ");
		} catch (error) {
			setDeleteMessage("Error starting election");
		} finally {
			setLoading(false);
		}
	};

	const handleEnd = async (record) => {
		try {
			setDeleteMessage(null);
			setLoading(true);
			const updatedRecord = { ...record, status: "Ended" };
			await updateElection(record._id, updatedRecord);
			fetchData();
			setDeleteMessage("Election has ended ");
		} catch (error) {
			setDeleteMessage("Error ending election");
		} finally {
			setLoading(false);
		}
	};

	const columns = [
		{
			title: "",
			dataIndex: "image",
			key: "image",
			render: (image) => (
				<img
					className="rounded w-[70px] h-[40px] object-cover"
					src={image}
					alt="Election"
				/>
			),
		},

		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "Duration",
			dataIndex: "duration",
			key: "duration",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status) => (
				<Tag
					color={
						status === "Pending"
							? "orange"
							: status === "Running"
							? "green"
							: "blue"
					}
				>
					{status}
				</Tag>
			),
		},
		{
			title: "Conducted By",
			dataIndex: "conductedBy",
			key: "conductedBy",
		},
		{
			title: "Actions",
			key: "actions",
			render: (text, record) => (
				<Space size="middle">
					<Button type="primary" onClick={() => handleEdit(record)}>
						Edit
					</Button>
					<Button
						type="danger"
						className="border-red-500 text-red-500"
						onClick={() => handleDelete(record)}
					>
						Delete
					</Button>
				</Space>
			),
		},
		{
			title: "Control",
			key: "control",
			render: (text, record) => (
				<Button
					className="bg-orange-500"
					type={record.status === "Pending" ? "primary" : "primary"}
					onClick={() =>
						record.status === "Pending"
							? handleStart(record)
							: handleEnd(record)
					}
				>
					{record.status === "Pending" ? "Start" : "End"}
				</Button>
			),
		},
	];

	const handleEdit = (record) => {
		setSelecteedElection(record);
		setShowEditElection(true);
		// Add logic for editing an election
	};

	const handleView = (record) => {};

	const handleDelete = (record) => {
		try {
			setLoading(true);
			setDeleteMessage(null);
			setDeleteMessage("Election has been deleted.");
		} catch (error) {
			setDeleteMessage("Error Deleting the election");
		} finally {
			setLoading(false);
		}
		deleteElection(record._id);
		fetchData();
	};

	return (
		<div className=" capitalize overflow-x-scroll">
			{/* <h1>Elections Table</h1> */}
			<div className="text-orange-500"> {deleteMessage}</div>
			{loading ? (
				"Loading...."
			) : error ? (
				<div className="text-red-500">Error: {error}</div>
			) : (
				<Table
					columns={columns}
					dataSource={elections}
					loading={loading}
				/>
			)}

			{showEditElection && (
				<PopUp>
					<EditElection
						setShowEditElection={setShowEditElection}
						electionData={selectedElection}
						fetchData={fetchData}
					/>
				</PopUp>
			)}
		</div>
	);
};

export default ElectionsTable;
