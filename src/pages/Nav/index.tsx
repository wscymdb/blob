import { memo } from 'react';
import data from './data.json';
import './index.scss';
import NavCard from './NavCard';

console.log(data);

export default memo(() => {
  return (
    <div className="nav">
      <div className="content">
        {data.map((item, index) => {
          return <NavCard {...item} key={index} data={item?.children} />;
        })}
      </div>

      <div className="sky">
        <div className="layer1"></div>
        <div className="layer2"></div>
        <div className="layer3"></div>
      </div>
    </div>
  );
});
