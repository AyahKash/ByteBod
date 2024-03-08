import Button from "./Button";
import "./Card.css";
import profilePhoto from "../images/ProfilePhoto.png";

// assuming post data of form:
const emptyPost = {
  title: "Post Title",
  postAuthor: "Post Author",
  postText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
  postDate: "Post Date",
  photoUrl: profilePhoto,
  workoutType: "Workout Type"

};
//for ayah testing


function Card({ post = emptyPost, incrementLikes }) {
  //for ayah testing
  // console.log("Here is the type", typeof(post.createAt))
  console.log(post.author)
  return (
    <div className="card">
      <div className="heading">
        <img className="img"
          src={post.author.photoUrl || profilePhoto} 
          alt="Profile"
          width="50"
          style={{ marginRight: "0.75em" }}
        />
        <div>
          <div className="title">{post.title}</div>
          <div className="author">{post.author.name ? post.author.name : "Author Name"}</div>
        </div>
      </div>
      <div className="workoutType"> Workout Type: {post.workoutType}</div>
      <div className="content">{post.postText}</div>
      {typeof(post.createAt) === 'string' && <div className="date">Post Date: {post.createAt}</div>}
      <div className="interaction">
        <Button onClick={incrementLikes} className="button like">&#128077;</Button>
        <Button className="button comment">&#128172;</Button>
      </div>
    </div>
  );
}

export default Card;
