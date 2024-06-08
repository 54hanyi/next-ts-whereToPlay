'use client'

import { FilteredEventData } from '../interface/dataType';

interface ResultsProps {
  data: FilteredEventData[];
}

const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <div>
      {data && data.length > 0 ? (
        <ul className='list-decimal p-12 space-y-4'>
          {data.map((data, index) => (
            <li key={index} className='space-y-2'>
              <h2 className='text-2xl text-sky-600'>{data.title}</h2>
              <p>開始時間: {data.time}</p>
              <p>結束時間: {data.endTime}</p>
              <p>活動地點: {data.location} - {data.locationName}</p>
              <p>活動收費: {data.price ? data.price : '免費'}</p>
              <p>活動介紹：{data.descriptionFilterHtml}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>沒地方去，待在家吧</p>
      )}
    </div>
  );
};

export default Results;
