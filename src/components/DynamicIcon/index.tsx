import { memo, useEffect, useState } from 'react';

interface IProps {
  iconName: string;
}

export default memo((props: IProps) => {
  const { iconName } = props;
  const [IconComponent, setIconComponent] = useState<any>();

  useEffect(() => {
    loadIcon();
  }, [iconName]);

  const loadIcon = async () => {
    try {
      console.log(21);

      const Icon: any = await import(`@ant-design/icons`);
      setIconComponent(Icon[iconName]);
    } catch (error) {
      console.error(error);
    }
  };

  return IconComponent ? <IconComponent /> : null;
});
