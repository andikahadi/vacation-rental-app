"use client";

import useCities from "@/app/hooks/useCities";
import Select from "react-select";

export type CitySelectData = {
  label: string;
  latlng: number[];
  region: string;
};

interface CitySelectProps {
  value?: CitySelectData;
  onChange: (cityData: CitySelectData) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCities();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CitySelectData)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            {option.label},
            <span className="text-neutral-500 ml-1">{option.region}</span>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffdb91",
          },
        })}
      />
    </div>
  );
};

export default CitySelect;
