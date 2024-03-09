import Input from "./common/Input";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Select from "./common/Select";

// Spot states options
const SPOT_STATES = [
  { value: 0, text: "Libre" },
  { value: 1, text: "Occupé" },
];

/**
 * Props for the TableFilters component.
 * @typedef {Object} TableFiltersProps
 * @property {string} searchQuery - The search query for filtering spots by number.
 * @property {number} floorFilter - The floor filter for filtering spots by floor.
 * @property {number} stateFilter - The state filter for filtering spots by occupancy.
 * @property {(value: string) => void} setSearchQuery - Function to set the search query.
 * @property {(value: number) => void} setFloorFilter - Function to set the floor filter.
 * @property {(value: number) => void} setStateFilter - Function to set the state filter.
 */
interface TableFiltersProps {
  searchQuery: string;
  floorFilter: number;
  stateFilter: number;
  setSearchQuery: (value: string) => void;
  setFloorFilter: (value: number) => void;
  setStateFilter: (value: number) => void;
}

/**
 * TableFilters component.
 */
function TableFilters({
  searchQuery,
  floorFilter,
  stateFilter,
  setSearchQuery,
  setFloorFilter,
  setStateFilter,
}: TableFiltersProps) {
  // Get the available floors from the store
  const floors = useSelector((state: RootState) => state.parking.floors);
  // Generate unique IDs for input fields
  const floorSelectId = React.useId();
  const numberSearchId = React.useId();
  const stateSelectId = React.useId();

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-1 flex-grow">
        <label htmlFor={numberSearchId} className="text-xs font-semibold">
          Place
        </label>
        <div className="text-sm mb-3 flex relative">
          <Input
            id={numberSearchId}
            type="text"
            width="w-full"
            placeholder="Numéro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery ? (
            <button
              className="clear-input-button font-bold text-gray-500 p-1 absolute right-1.5 top-1/2 -translate-y-1/2 bg-white"
              onClick={() => setSearchQuery("")}
              aria-label="Clear input"
              title="Clear input"
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={floorSelectId} className="text-xs font-semibold">
          Étage
        </label>
        <Select
          id={floorSelectId}
          value={floorFilter}
          options={floors}
          onChange={(e: any) => setFloorFilter(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={stateSelectId} className="text-xs font-semibold">
          État
        </label>
        <Select
          id={stateSelectId}
          value={stateFilter}
          options={SPOT_STATES}
          onChange={(e: any) => setStateFilter(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}

export default TableFilters;
