'use client'

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { EventData, FilteredEventData } from '../interface/dataType';

interface SubmitButtonProps {
  selectedFav: string;
  selectedDate: Date;
  selectedCity: string;
  selectedFree: string;
  onFetchSuccess: (success: boolean, data: any) => void;
  setSelectedFav: (value: string) => void;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const mapEventData = (data: EventData[]): FilteredEventData[] => {
  return data.map((item: EventData) => {
    const { title, descriptionFilterHtml } = item;
    const { time, location, price, endTime, locationName } = item.showInfo[0];
    return {
      title,
      descriptionFilterHtml,
      time,
      location,
      price,
      endTime,
      locationName,
    };
  });
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ selectedFav, selectedDate, selectedCity, selectedFree, onFetchSuccess, setSelectedFav }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data, error: swrError } = useSWR(url, fetcher);

  const filterData = (data: FilteredEventData[]): FilteredEventData[] => {
    const selectedDateTimestamp = selectedDate.getTime();
    console.log("Filtering Data:");
    console.log("Selected Date Timestamp:", selectedDateTimestamp);
    console.log("Selected City:", selectedCity);
    console.log("Selected Free:", selectedFree);

    return data.filter((item: FilteredEventData) => {
      const { time, endTime, location, price } = item;
      const itemStartTime = new Date(time).getTime();
      const itemEndTime = new Date(endTime).getTime();
      const locationRegex = /([\u4e00-\u9fa5]+?[縣|市])/;
      const cityMatch = location.match(locationRegex);
      const itemCity = cityMatch && cityMatch[1] ? cityMatch[1] : "其他";
      const isFreeSelected = selectedFree === '不要';
      const isNotFreeSelected = selectedFree === '要';
      const isAllSelected = selectedFree === '都可以';
      const isDateMatch = selectedDateTimestamp >= itemStartTime && selectedDateTimestamp <= itemEndTime;
      const isCityMatch = !selectedCity || itemCity === selectedCity;
      const isPriceMatch = ((isFreeSelected && (price.includes('免費') || price === '')) ||
          (isNotFreeSelected && !price.includes('免費') && price !== '') ||
          isAllSelected);

      // 添加调试信息
      console.log(`Event: ${item.title}`);
      console.log(`Time: ${new Date(time)} - ${new Date(endTime)}`);
      console.log(`Location: ${itemCity}`);
      console.log(`Price: ${price}`);
      console.log(`isDateMatch: ${isDateMatch}`);
      console.log(`isCityMatch: ${isCityMatch}`);
      console.log(`isPriceMatch: ${isPriceMatch}`);
      console.log(`Matches: ${isDateMatch && isCityMatch && isPriceMatch}`);

      return isDateMatch && isCityMatch && isPriceMatch;
    });
  };

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
        // alert("請選擇喜好！");
        return '6';
    }
  };

  useEffect(() => {
    if (data) {
      console.log('Fetched Data:', data); // 调试信息
      const mappedData = mapEventData(data);
      console.log('Mapped Data:', mappedData); // 调试信息
      const filteredItems = filterData(mappedData);
      console.log('Filtered Items:', filteredItems); // 调试信息
      onFetchSuccess(true, filteredItems);
      setIsLoading(false);
    }
  }, [data, onFetchSuccess]);

  useEffect(() => {
    if (swrError) {
      console.error('SWR Error:', swrError); // 调试信息
      setError(swrError.message || '發生錯誤');
      setIsLoading(false);
      onFetchSuccess(false, []);
    }
  }, [swrError, onFetchSuccess]);

  const handleSubmit = async () => {
    // if (!selectedFav) {
    //   setSelectedFav("展覽");
    //   return;
    // }

    setValidationError(null);
    setIsLoading(true);
    setError(null);

    const category = getCategory(selectedFav || '展覽');
    const baseURL = 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=';
    const fullURL = `${baseURL}${category}`;

    setUrl(fullURL);

    console.log('Request URL:', fullURL);
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
      {validationError && (
        <p className="mt-2 text-red-600">{validationError}</p>
      )}
      {error && <p className="mt-2 text-red-600">發生錯誤: {error}</p>}
    </>
  );
};

export default SubmitButton;
