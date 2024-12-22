import ContentLoader from 'react-content-loader';
function PizzaSkeleton() {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={467}
      viewBox="0 0 280 467"
      backgroundColor="#ededed"
      foregroundColor="#ffffff">
      <circle cx="140" cy="125" r="120" />
      <rect x="0" y="270" rx="10" ry="10" width="280" height="30" />
      <rect x="0" y="315" rx="10" ry="10" width="280" height="87" />
      <rect x="0" y="425" rx="10" ry="10" width="90" height="35" />
      <rect x="110" y="415" rx="17" ry="17" width="168" height="45" />
    </ContentLoader>
  );
}

export default PizzaSkeleton;
