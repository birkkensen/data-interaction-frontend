interface IProps {
  title: string;
}

const DisabledBtn: React.FC<IProps> = ({ title }): JSX.Element => {
  return (
    <button disabled={true} className="w-full py-3 bg-gray-300 rounded-md text-white">
      {title}
    </button>
  );
};

export default DisabledBtn;
