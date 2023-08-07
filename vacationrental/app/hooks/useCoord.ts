import Geocode from "react-geocode";

const useCoord = () => {
  //@ts-ignore
  Geocode.setApiKey(process.env.GEOCODING_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("id");

  const getByAddress = async (address: string) => {
    let res;

    await Geocode.fromAddress(address).then(
      (response) => {
        res = response.results[0].geometry.location;
        return [res.lat, res.lng];
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return {
    getByAddress,
  };
};

export default useCoord;
