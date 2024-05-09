'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { EventData } from '../../interface/dataType';

const ResultsPage = () => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<EventData[]>([]);

  useEffect(() => {
    if (router.isReady) {
      const queryParams = new URLSearchParams(router.asPath.split('?')[1]);
      const filteredDataString = queryParams.get('filteredData');
      if (filteredDataString) {
        const parsedData = JSON.parse(filteredDataString) as EventData[];
        setFilteredData(parsedData);
      }
    }
  }, [router.isReady, router.asPath]);

  return (
    <div>
      <h1>Results Page</h1>
      {filteredData && filteredData.length > 0 ? (
        <ul className='text-red-600'>
          {filteredData.map((data, index) => (
            <li key={index}>
              <h2>{data.title}</h2>
              <p>{data.descriptionFilterHtml}</p>
              <p>Time: {data.showInfo[0].time}</p>
              <p>Location: {data.showInfo[0].location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ResultsPage;
