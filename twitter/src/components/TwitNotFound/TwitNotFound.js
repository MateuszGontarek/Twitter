import "./TwitNotFound.scss";
const TwitNotFound = (props) => {
  const hashtag = props.hashtag;
  return (
    <div className="twits-not-found">
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
      <h2>No results</h2>
      <p>
        Nothing with <span>#{hashtag}</span>
      </p>
    </div>
  );
};

export default TwitNotFound;
