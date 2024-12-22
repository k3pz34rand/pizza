import React, { ReactElement } from 'react';
import styles from './InfinityScroll.module.scss';

type ScrollProps = {
  status: string;
  updatePage: (func) => void;
  children: ReactElement;
  page: number;
  comparePage: boolean;
};
function InfinityScroll({ status, updatePage, children, page, comparePage }: ScrollProps) {
  const loaderRef = React.useRef(null);
  //@ts-ignore
  React.useEffect(() => {
    if (!comparePage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            updatePage(() => page + 1);
          }
        },
        { threshold: 1.0 },
      );

      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }

      return () => {
        if (loaderRef.current) observer.unobserve(loaderRef.current);
      };
    }
  }, [updatePage, status, page, comparePage]);

  if (comparePage) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {status === 'success' && <div ref={loaderRef} className={styles.refBlock}></div>}
    </>
  );
}

export default InfinityScroll;
