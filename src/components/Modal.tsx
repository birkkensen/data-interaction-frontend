import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
interface IProps {
  name: string | undefined;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<IProps> = ({ name, open, setIsOpen }): JSX.Element => {
  const [timer, setTimer] = useState<number>(2);
  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
        if (timer < 0) {
          setIsOpen(false);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [open, setIsOpen, timer]);

  return (
    <div
      className={`flex items-center justify-between absolute bottom-3 left-3 py-4 px-8  w-auto bg-green-100 rounded-lg text-green-800 ${
        open ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center">
        <AiFillCheckCircle className="text-xl mr-4 text-green-600" /> Added{" "}
        <b>&nbsp;{name}&nbsp;</b> to cart
      </div>
      <AiOutlineCloseCircle
        className="text-xl cursor-pointer ml-4"
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default Modal;
