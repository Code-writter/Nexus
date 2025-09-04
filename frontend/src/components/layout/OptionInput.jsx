import { useState } from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";

export default function OptionList({ optionList, setOptionList }) {
  const [option, setOption] = useState("");

  const handleAddOption = (e) => {
    // Fix: Use a form event to prevent page refresh on submit
    e.preventDefault();
    const trimmedOption = option.trim();

    // Fix: Add a check to prevent adding duplicate options (case-insensitive)
    const isDuplicate = optionList
      .map((opt) => opt.toLowerCase())
      .includes(trimmedOption.toLowerCase());

    // Fix: Logic is now consistent. Add if:
    // 1. Input is not empty
    // 2. It's not a duplicate
    // 3. The list has fewer than 5 items
    if (trimmedOption && !isDuplicate && optionList.length < 5) {
      setOptionList([...optionList, trimmedOption]);
      setOption(""); // Clear input after successful add
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArray = optionList.filter((_, idx) => idx !== index);
    setOptionList(updatedArray);
  };

  return (
    <div>
      {optionList.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-200/50 px-4 py-2 rounded-md mb-3"
        >
          {/* Fix: Display the actual 'item' from the list instead of hardcoded text */}
          <p className="text-xs font-medium text-black">{item}</p>

          <button onClick={() => handleDeleteOption(index)}>
            <HiOutlineTrash className="text-red-500 text-lg" />
          </button>
        </div>
      ))}

      {optionList.length < 5 && (
        // Fix: Use a <form> for better accessibility and to allow submission with the Enter key
        <form
          onSubmit={handleAddOption}
          className="flex items-center gap-5 mt-4"
        >
          <input
            type="text"
            placeholder="Enter Option"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-black text-[13px] outline-none bg-gray-200/80 px-3 py-[6px] rounded-md"
          />
          <button type="submit" className="btn-small text-nowrap py-1.5">
            <HiPlus className="text-lg" /> Add Option
          </button>
        </form>
      )}
    </div>
  );
}