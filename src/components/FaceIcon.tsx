import type { IconContainerProps } from './Rating/index';

const AngryIcon = () => {
  return (
    <svg viewBox="0 0 24 24" color="#F44336">
      <circle cx="15.5" cy="9.5" r="1.5"></circle>
      <circle cx="8.5" cy="9.5" r="1.5"></circle>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"></path>
    </svg>
  );
};

const ConfuseIcon = () => {
  return (
    <svg viewBox="0 0 24 24" color="#FF9800">
      <circle cx="15.5" cy="9.5" r="1.5"></circle>
      <circle cx="8.5" cy="9.5" r="1.5"></circle>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-3.5c.73 0 1.39.19 1.97.53.12-.14.86-.98 1.01-1.14-.85-.56-1.87-.89-2.98-.89-1.11 0-2.13.33-2.99.88.97 1.09.01.02 1.01 1.14.59-.33 1.25-.52 1.98-.52z"></path>
    </svg>
  );
};

const CalmIcon = () => {
  return (
    <svg viewBox="0 0 24 24" color="#FFEB3B">
      <circle cx="15.5" cy="9.5" r="1.5"></circle>
      <circle cx="8.5" cy="9.5" r="1.5"></circle>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-.73 0-1.38-.18-1.96-.52-.12.14-.86.98-1.01 1.15.86.55 1.87.87 2.97.87 1.11 0 2.12-.33 2.98-.88-.97-1.09-.01-.02-1.01-1.15-.59.35-1.24.53-1.97.53z"></path>
    </svg>
  );
};

const SmileIcon = () => {
  return (
    <svg viewBox="0 0 24 24" color="#CDDC39">
      <circle cx="15.5" cy="9.5" r="1.5"></circle>
      <circle cx="8.5" cy="9.5" r="1.5"></circle>
      <path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2zm-.01-14C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    </svg>
  );
};

const LaughIcon = () => {
  return (
    <svg viewBox="0 0 24 24" color="#4CAF50">
      <circle cx="15.5" cy="9.5" r="1.5"></circle>
      <circle cx="8.5" cy="9.5" r="1.5"></circle>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z"></path>
    </svg>
  );
};

const icons: Record<number, React.ReactElement> = {
  1: <AngryIcon />,
  2: <ConfuseIcon />,
  3: <CalmIcon />,
  4: <SmileIcon />,
  5: <LaughIcon />,
};

const FaceIcon = (props: IconContainerProps) => {
  const { value, ...rest } = props;

  return <span {...rest}>{icons[value]}</span>;
};

export default FaceIcon;
