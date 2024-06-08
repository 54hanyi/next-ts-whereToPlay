import { useState, useEffect } from 'react';

interface FreeSelectProps {
  selectedFree: string;
  onSelectChange: (value: string) => void;
  required?: boolean;
}

const FreeSelect: React.FC<FreeSelectProps> = ({ selectedFree, onSelectChange }) => {
  const [localSelectedFree, setLocalSelectedFree] = useState<string>('都可以');
  
  useEffect(() => {
    setLocalSelectedFree(selectedFree);
  }, [selectedFree]);

  const handleFreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setLocalSelectedFree(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <>
      <div className='w-[40%]'>
        <div>
          要不要錢
        </div>
        <select
          className='text-center h-[48px] w-[100%] rounded-md border-2 border-gray-200 cursor-pointer focus:bg-gray-100'
          value={localSelectedFree}
          onChange={handleFreeChange}
        >
          <option value="都可以">都可以</option>
          <option value="要">要</option>
          <option value="不要">不要</option>
        </select>
      </div>
    </>
  );
};

export default FreeSelect;
