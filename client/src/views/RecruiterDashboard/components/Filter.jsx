import { Search } from "lucide-react";
import { useFilterStore } from "../../../store/useFilterStore";
export const Filter = ({ searchInput, setSearchInput }) => {
	return (
		<div className="flex gap-4 items-center bg-white rounded-lg p-4">
			{/*  search text input */}
			<div className={`relative flex-1 max-w-lg`}>
				<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<Search className="w-[18px] h-[18px] text-blue-300" />
				</div>
				<input
					type="text"
					placeholder="Job title, Keyword..."
					className="w-full focus:ring-0! pl-11 py-3 rounded-sm text-sm placeholder-gray-400 focus:outline-none border border-[#E4E5E8] hover:border-[#0A65CC] focus:border-[#0A65CC]"
					onChange={(e) => setSearchInput(e.target.value)}
					value={searchInput}
				/>
			</div>
		</div>
	);
};
