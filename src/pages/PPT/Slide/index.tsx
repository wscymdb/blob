import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { Node, NodeProps, useReactFlow } from '@xyflow/react';
import { Button } from 'antd';
import { CSSProperties, memo, useCallback } from 'react';
import { Remark } from 'react-remark';
import './index.less';

// export const SLIDE_WIDTH = 1241;
// export const SLIDE_HEIGHT = 754;

export const SLIDE_WIDTH = 400;
export const SLIDE_HEIGHT = 300;
export const SLIDE_PADDING = 30;

export type SlideData = {
  source: string;
  left?: string;
  up?: string;
  down?: string;
  right?: string;
};

export type SlideNode = Node<SlideData, 'slide'>;

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies CSSProperties;

export default memo((props: NodeProps<SlideNode>) => {
  const { data } = props;
  const { fitView } = useReactFlow();

  const moveToNextSlide = useCallback(
    (id: string) => {
      fitView({ nodes: [{ id }], duration: 200 });
    },
    [fitView],
  );

  return (
    <article className="slide nodrag" style={style}>
      <Remark>{data.source}</Remark>
      <footer className="slide-controls nopan">
        {data.left && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              moveToNextSlide(data.left!);
            }}
          >
            <ArrowLeftOutlined />
          </Button>
        )}
        {data.up && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              moveToNextSlide(data.up!);
            }}
          >
            <ArrowUpOutlined />
          </Button>
        )}
        {data.down && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              moveToNextSlide(data.down!);
            }}
          >
            <ArrowDownOutlined />
          </Button>
        )}
        {data.right && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              moveToNextSlide(data.right!);
            }}
          >
            <ArrowRightOutlined />
          </Button>
        )}
      </footer>
    </article>
  );
});
