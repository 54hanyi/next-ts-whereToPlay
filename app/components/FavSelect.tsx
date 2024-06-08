import React, { useState, useEffect } from 'react';

interface FavSelectProps {
  onSelectChange: (value: string) => void;
  favOptions: { label: string; value: string; disabled?: boolean; selected?: boolean }[];
  selected: string;
  required?: boolean;
}

const FavSelect: React.FC<FavSelectProps> = ({ onSelectChange, favOptions, selected }) => {
  const [localSelectedFav, setLocalSelectedFav] = useState<string>('');

  const handleFavChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setLocalSelectedFav(selectedValue);
    onSelectChange(selectedValue);
  };

  useEffect(() => {
    setLocalSelectedFav(selected);
  }, [selected]);

  return (
    <>
      <div className='w-[40%]'>
        <div>
          <p>您的喜好</p>
        </div>
        <select
          className='text-center h-[48px] w-[100%] rounded-md border-2 border-gray-200 cursor-pointer focus:bg-gray-100'
          value={localSelectedFav}
          onChange={handleFavChange}
        >
          {favOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FavSelect;
