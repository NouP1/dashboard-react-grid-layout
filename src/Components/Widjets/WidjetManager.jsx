import React, { useState } from "react";
import { Input, Card, Button } from "antd";
import { icon } from "../Dashboard/defaultWidjets";
const { Search } = Input;

const WidgetManager = ({ defaultWidgets, activeWidgets, toggleWidget }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWidgets = defaultWidgets.filter((widget) =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-0 mt-4 p-5 border rounded-xl bg-gray-50 border-none">
      <h3 className="font-semibold mb-4 text-lg">Manage Widgets</h3>

      <Search
        placeholder="Search widgets"
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <div
        style={{
          maxHeight: 200,
          overflowY: "auto",
          paddingRight: 8,
          scrollbarWidth: "thin",
        }}
        className="custom-scrollbar"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredWidgets.map((widget) => (
            <Card
              key={widget.key}
              size="small"
              className={`shadow-sm ${
                activeWidgets.includes(widget.key)
                  ? "border-blue-400 bg-blue-50"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-lg mb-1 text-blue-400">{icon}</div>
                  <span className="text-center text-sm font-medium">
                    {widget.name}
                  </span>
                </div>
                <Button
                  type={
                    activeWidgets.includes(widget.key) ? "default" : "primary"
                  }
                  size="small"
                  onClick={() => toggleWidget(widget.key)}
                >
                  {activeWidgets.includes(widget.key) ? "Remove" : "Add"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetManager;
