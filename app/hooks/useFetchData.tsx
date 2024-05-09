import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { ApiDataHookProps, EventData, FilteredEventData } from '../interface/dataType';

const fetcher = (url: string) => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });
};

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

const useFetchData = ({ selectedDate, selectedCity, selectedFree, category }: ApiDataHookProps) => {
  const baseURL = 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=';

  const { data, error, mutate } = useSWR(category ? `${baseURL}${category}` : null, fetcher);
  const [filteredData, setFilteredData] = useState<FilteredEventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterError, setFilterError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setIsLoading(true);
      const selectedDateTimestamp = selectedDate.getTime();
      const filteredItems: FilteredEventData[] = mapEventData(data)
        .filter((item: FilteredEventData) => {
          const { time, endTime, location, price } = item;
          const itemStartTime = new Date(time).getTime();
          const itemEndTime = new Date(endTime).getTime();
          const locationRegex = /([\u4e00-\u9fa5]+?[縣|市])/;
          const cityMatch = location.match(locationRegex);
          const itemCity = cityMatch && cityMatch[1] ? cityMatch[1] : "其他";
          const isFreeSelected = selectedFree === '是';
          const isNotFreeSelected = selectedFree === '不是';
          const isAllSelected = selectedFree === '都可以';
          return (
            selectedDateTimestamp >= itemStartTime &&
            selectedDateTimestamp <= itemEndTime &&
            itemCity === selectedCity &&
            ((isFreeSelected && (price.includes('免費') || price === '')) || 
              (isNotFreeSelected && !price.includes('免費') && price !== '') ||
              isAllSelected)
          );
        });
      setFilteredData(filteredItems);
      setIsLoading(false);
    }
  }, [data, selectedDate, selectedCity, selectedFree]);

  useEffect(() => {
    if (error) {
      setFilterError('網路錯誤或API故障');
    }
  }, [error]);

  return {
    filteredData,
    isLoading,
    filterError,
    error,
    mutate
  };
};

export default useFetchData;
