import { useState, useEffect } from 'react';

interface FreeSelectProps {
  selectedFree: string;
  onSelectChange: (value: string) => void;
  required?: boolean;
}

const FreeSelect: React.FC<FreeSelectProps> = ({ selectedFree, onSelectChange }) => {
  const [localSelectedFree, setLocalSelectedFree] = useState<string>('');
  
  useEffect(() => {
    setLocalSelectedFree(selectedFree);
  }, [selectedFree]);

  const handleFreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setLocalSelectedFree(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <select
      className='text-center h-[48px] w-[40%] rounded-md border-2 border-gray-200 cursor-pointer focus:bg-gray-100'
      value={localSelectedFree}
      onChange={handleFreeChange}
    >
      <option value="" disabled>是否免費</option>
      <option value="是">是</option>
      <option value="不是">不是</option>
      <option value="都可以">都可以</option>
    </select>
  );
};

export default FreeSelect;
