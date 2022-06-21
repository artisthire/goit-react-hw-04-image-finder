import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

const Loader = ({ isFirstRender, ...otherProps }) => {
  const imageCounts = 12;
  const minWidth = 320;
  const height = 260;
  const gap = 16;
  const containerPadding = 25;
  const containerWidth =
    document.documentElement.offsetWidth - containerPadding * 2;

  const columns = Math.trunc((containerWidth + gap) / (minWidth + gap));
  const rows = Math.trunc(imageCounts / columns);

  const coverHeight = height;
  const coverWidth = Math.trunc(
    (containerWidth - gap * (columns - 1)) / columns
  );
  const speed = 0.5;

  const coverHeightWithPadding = height + gap;
  const coverWidthWithPadding = coverWidth + gap;
  const initial = isFirstRender ? 0 : gap;
  const covers = Array(columns * imageCounts).fill(1);

  return (
    <ContentLoader
      speed={speed}
      width={containerWidth}
      height={rows * coverHeightWithPadding - gap}
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
      {...otherProps}
    >
      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding + initial;
        let vx =
          (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);
        return (
          <rect
            key={i}
            x={vx}
            y={vy}
            rx="0"
            ry="0"
            width={coverWidth}
            height={coverHeight}
          />
        );
      })}
    </ContentLoader>
  );
};

ContentLoader.propTypes = {
  isFirstRender: PropTypes.bool,
};

export default Loader;
