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
    <div className="flex flex-wrap">
      {cards?.map((card: any) => {
        return (
          <div className="w-[300px] h-38 border-2 border-black rounded-sm p-3">
            {card}
          </div>
        );
      })}
    </div>
  );
};

export default Card;
