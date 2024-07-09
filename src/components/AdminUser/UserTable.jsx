import React, { useEffect, useState } from "react";
import { fetchUsers } from "functions/admin/user";
import TableUi from "../UI/Table";

const UserTable = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const handleFetchUsers = async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await fetchUsers();
				setUsers(res.users);
			} catch (error) {
				setError("Error fetching users from the database");
			} finally {
				setLoading(false);
			}
		};
		handleFetchUsers();
	}, []);

	const columns = [
		{
			title: "Full Name",
			dataIndex: "full_name",
			render: (text, record) => (
				<div className="flex gap-3 items-center">
					<img
						src={record.image || "fallback-image-url.png"} // Provide a fallback image URL
						className="bg-gray-300 rounded-full w-[40px] h-[40px] object-cover"
						alt={record.full_name}
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = "fallback-image-url.png";
						}} // Fallback in case of broken image link
					/>
					<div className="text-[16px] text-gray">
						{record.full_name}
					</div>
				</div>
			),
			filterType: "input",
		},
		{
			title: "Matric Number",
			dataIndex: "matric",
			filterType: "input",
		},
		{
			title: "Email",
			dataIndex: "email",
			filterType: "input",
		},
		{
			title: "Faculty",
			dataIndex: "faculty",
		},
		{
			title: "User Type",
			dataIndex: "userType",
		},
		{
			title: "",
			dataIndex: "",
			render: (text, record) => (
				<div>
					{/* add icon to show drop ddrop down of view and edit  */}
				</div>
			),
		},
	];

	if (loading) {
		return <div>Loading user data...</div>;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<div className="capitalize">
			<TableUi columns={columns} data={users} pagination />
		</div>
	);
};

export default UserTable;
