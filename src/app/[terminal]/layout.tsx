import React from "react";

const Terminallayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { terminal: string };
}) => {
  return <div>{children}</div>;
};

export default Terminallayout;
