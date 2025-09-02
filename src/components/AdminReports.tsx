import React from "react";

interface AdminReportProps {
  title: string;
  value?: number | string;
  children?: React.ReactNode;
}

const AdminReport: React.FC<AdminReportProps> = ({ title, value, children }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <h3 className="text-lg font-semibold">{title}</h3>
      {value !== undefined ? (
        <p className="text-3xl mt-2">{value}</p>
      ) : (
        children
      )}
    </div>
  );
};

export default AdminReport;
