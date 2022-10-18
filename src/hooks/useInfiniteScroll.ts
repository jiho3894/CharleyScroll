import { useEffect, useState, useMemo, MutableRefObject } from "react";

// Props 타입 정의
interface InfiniteScrollProps {
  root?: Element | null;
  // root 의 margin 값
  rootMargin?: string;
  // target element 가 root 와 몇 % 교차했을 때, callback 을 실행할지 결정하는 값
  target: MutableRefObject<HTMLDivElement | null>;
  threshold?: number;
  // 관찰을 할 Array
  targetArray: Array<any>;
  // 불러오는 리스트의 사이즈
  pageSize: number;
  // 리스트의 갯수중 불러올 시점 (pageSize가 20이고 endPoint가 5라면, 15번째 리스트 아이템을 관찰)
  endPoint?: number;
}

const useInfiniteScroll = ({
  root = null,
  target,
  threshold = 1,
  rootMargin = "0px",
  targetArray,
  pageSize,
  endPoint = 1,
}: InfiniteScrollProps) => {
  const [count, setCount] = useState<number>(0);
  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries, observer) => {
        if (target?.current === null) {
          return;
        }
        if (entries[0].isIntersecting) {
          setCount((v) => v + 1);
          observer.disconnect();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );
  }, [target, root, rootMargin, threshold]);

  useEffect(() => {
    if (target?.current === null) {
      return;
    }
    if (pageSize * (count + 1) <= targetArray.length) {
      observer.observe(
        target.current.children[target.current.children.length - endPoint]
      );
    }

    return () => {
      if (target.current !== null && observer) {
        observer.unobserve(target.current);
      }
    };
  }, [count, targetArray, target, pageSize]);

  return {
    count,
    setCount,
  };
};

export default useInfiniteScroll;
