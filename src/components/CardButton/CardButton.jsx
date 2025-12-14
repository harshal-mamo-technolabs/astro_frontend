const CardButton = ({ children, type, onClick, name }) => {
  return (
    <button
      type={type}
      className={`w-full rounded-full font-nunito-light text-white font-light text-xl p-2 bg-gradient-to-r from-purple-600 to-indigo-700 ${
        name === "Synastry" && "relative bottom-3"
      } ${name==="Natal Chart" && "relative top-1"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CardButton;
