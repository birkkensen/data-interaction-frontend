interface IProps {
  title: string;
  onClick?: () => {};
}

const BtnFullWidth: React.FC<IProps> = ({ title, onClick }): JSX.Element => {
  return (
    <button onClick={onClick} className="py-3 bg-cyan-600 rounded-md text-white w-full">
      {title}
    </button>
  );
};

export default BtnFullWidth;
