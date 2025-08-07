import React, { useState } from "react";
import { Card, Tag, Input } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";

const { Search } = Input;

const projects = [
  {
    name: "Ritz Carlton Paris",
    completionDate: "April 11, 2025",
    warrantyDate: "April 13, 2025",
    director: "Orlando Diggs",
    initials: "OD",
  },
  {
    name: "Conversion from Sheraton to Paris",
    completionDate: "April 6, 2025",
    warrantyDate: "April 7, 2025",
    director: "Drew Cano",
    initials: "DC",
  },
];

const TaskProject = () => {
  const [query, setQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        maxHeight: 200,
        overflowY: "auto",
        paddingRight: 8,
        scrollbarWidth: "thin",
      }}
      className="custom-scrollbar "
    >
      <Search
        placeholder="Search by project name"
        size="small"
        allowClear
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredProjects.map((project, index) => (
        <Card
          key={index}
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{project.name}</span>
              <Tag color="blue" className="text-sm">
                {project.initials}
              </Tag>
            </div>
          }
          className="rounded-xl shadow-md"
          variant="outlined"
          size="small"
          style={{ margin: 10 }}
        >
          <div className="text-sm space-y-1">
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <span className="text-gray-700">Completion:</span>
              <span>{project.completionDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <span className="text-gray-700">Warranty Expiry:</span>
              <span>{project.warrantyDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserOutlined />
              <span className="text-gray-700">Project Director:</span>
              <span>{project.director}</span>
            </div>
          </div>
        </Card>
      ))}

      {filteredProjects.length === 0 && (
        <div className="text-gray-500 text-sm text-center pt-4">
          No matching projects found.
        </div>
      )}
    </div>
  );
};

export default TaskProject;
