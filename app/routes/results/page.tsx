'use client'

import { useEffect, useState } from 'react';
import { EventData } from '../../interface/dataType';

const ResultsPage = () => {
  const [filteredData, setFilteredData] = useState<EventData[]>([]);

  return (
    <div>
      <h1>好多地方可以玩</h1>
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
