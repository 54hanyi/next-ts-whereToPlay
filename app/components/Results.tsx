'use client'

import { FilteredEventData } from '../interface/dataType';

interface ResultsProps {
  data: FilteredEventData[];
}

const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <div>
      <h1 className='text-xl'>好多地方可以去：</h1>
      {data && data.length > 0 ? (
        <ul className='list-decimal pl-6 space-y-4'>
          {data.map((data, index) => (
            <li key={index} className='space-y-2'>
              <h2 className='text-2xl'>{data.title}</h2>
              <p>開始時間: {data.time}</p>
              <p>結束時間: {data.endTime}</p>
              <p>活動地點: {data.location} - {data.locationName}</p>
              <p>活動收費: {data.price ? data.price : '免費'}</p>
              <p>活動介紹：{data.descriptionFilterHtml}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>啥也沒有，待在家吧</p>
      )}
    </div>
  );
};

export default Results;
