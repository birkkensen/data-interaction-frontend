import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="p-10 text-gray-500 flex flex-col md:items-center md:flex-row md:justify-between">
      <p className="mb-6">&copy; 2022 Company, Inc. All rights reserved</p>
      <div className="flex gap-x-4">
        <BsFacebook />
        <BsInstagram />
        <BsLinkedin />
        <BsTwitter />
      </div>
    </footer>
  );
};

export default Footer;
