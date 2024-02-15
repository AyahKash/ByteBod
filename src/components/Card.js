import Button from "./Button";
import "./Card.css";
import profilePhoto from "./profile_photo.png";

function Card() {
  // assuming post data of form:
  const post = {
    author: "John Doe",
    authorPhoto: profilePhoto,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
    date: "2/10/2024",
  };

  return (
    <div className="card">
      <div className="header">
        <img
          src={post.authorPhoto}
          alt="Profile"
          width="45"
          style={{ paddingRight: 10 }}
        />
        <div>
          <div className="author">{post.author}</div>
          <div className="date">{post.date}</div>
        </div>
      </div>
      <div className="content">{post.text}</div>
      <div>
        <Button className="button light">Like</Button>
        <div className="divider" />
        <Button className="button light">Comment</Button>
      </div>
    </div>
  );
}

export default Card;
