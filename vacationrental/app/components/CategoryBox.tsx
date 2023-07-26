import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

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
  const router = useRouter();
  const params = useSearchParams();

  // const handleClick = () => {
  //   let currentQuery = {};

  //   if (params) {
  //     currentQuery = qs.parse(params.toString());
  //   }

  //   const updatedQuery: any = {
  //     ...currentQuery,
  //     locationCategory: label,
  //   };

  //   if (params?.get("locationCategory") == label) {
  //     delete updatedQuery.locationCategory;
  //   }

  //   const url = qs.stringifyUrl(
  //     {
  //       url: "/",
  //       query: updatedQuery,
  //     },
  //     { skipNull: true }
  //   );
  // };

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
