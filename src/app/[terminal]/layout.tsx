import React from "react";

const Terminallayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { terminal: string };
}) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full min-h-screen backdrop-blur-sm bg-black/20">
        <div className="relative w-full min-h-screen overflow-x-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Terminallayout;
