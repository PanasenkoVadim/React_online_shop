import Select from "react-select";
import "./CustomSelect.scss";

export default function CustomSelect({
  options,
  selectedOption,
  setSelectedOption,
}) {
  const getValue = () => {
    return selectedOption
      ? options.find((option) => option.value === selectedOption)
      : "";
  };
  const onSelectChange = (newValue) => {
    setSelectedOption(newValue.value);
  };
  return (
    <>
      <Select
        className={"react-select"}
        classNamePrefix={"react-select__inner"}
        isSearchable={false}
        onChange={onSelectChange}
        value={getValue()}
        options={options}
        placeholder={"Выберите размер"}
      />
    </>
  );
}
