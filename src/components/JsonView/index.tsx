import { Tabs } from 'antd';
import { memo } from 'react';
import ReactJson from 'react-json-view';
import './index.less';

export interface IData {
  label: string;
  value: Record<string, any>;
}

interface IProps {
  data: IData[];
}

export default memo((props: IProps) => {
  const { data } = props;

  const items = data.map((item, index) => ({
    key: `${index}`,
    label: item.label,
    children: <ReactJson displayDataTypes={false} src={item.value} />,
  }));

  return (
    <div className="json-view">
      <Tabs defaultActiveKey="0" items={items} />
    </div>
  );
});
