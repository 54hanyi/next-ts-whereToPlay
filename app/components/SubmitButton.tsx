'use client'

import { useState, useEffect } from 'react';
import useFetchData from '../hooks/useFetchData';

interface SubmitButtonProps {
  category: string;
  selectedFav: string;
  selectedDate: Date;
  selectedCity: string;
  selectedFree: string;
  onFetchSuccess: (success: boolean, data: any) => void;
}


const SubmitButton: React.FC<SubmitButtonProps> = ({ category, selectedFav, selectedDate, selectedCity, selectedFree, onFetchSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userSelection, setUserSelection] = useState({
    selectedDate: selectedDate,
    selectedCity: selectedCity,
    selectedFree: selectedFree,
    category: category,
  });

  const fetchParams = {
    ...userSelection,
    category: userSelection.category ? userSelection.category : null,
  };
  const { filteredData, error, mutate } = useFetchData(fetchParams);

  const getCategory = (selectedFav: string): string => {
    switch (selectedFav) {
      case '展覽':
        return '6'; 
      case '講座':
        return '7';
      case '音樂表演':
        return '1';
      case '戲劇表演':
        return '2';
      case '舞蹈表演':
        return '3';
      case '綜藝活動':
        return '11';
      case '親子活動':
        return '4';
      case '其他藝文活動':
        return '15';
      default:
        alert("請選擇喜好！");
        return '';
    };
  };
  
  const handleSubmit = async () => {
    if (!selectedFav) {
      alert("請選擇喜好！");
      return;
    }

    setIsLoading(true);

    const category = getCategory(selectedFav);
    setUserSelection(prev => ({
      ...prev,
      category,
      selectedDate,
      selectedCity,
      selectedFree,
    }));

    await mutate();
    setIsLoading(false);

    if (filteredData && filteredData.length > 0) {
      onFetchSuccess(true, filteredData);
      console.log(filteredData);
    } else {
      onFetchSuccess(false, []);
    }
  };

  return (
    <>
      <button 
        className='mt-6 text-center h-[48px] w-[30%] rounded-md cursor-pointer bg-gray-400 hover:bg-gray-500'
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center text-white">
            努力尋找中...
          </div>
        ) : (
          <h3 className="text-white">出發！</h3>
        )}
      </button>
      {error && <p className="mt-2 text-red-600">發生錯誤: {error.message}</p>}
    </>
  );
};

export default SubmitButton;
