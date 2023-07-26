import { IconType } from "react-icons";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (a: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected = false,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        group
        relative
        flex
        flex-row
        items-center
        justify-center
        p-2
        hover:bg-neutral-100
        transition
        cursor-pointer
        rounded-lg
        ${selected ? "bg-neutral-100" : "bg-white"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}
    >
      <Icon
        size={25}
        className={`
          absolute 
          left-2 
          }
          `}
      />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
