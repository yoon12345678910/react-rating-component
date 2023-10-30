import Rating from './components/Rating';
import { HeartBorderIcon, HeartIcon } from './components/HeartIcon';
import FaceIcon from './components/FaceIcon';

function App() {
  return (
    <>
      <div>
        <Rating name="value-1" size={18} defaultValue={4} readOnly />
      </div>
      <div>
        <Rating name="value-2" precision={0.5} size={24} max={10} defaultValue={3.5} />
      </div>
      <div>
        <Rating name="value-3" size={24} defaultValue={5} disabled />
      </div>
      <div>
        <Rating name="value-4" precision={0.1} size={54} max={3} />
      </div>
      <div>
        <Rating
          name="value-heart-1"
          precision={0.5}
          size={54}
          value={5}
          emptyIcon={<HeartBorderIcon />}
          filledIcon={<HeartIcon />}
        />
      </div>
      <div>
        <Rating
          name="value-icon-component-1"
          size={36}
          value={3}
          IconContainerComponent={FaceIcon}
          highlightSelectedOnly
        />
      </div>
    </>
  );
}

export default App;
