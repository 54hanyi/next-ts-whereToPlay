import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { EventData, FilteredEventData } from '../interface/dataType';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const mapEventData = (data: EventData[]): FilteredEventData[] => {
  return data.map((item: EventData) => {
    const { title, sourceWebPromote } = item;
    const { time, location, price, endTime, locationName } = item.showInfo[0];
    return {
      title,
      sourceWebPromote,
      time,
      location,
      price,
      endTime,
      locationName,
    };
  });
};

const useFetchData = (
  selectedFav: string,
  selectedDate: Date,
  selectedCity: string,
  selectedFree: string,
  onFetchSuccess: (success: boolean, data: any) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data, error: swrError } = useSWR(url, fetcher);

  const filterData = useCallback((data: FilteredEventData[]): FilteredEventData[] => {
    const selectedDateTimestamp = selectedDate.getTime();

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

      return isDateMatch && isCityMatch && isPriceMatch;
    });
  }, [selectedDate, selectedCity, selectedFree]);

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
        return '6';
    }
  };

  useEffect(() => {
    if (data) {
      const mappedData = mapEventData(data);
      const filteredItems = filterData(mappedData);
      onFetchSuccess(true, filteredItems);
      setIsLoading(false);
    }
  }, [data, onFetchSuccess, filterData]);

  useEffect(() => {
    if (swrError) {
      setError(swrError.message || '發生錯誤');
      setIsLoading(false);
      onFetchSuccess(false, []);
    }
  }, [swrError, onFetchSuccess]);

  const handleSubmit = () => {
    setValidationError(null);
    setIsLoading(true);
    setError(null);

    const category = getCategory(selectedFav || '展覽');
    const baseURL = 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=';
    const fullURL = `${baseURL}${category}`;

    setUrl(fullURL);
  };

  return {
    isLoading,
    error,
    validationError,
    handleSubmit,
  };
};

export default useFetchData;
