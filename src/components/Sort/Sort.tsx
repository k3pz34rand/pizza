import React from 'react';
import { changeSort } from '../../store/search/SearchSlice';
import { changeIsEnd } from '../../store/pizzas/pizzasSlice';
import { sortList } from '../../shared/consts';
import { useAppDispatch } from '../../store/store';
import { SortInterface } from 'store/search/searchTypes';

interface SortProps {
  sortParams: SortInterface;
}
function Sort({ sortParams }: SortProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const popupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handlePopupClick = (event: MouseEvent): void => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handlePopupClick);
    return () => {
      document.body.removeEventListener('click', handlePopupClick);
    };
  }, []);

  const handleSortChange = (index: number): void => {
    dispatch(changeSort(sortList[index] as SortInterface));
    dispatch(changeIsEnd(false));
    setIsOpen(!isOpen);
  };
  console.log(sortParams);
  return (
    <div ref={popupRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"></path>
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortParams?.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sort, index) => {
              return (
                <li
                  key={index}
                  value={sort.value}
                  className={sort.name === sortParams.name ? 'active' : ''}
                  onClick={() => handleSortChange(index)}>
                  {sort.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
const MemoizedSort = React.memo(Sort);
export default MemoizedSort;
