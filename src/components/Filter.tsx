import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
const Filter = () => {
  const [formData, setFormData] = useState<{ search: string }>({
    search: "",
  });

  const { search } = formData;
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
          value={search}
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
