import "./App.css";
import PostComment from "./components/PostComment";
import Comments from "./components/Comments";
import { useComments } from "../src/contexts/CommentProvider";

function App() {
  const { commentsData } = useComments();

  commentsData &&
    commentsData.map((c) => {
      if (typeof c === "number" || typeof c === "string") {
        commentsData.pop();
      }
      return false;
    });

  return (
    <main>
      {commentsData &&
        commentsData.map((data) => {
          return <Comments key={data.id} comment={data} />;
        })}
      <PostComment />
    </main>
  );
}

export default App;
