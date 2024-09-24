import { Input } from 'antd';
import {
  CSSProperties,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './index.less';

interface LimitedInputProps {
  value: string;
  onChange: (value: string) => void;
  onPressEnter?: any;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
}
export default memo(
  forwardRef((props: LimitedInputProps, ref) => {
    const {
      value,
      onChange,
      style,
      maxLength = 120,
      placeholder = '',
      disabled = false,
      onPressEnter,
    } = props;

    const [inputValue, setInputValue] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const isInputRef = useRef(false);
    const elementRef = useRef<HTMLDivElement>(null);

    // const limitedRef = useRef<Map<string, any>>();

    // useImperativeHandle(props?.addons?.fieldRef, () => {
    //   return {
    //     valid() {
    //       const valids: any = [];
    //       let isScroll = false;

    //       limitedRef.current?.forEach((value, key) => {
    //         if (value?.valid) {
    //           const valid = value.valid();

    //           if (!valid && !isScroll) {
    //             value?.scrollIntoView();
    //             isScroll = true;
    //           }

    //           valids.push(valid);
    //         }
    //       });

    //       return valids.every((item) => item);
    //     },
    //   };
    // });

    // const getMap = () => {
    //   if (!limitedRef.current) {
    //     limitedRef.current = new Map();
    //   }
    //   return limitedRef.current;
    // };

    // <LimitedInput
    //                     value={item?.entityContent}
    //                     placeholder="请输入实体值"
    //                     maxLength={120}
    //                     disabled={disabled}
    //                     ref={(ref) => getMap().set(`value-${item.id}`, ref)}
    //                     onChange={(value) =>
    //                       handleInputChange('entityContent', item.id, value)
    //                     }
    //                   />

    useImperativeHandle(ref, () => {
      return {
        valid() {
          const msg = !inputValue?.length
            ? '请输入内容'
            : inputValue?.length > maxLength
            ? `最多输入${maxLength}个字符`
            : null;
          setErrMsg(msg);

          return !msg;
        },
        scrollIntoView() {
          if (elementRef.current) {
            elementRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        },
      };
    });

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    useEffect(() => {
      if (!isInputRef.current) {
        return;
      }

      const msg = !inputValue?.length
        ? '请输入内容'
        : inputValue?.length > maxLength
        ? `最多输入${maxLength}个字符`
        : null;
      setErrMsg(msg);
    }, [inputValue]);

    const handleInputChange = (newValue: string) => {
      if (!isInputRef.current) {
        isInputRef.current = true;
      }
      setInputValue(newValue);
      onChange(newValue);
    };

    return (
      <div className="limited-input" style={style} ref={elementRef}>
        <Input
          {...(onPressEnter ? { onPressEnter } : {})}
          status={errMsg ? 'error' : ''}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => handleInputChange(e.target.value)}
          className={errMsg ? 'err-bottom' : ''}
        />
        {errMsg && <span className="err-msg">{errMsg}</span>}
      </div>
    );
  }),
);
