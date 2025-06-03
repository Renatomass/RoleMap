import logo from "../assets/LOGO.svg";

export default function LogoMarca() {
  return (
    <div className="relative flex w-80 text-white justify-end mt-10">
         <h1 className="-mr-10 text-left text-8xl font-bold mb-10 leading-18">
          Rolê
          <br />
          Map
        </h1>
      <img
        src={logo}
        alt="Logo App"
        className="absolute bottom-50% w-30 right-46 md:w-30 drop-shadow-xl "
      />
    </div>
  );
}
