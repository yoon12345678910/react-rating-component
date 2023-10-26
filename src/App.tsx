import Rating from './components/Rating';
import { HeartBorderIcon, HeartIcon } from './components/HeartIcon';
import FaceIcon from './components/FaceIcon';

function App() {
  return (
    <>
      <div>
        <Rating name="value-1" precision={1} size={18} />
      </div>
      <div>
        <Rating name="value-2" precision={0.5} size={24} />
      </div>
      <div>
        <Rating name="value-3" precision={0.1} size={54} />
      </div>
      <div>
        <Rating
          name="value-heart-4"
          precision={0.5}
          size={54}
          emptyIcon={<HeartBorderIcon />}
          filledIcon={<HeartIcon />}
        />
      </div>
      <div>
        <Rating name="value-icon-component-5" size={36} IconContainerComponent={FaceIcon} />
      </div>
    </>
  );
}

export default App;
