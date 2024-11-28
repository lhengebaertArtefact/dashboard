import React from "react";

interface infoCardsProps {
  terminal: string;
}

const Card: React.FC<infoCardsProps> = ({ terminal }) => {
  if (!terminal) {
    return <div></div>;
  }

  return (
    <div className="flex flex-wrap gap-6 px-4 py-6">
      <div className=" justify-between bg-white shadow-lg rounded-lg border border-gray-300 p-5 w-[300px]">
        <p className="text-lg font-semibold text-gray-800 mb-4">{terminal}</p>
      </div>
    </div>
  );
};

export default Card;
