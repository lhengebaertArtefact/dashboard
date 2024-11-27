import React from "react";

interface infoCardsProps {
  infosCards?: Record<string, any>[];
  indexCards?: number;
  terminalName?: string;
}

const Card: React.FC<infoCardsProps> = ({
  infosCards,
  indexCards,
  terminalName,
}) => {
  if (!infosCards || !indexCards || !terminalName) {
    return <div></div>;
  }
  const cardValue =
    terminalName &&
    indexCards &&
    infosCards[indexCards - 1]?.[terminalName.toLowerCase()];

  const cards = Object.values(cardValue);

  console.log(cards);
  return (
    <div className="flex flex-wrap gap-6 px-4 py-6">
      {cards?.map((card: any, index: number) => {
        return (
          <div
            key={index}
            className=" justify-between bg-white shadow-lg rounded-lg border border-gray-300 p-5 w-[300px]"
          >
            <p className="text-lg font-semibold text-gray-800 mb-4">{card}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
