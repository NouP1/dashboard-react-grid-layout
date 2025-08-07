import React, { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Header from "./Components/Header/Header.jsx";
import { Spin } from "antd";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-100 to-red-50 to-150%">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Header />
          <Dashboard />
        </>
      )}
    </div>
  );
}

export default App;
