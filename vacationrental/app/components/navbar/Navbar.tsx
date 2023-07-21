import Container from "../Container";

const Navbar = () => {
  return (
    <div className="bg-teal-500 h-40 fixed z-10 w-full">
      <div className="py-5 border-b-2">
        <Container>
          <div>hello</div>
        </Container>
      </div>
      <div className="py-5 border-b-2"> I am navbar bottom</div>
    </div>
  );
};

export default Navbar;
