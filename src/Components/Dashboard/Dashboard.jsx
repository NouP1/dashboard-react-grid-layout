import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import WidgetManager from "../Widjets/WidjetManager";
import WidgetGrid from "../Widjets/WidjetGrid";
import { useWidgets } from "../Widjets/useWidjets";
import { defaultWidgets } from "./defaultWidjets";

const Dashboard = () => {
  const [editMode, setEditMode] = useState(false);
  const {
    activeWidgets,
    layout,
    setLayout,
    toggleWidget,
    resetWidgets,
    saveWidgets,
  } = useWidgets();

  return (
    <div className="px-24 py-12 relative">
      <div className="bg-white rounded shadow p-4 rounded-xl">
        <DashboardHeader
          editMode={editMode}
          setEditMode={setEditMode}
          onSave={() => {
            saveWidgets();
            setEditMode(false);
          }}
          onCancel={() => {
            resetWidgets();
            setEditMode(false);
          }}
        />
      </div>

      {editMode && (
        <WidgetManager
          defaultWidgets={defaultWidgets}
          activeWidgets={activeWidgets}
          toggleWidget={toggleWidget}
        />
      )}

      <WidgetGrid
        activeWidgets={activeWidgets}
        defaultWidgets={defaultWidgets}
        setEditMode={setEditMode}
        editMode={editMode}
        layout={layout}
        onLayoutChange={(currentLayout, allLayouts) => {
          setLayout(allLayouts);
        }}
        isDraggable={editMode}
        onRemoveWidget={(key) => toggleWidget(key)}
      />
    </div>
  );
};

export default Dashboard;
