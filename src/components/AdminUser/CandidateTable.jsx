import React, { useState, useEffect } from "react";
import {
  fetchAllCandidate,
  deleteCandidate,
} from "../../functions/admin/candidate"; // Assuming deleteCandidate is defined here
import { Table, Space, Button, Tag } from "antd";
import EditCandidate from "./EditCandidate";
import PopUp from "../UI/PopUp";

const CandidateTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [showEditCandidate, setShowEditCandidate] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchAllCandidate();
      setCandidates(res.candidates || []); // Ensure it's an array
    } catch (error) {
      setError("Error fetching candidates from the database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          className="rounded w-[70px] h-[40px] object-cover"
          src={image}
          alt="Candidate"
        />
      ),
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Description",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Election Title",
      dataIndex: ["election", "title"],
      key: "electionTitle",
      render: (text, record) => record.election?.title || "N/A",
    },
    {
      title: "Election Date",
      dataIndex: ["election", "date"],
      key: "electionDate",
      render: (text, record) => record.election?.date || "N/A",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) => record.election?.duration || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag
          color={
            record.election?.status === "Pending"
              ? "orange"
              : record.election?.status === "Running"
              ? "green"
              : "blue"
          }
        >
          {record.election?.status}
        </Tag>
      ),
    },
    {
      title: "Conducted By",
      dataIndex: "conductedBy",
      key: "conductedBy",
      render: (text, record) => record.election?.conductedBy || "N/A",
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
  ];

  const handleEdit = (record) => {
    setSelectedCandidate(record);
    setShowEditCandidate(true);
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      setDeleteMessage(null);
      await deleteCandidate(record._id);
      setDeleteMessage("Candidate has been deleted.");
      fetchData();
    } catch (error) {
      setDeleteMessage("Error deleting the candidate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" capitalize overflow-x-scroll">
      {loading ? (
        "Loading..."
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table columns={columns} dataSource={candidates} rowKey="_id" />
      )}
      {showEditCandidate && selectedCandidate && (
        <PopUp>
          <EditCandidate
            candidate={selectedCandidate}
            setShowEditCandidate={setShowEditCandidate}
          />
        </PopUp>
      )}
    </div>
  );
};

export default CandidateTable;
