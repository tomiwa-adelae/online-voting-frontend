import React, { useState } from "react";
import { Table, Tag, Input, Select, DatePicker, Button } from "antd";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const TableUi = ({ columns, data, onRowClick }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({});
  const [dateRange, setDateRange] = useState([]);

  const applyFilters = () => {
    let filtered = data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(item[key]).toLowerCase().includes(value.toLowerCase());
      });
    });

    if (dateRange.length === 2) {
      filtered = filtered.filter((item) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= new Date(dateRange[0]) &&
          createdAtDate <= new Date(dateRange[1])
        );
      });
    }

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilters({});
    setDateRange([]);
    setFilteredData(data);
  };

  return (
    <div className="mt-4 p-2" style={{ zIndex: 0 }}>
      <div className="mb-3 grid grid-cols-2 md:grid-cols-3 gap-2 xl:flex float-right">
        {columns.map((column) => (
          <div key={column.dataIndex}>
            {column.filterType === "select" && column.options ? (
              <>
                <div className="text-xs">{column.title}</div>
                <Select
                  placeholder={`Select ${column.title}`}
                  value={filters[column.dataIndex]}
                  onChange={(value) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      [column.dataIndex]: value,
                    }))
                  }
                  className="w-full xl:w-[150px]"
                  onSelect={applyFilters}
                >
                  {column.options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </>
            ) : column.filterType === "input" ? (
              <>
                <div className="text-xs">{column.title}</div>
                <Input
                  placeholder={`Filter ${column.title}`}
                  value={filters[column.dataIndex]}
                  onChange={(e) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      [column.dataIndex]: e.target.value,
                    }))
                  }
                  onPressEnter={applyFilters}
                />
              </>
            ) : null}
          </div>
        ))}
        <div className="">
          <div className="text-xs">Created At</div>
          <RangePicker
            className="w-full xl:w-[150px]"
            value={
              dateRange.length === 2
                ? [moment(dateRange[0]), moment(dateRange[1])]
                : []
            }
            onChange={(dates, dateStrings) => setDateRange(dateStrings)}
            onCalendarChange={(dates, dateStrings) => setDateRange(dateStrings)}
          />
        </div>
        <div className="">
          <div className="text-xs">Search</div>
          <div className="flex gap-2">
            <Input.Search
              placeholder="Search"
              style={{ width: 200 }}
              onChange={(e) =>
                setFilters({ ...filters, searchText: e.target.value })
              }
              onSearch={applyFilters}
            />
            <Button onClick={handleReset} type="default">
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="">
        <Table
          columns={columns.map((column) => ({
            ...column,
            filterDropdown: null,
            render: (text, record) => {
              if (column.dataIndex === "image") {
                return (
                  <div className="image-container">
                    <img
                      src={record[column.dataIndex]}
                      alt="Movie"
                      className="small-image w-[100px]"
                    />
                  </div>
                );
              } else if (column.dataIndex === "time" && column.button) {
                return column.button(record);
              } else if (column.dataIndex in record && column.options) {
                const option = column.options.find(
                  (opt) => opt.value === record[column.dataIndex]
                );
                if (option && option.tag) {
                  return <Tag color={option.tag}>{text}</Tag>;
                }
              }
              return text;
            },
          }))}
          dataSource={filteredData}
          rowKey={(record) => record.id}
          onRow={
            onRowClick
              ? (record) => ({ onClick: () => onRowClick(record) })
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default TableUi;
