import "./Loader.css";
interface LoaderProps {
  suffix: string;
}
export const Loader = ({ suffix }: LoaderProps) => {
  return (
    <span className="loader-container">
      <span className="loader"></span>
      <span className="loader-suffix">{suffix}</span>
    </span>
  );
};
