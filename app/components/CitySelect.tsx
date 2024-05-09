import { useState, useEffect } from 'react';

interface CitySelectProps {
  selectedCity: string;
  onSelectChange: (value: string) => void;
  citiesOptions: { label: string; value: string; disabled?: boolean; selected?: boolean }[];
}

const CitySelect: React.FC<CitySelectProps> = ({ selectedCity, onSelectChange, citiesOptions }) => {
  const [localSelectedCity, setLocalSelectedCity] = useState<string>('');
  
  useEffect(() => {
    setLocalSelectedCity(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "全台跑透透") {
      onSelectChange(''); // 清除前一個選擇的狀態
    } else {
      setLocalSelectedCity(selectedValue);
      onSelectChange(selectedValue); 
    }
  };

  return (
    <select
      className='text-center h-[48px] w-[40%] rounded-md border-2 border-gray-200 cursor-pointer focus:bg-gray-100'
      value={localSelectedCity}
      onChange={handleCityChange}
    >
      {citiesOptions.map((city) => (
        <option
          key={city.value}
          value={city.value}
          disabled={city.disabled}
        >
          {city.label}
        </option>
      ))}
    </select>
  );
};

export default CitySelect;
