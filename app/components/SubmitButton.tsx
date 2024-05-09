import { useState, useEffect } from 'react';
import { useRouter, withRouter  } from 'next/dist/client/router'
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
    console.log("Router ready status:", router.isReady);
  }, [router]);

  useEffect(() => {
    if (router && router.isReady) {
      setRouterReady(true);
    }
  }, [router]);

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
    console.log("Router ready status:", router.isReady);
    if (router && router.isReady) {
      setRouterReady(true);
    }
  }, [router]);

  useEffect(() => {
    if (routerReady && router.isReady && userSelection.category) {
      mutate();
    }
  }, [routerReady, router.isReady, userSelection.category, mutate]);

  useEffect(() => {
    if (routerReady && router.isReady && userSelection.category && filteredData.length > 0) {
      router.push({
        pathname: '/routes/results',
        query: { filteredData: JSON.stringify(filteredData) }
      });
    }
  }, [routerReady, router.isReady, userSelection.category, filteredData, router]);

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
