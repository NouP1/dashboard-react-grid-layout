import { useState } from "react";

const LAYOUT_KEY = "dashboard-layout";
const WIDGETS_KEY = "dashboard-widgets";

export const useWidgets = (setEditMode) => {
  const getSavedData = (key, defaultValue) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Ошибка при чтении из localStorage для ключа ${key}:`, e);
      return defaultValue;
    }
  };

  const savedWidgets = getSavedData(WIDGETS_KEY, []);
  const savedLayout = getSavedData(LAYOUT_KEY, { lg: [] });

  const [activeWidgets, setActiveWidgets] = useState(savedWidgets);
  const [layoutState, setLayoutState] = useState(savedLayout);
  const [isEditing, setIsEditing] = useState(false);

  const [prevWidgets, setPrevWidgets] = useState(null);
  const [prevLayout, setPrevLayout] = useState(null);

  const setLayout = (newLayout) => {
    setLayoutState(newLayout);
    if (!isEditing) {
      try {
        localStorage.setItem(LAYOUT_KEY, JSON.stringify(newLayout));
      } catch (e) {
        console.error("Ошибка при сохранении layout:", e);
      }
    }
  };

  const toggleWidget = (key) => {
    setActiveWidgets((prev) => {
      const isAdding = !prev.includes(key);
      const updated = isAdding ? [...prev, key] : prev.filter((k) => k !== key);
      const currentLayout = layoutState?.lg || [];
      const defaultHeight = 5;

      if (isAdding) {
        const alreadyExists = currentLayout.some((item) => item.i === key);
        if (!alreadyExists) {
          const newItem = {
            i: key,
            x: 0,
            y: 0,
            w: 5,
            h: defaultHeight,
          };
          const shifted = currentLayout.map((item) => ({
            ...item,
            y: item.y + defaultHeight,
          }));
          const newLayout = {
            lg: [newItem, ...shifted],
          };
          setLayout(newLayout);
        }
      } else {
        const filteredLayout = {
          lg: currentLayout.filter((item) => item.i !== key),
        };
        setLayout(filteredLayout);
      }

      return updated;
    });
  };

  const startEditing = () => {
    console.log("EDIT MODE STARTED");
    setPrevWidgets(activeWidgets);
    setPrevLayout(layoutState);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (prevWidgets && prevLayout) {
      setActiveWidgets(prevWidgets);
      setLayoutState(prevLayout);
    }
    setIsEditing(false);
  };

  const applyChanges = () => {
    try {
      localStorage.setItem(WIDGETS_KEY, JSON.stringify(activeWidgets));
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(layoutState));
    } catch (e) {
      console.error("Ошибка при сохранении данных в localStorage:", e);
    }
    setIsEditing(false);
  };

  const resetWidgets = () => {
    const widgets = getSavedData(WIDGETS_KEY, []);
    const layout = getSavedData(LAYOUT_KEY, { lg: [] });
    setActiveWidgets(widgets);
    setLayoutState(layout);
  };

  return {
    activeWidgets,
    layout: layoutState,
    setLayout,
    toggleWidget,
    resetWidgets,
    saveWidgets: applyChanges,
    getSavedData,
    isEditing,
    setIsEditing,
    startEditing,
    cancelEditing,
    applyChanges,
  };
};
