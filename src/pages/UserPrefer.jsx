import sushi from "../assets/sushi.svg";
import pizza from "../assets/pizza.svg";
import drink from "../assets/drink.svg";
import dance from "../assets/dance.svg";
import cerveja from "../assets/cerveja.svg";

export default function UserPrefer() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 text-white text-2xl">
      <div className="">
        <h1 className="font-principal font-bold text-white">Tipo de Rolê</h1>
        <div className="">
          <div>
            <img
              src={sushi}
              alt="sushi"
              className="w-96 md:w-[150px] drop-shadow-xl hover:scale-105 transition-all absolute left-3/4"
            />
          </div>
          
          <div><img
            src={cerveja}
            alt="sushi"
            className="w-96 md:w-[150px] drop-shadow-xl hover:scale-105 transition-all absolute left-3/4"
          /></div>
          <div><img
            src={drink}
            alt="sushi"
            className="w-96 md:w-[150px] drop-shadow-xl hover:scale-105 transition-all absolute left-3/4"
          /></div>
          <img
            src={dance}
            alt="sushi"
            className="w-96 md:w-[150px] drop-shadow-xl hover:scale-105 transition-all absolute left-3/4"
          />
          <img
            src={pizza}
            alt="sushi"
            className="w-96 md:w-[150px] drop-shadow-xl hover:scale-105 transition-all absolute left-3/4"
          />
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  );
}
