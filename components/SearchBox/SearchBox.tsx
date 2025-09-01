import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (newSearchQuery: string) => void;
  categoryId?: string;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div>
      <input
        className={css.input}
        value={value}
        onChange={handleChange}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
}
