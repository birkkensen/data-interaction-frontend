import { AiOutlineSearch } from "react-icons/ai";
import { useState, Dispatch, SetStateAction } from "react";
interface Props {
  setSearch: Dispatch<SetStateAction<string>>;
}
const Filter: React.FC<Props> = ({ setSearch }): JSX.Element => {
  const [formData, setFormData] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSearch(formData);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData(e.target.value);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-1 relative rounded-full shadow-md flex items-center"
      >
        <input
          type="text"
          name="search"
          id="search"
          value={formData}
          onChange={handleChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border-gray-300 rounded-full"
          placeholder="Search..."
        />
        <button type="submit">
          <AiOutlineSearch className="absolute text-lg top-2 right-2" />
        </button>
      </form>
    </>
  );
};

export default Filter;
