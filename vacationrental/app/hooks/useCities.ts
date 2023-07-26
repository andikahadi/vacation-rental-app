const baliCities = [
  {
    label: "Kuta",
    region: "South Bali",
    latlng: [-8.739184, 115.171127],
  },
  {
    label: "Denpasar",
    region: "South Bali",
    latlng: [-8.6705, 115.2126],
  },
  {
    label: "Uluwatu",
    region: "South Bali",
    latlng: [-8.83143, 115.08702],
  },
  {
    label: "Canggu",
    region: "South Bali",
    latlng: [-8.6478, 115.1385],
  },
  {
    label: "Jimbaran",
    region: "South Bali",
    latlng: [-8.7907, 115.1593],
  },
];

const useCities = () => {
  const getAll = () => baliCities;

  const getByName = (label: string) => {
    return baliCities.find((item) => item.label == label);
  };

  return {
    getAll,
    getByName,
  };
};

export default useCities;
