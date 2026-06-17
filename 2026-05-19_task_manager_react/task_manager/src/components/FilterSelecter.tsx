interface SelectFilterProps {
  filterType: "all" | "active" | "completed";
  setFilterType: (filter: "all" | "active" | "completed") => void;
}

function SelectFilter({ filterType, setFilterType }: SelectFilterProps) {
  return (
    <select value={filterType} onChange={(e) => setFilterType(e.target.value as "all" | "active" | "completed")}>
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  );
}

export default SelectFilter;