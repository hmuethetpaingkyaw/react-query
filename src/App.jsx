import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreatePost } from "./CreatePost";
import Post from "./Post";
import PostsList1 from "./PostList1";
import PostsList2 from "./PostList2";
import PostListPaginated from "./PostListPaginated";
import PostListInfinite from "./PostListInfinite";

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();

  // function onHoverPostOneLink() {
  //   queryClient.prefetchQuery({
  //     queryKey: ["posts", 2],
  //     queryFn: () => getPost(2),
  //   });
  // }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button
        onClick={() => {
          // onHoverPostOneLink()
          setCurrentPage(<Post id={2} />);
        }}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />
      {currentPage}
    </div>
  );
}
