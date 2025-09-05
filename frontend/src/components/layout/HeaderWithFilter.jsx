import { useState } from "react";
import { IoCloseOutline, IoFilterOutline } from "react-icons/io5";
import { POLL_TYPES } from "../../utils/data";

export default function HeaderWithFilter({ title, filterType, setFilterType }) {
    const [open, setOpen] = useState(false);

    const handleMainButtonClick = () => {

        if (filterType !== "") {
            setFilterType("");
            setOpen(false);
        } else {
            setOpen(!open);
        }
    };

    const handleFilterSelection = (value) => {
        setFilterType(value);
        setOpen(false);
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                <h1 className="sm:text-xl font-medium text-black">{title}</h1>

                <button
                    className={`flex items-center gap-3 text-sm text-white bg-blue-400 px-4 py-3 ${
                        open ? "rounded-t-lg" : "rounded-lg"
                    }`}
                    onClick={handleMainButtonClick}
                >
                    {filterType !== "" ? (
                        <>
                            <IoCloseOutline className="text-lg" />
                            Clear
                        </>
                    ) : (
                        <>
                            <IoFilterOutline className="text-lg" />
                            Filter
                        </>
                    )}
                </button>
            </div>

            {open && (
    
                <div className="absolute top-full right-0 z-10 mt-1 flex flex-col items-start gap-2 rounded-lg border bg-white p-2 shadow-lg">
        
                    {[{ label: "All", value: "" }, ...POLL_TYPES].map((type) => (
                        <button
                            key={type.value}
                            className={`w-full text-left text-sm px-4 py-2 rounded-md transition-colors ${
                                filterType === type.value
                                    ? "text-white bg-blue-500"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => handleFilterSelection(type.value)}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )}
