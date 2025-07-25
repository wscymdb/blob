import { Avatar, Flex, Space, Typography } from 'antd';
import { memo } from 'react';
import { NavItem } from '../type';
import './index.less';

interface IProps {
  data: NavItem;
}

export default memo((props: IProps) => {
  const { data } = props;

  const handleClick = () => {
    window.open(data?.link);
  };

  const getImg = (img: string) => {
    try {
      return require(`@/assets/images/nav/${img}`);
    } catch {
      return '';
    }
  };

  return (
    <div className="nav-card-item" onClick={handleClick}>
      <Flex vertical>
        <Space>
          <Avatar
            // 谷歌获取图标的地址 但是需要梯子
            // src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${data?.link}/&size=128`}
            src={getImg(data.img)}
          >
            {data.title}
          </Avatar>

          <div className="item-titles">
            <div className="item-title">{data?.title}</div>
            <Typography.Paragraph
              ellipsis={{ rows: 1, tooltip: { title: data?.subtitle } }}
              className="item-subtitle"
            >
              {data?.subtitle}
            </Typography.Paragraph>
          </div>
        </Space>
        <Typography.Paragraph
          ellipsis={{ rows: 2, tooltip: { title: data?.description } }}
          className="item-desc"
        >
          {data?.description}
        </Typography.Paragraph>
      </Flex>
    </div>
  );
});
