interface CardProps {
  title: string;
  count: number;
}

const Card: React.FC<CardProps> = ({ title, count }) => {
  return (
    <div className="w-[300px] h-38 border-2 border-black rounded-sm p-3">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm">Nombre de récompenses : {count}</p>
    </div>
  );
};

export default Card;
