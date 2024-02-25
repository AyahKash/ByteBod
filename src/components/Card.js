import Button from "./Button";
import "./Card.css";
import profilePhoto from "../images/ProfilePhoto.png";

// assuming post data of form:
const emptyPost = {
  title: "Post Title",
  postText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
};

function Card({ post = emptyPost }) {
  return (
    <div className="card">
      <div className="heading">
        <img
          src={profilePhoto}
          alt="Profile"
          width="50"
          style={{ marginRight: "0.75em" }}
        />
        <div>
          <div className="title">{post.title}</div>
          <div className="author">Post Author</div>
        </div>
      </div>
      <div className="content">{post.postText}</div>
      <div className="date">Post Date</div>
      <div className="interaction">
        <Button className="button like">&#128077;</Button>
        <Button className="button comment">&#128172;</Button>
      </div>
    </div>
  );
}

export default Card;
