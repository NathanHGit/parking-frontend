import TableFilters from "./TableFilters";
import Spot from "./Spot";
import { useEffect, useState } from "react";

/**
 * Props for the SpotTable component.
 * @typedef {Object} SpotTableProps
 * @property {string} title - The title of the spot table.
 * @property {Array} spots - The array of spots to display in the table.
 * @property {(spot: Spot, action: "book" | "cancel") => void} setModal - Function to set the modal for booking or canceling a spot.
 */
interface SpotTableProps {
  title: string;
  spots: any[];
  setModal: (spot: Spot, action: "book" | "cancel") => void;
}

/**
 * SpotTable component.
 */
function SpotTable({ title, spots, setModal }: SpotTableProps) {
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [floorFilter, setFloorFilter] = useState(-1);
  const [stateFilter, setStateFilter] = useState(-1);
  // Filtered spots array
  const [filteredSpots, setFilteredSpots] = useState<any[]>([]);

  useEffect(() => {
    // Filter spots based on search query, floor filter, and state filter
    const filteredSpots = spots.filter((spot) => {
      return (
        spot.number.toString().includes(searchQuery) &&
        (spot.floor === floorFilter || floorFilter === -1) &&
        (spot.occupied == stateFilter || stateFilter === -1)
      );
    });
    setFilteredSpots(filteredSpots);
  }, [searchQuery, floorFilter, stateFilter, spots]);

  return (
    <>
      <h3 className="mb-4 font-bold uppercase">{title}</h3>

      <TableFilters
        floorFilter={floorFilter}
        searchQuery={searchQuery}
        stateFilter={stateFilter}
        setSearchQuery={(value) => setSearchQuery(value)}
        setFloorFilter={(value) => setFloorFilter(value)}
        setStateFilter={(value) => setStateFilter(value)}
      />

      {filteredSpots.length ? (
        <div className="overflow-auto md:overflow-x-clip max-h-[300px] pr-4">
          <div className="rounded overflow-clip">
            <table className="table-auto divide-y divide-gray-300 w-full ">
              <thead className="sticky top-0 bg-slate-200 z-10">
                <tr>
                  <th className="px-2 md:px-4 py-2 text-sm whitespace-nowrap">
                    Place n°
                  </th>
                  <th className="px-2 md:px-4 py-2 text-sm">Étage</th>
                  <th className="px-2 md:px-4 py-2 text-sm">État</th>
                  <th className="px-2 md:px-4 py-2 text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {filteredSpots.map((spot) => (
                  <Spot
                    key={spot.number}
                    number={spot.number}
                    floor={spot.floor}
                    occupied={spot.occupied}
                    openModal={(action) => setModal(spot, action)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mt-4">Aucun résultat</p>
      )}
    </>
  );
}

export default SpotTable;
