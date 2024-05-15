'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useFetchData from '../hooks/useFetchData';

interface SubmitButtonProps {
  category: string;
  selectedFav: string;
  selectedDate: Date;
  selectedCity: string;
  selectedFree: string;
}


const SubmitButton: React.FC<SubmitButtonProps> = ({ category, selectedFav, selectedDate, selectedCity, selectedFree }) => {
  const router = useRouter();

  const { routerReady: queryRouterReady, userSelection: queryUserSelection, filteredData: queryFilteredData } = query;

  const [routerReady, setRouterReady] = useState(false);
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
  const { filteredData, isLoading, error, mutate } = useFetchData(fetchParams);

  useEffect(() => {
    console.log("Router ready status:", queryRouterReady);
    if (router) {
      setRouterReady(true);
    }
  }, [router, queryRouterReady]);

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
  
  const handleSubmit = () => {
    if (!selectedFav) {
      alert("請選擇喜好！");
      return;
    }
    
    const category = getCategory(selectedFav);
    setUserSelection(prev => ({
      ...prev,
      category,
      selectedDate,
      selectedCity,
      selectedFree,
    })); 
  };

  useEffect(() => {
    if (routerReady && userSelection.category) {
      mutate();
    }
  }, [routerReady, userSelection.category, mutate]);

  useEffect(() => {
    if (routerReady && queryUserSelection && queryFilteredData && queryFilteredData.length > 0) {
      router.push({
        pathname: '/routes/results',
        query: { filteredData: JSON.stringify(queryFilteredData) }
      });
    }
  }, [routerReady, queryUserSelection, queryFilteredData, router]);

  return (
    <button 
      className='mt-6 text-center h-[48px] w-[30%] rounded-md cursor-pointer bg-gray-400 hover:bg-gray-500'
      onClick={handleSubmit}
    >
      <h3 className="text-white">出發！</h3>
    </button>
  );
};

export default SubmitButton;
