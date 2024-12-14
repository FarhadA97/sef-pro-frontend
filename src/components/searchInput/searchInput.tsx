import React, { useState, useRef, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchBar: React.FC = () => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<HTMLDivElement>(null);

    // Close the input field when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={inputRef}
            className={`relative flex items-center bg-gray-100 rounded-full overflow-hidden transition-all duration-300 ${isExpanded ? "w-64" : "w-10"
                }`}
        >
            {/* Search Icon */}
            <button
                onClick={() => {
                    if(!isExpanded){
                        setIsExpanded(true)
                        return;
                    }
                    if (searchQuery.length <= 0) return
                    router.push(`/search?query=${searchQuery}`)
                }}
                className="p-2 h-full text-gray-400 hover:text-gray-800 focus:outline-none"
                aria-label="Search"
            >
                <SearchIcon size={20} />
            </button>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search..."
                className={`absolute left-10 bg-transparent outline-none text-gray-700 w-full ${isExpanded ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                        if (searchQuery.length <= 0) return
                        router.push(`/search?query=${searchQuery}`)
                    }
                }}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                onFocus={() => setIsExpanded(true)}
            />
        </div>
    );
};
