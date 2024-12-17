import { Flex, List, Space } from 'antd';
import { memo } from 'react';
import NavCardItem from '../NavCardItem';
import { NavCard } from '../type';
import './index.less';

export default memo((props: NavCard) => {
  const { title, updateTime, data } = props;

  return (
    <div className="nav-card">
      <Flex>
        <Space size="large">
          <div className="card-title">{title}</div>
          <div className="card-time">更新时间：{updateTime}</div>
        </Space>
      </Flex>
      <div className="card-content">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 5,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={(item, index) => {
            console.log(item);
            return (
              <List.Item>
                <NavCardItem key={index} data={item} />
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
});
