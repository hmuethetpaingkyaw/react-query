import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
import { useFetch } from "./queries/useFetch";
import { useDelete } from "./queries/useGenericMutation";

export default function PostsList1() {
  // const postsQuery = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getPosts,
  //   placeholderData: [{ id: 1, title: "Initial Data" }],
  // });

  const postsQuery = useFetch("posts");
  const deletePostMutation = useDelete("posts", null, (oldData, id) =>
    oldData.filter((item) => item.id !== id)
  );

  const deletePost = (id) => {
    deletePostMutation.mutate(id);
  };
  if (postsQuery.status === "loading") return <h1>Loading...</h1>;
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li
            key={post.id}
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{post.title}</span>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => deletePost(post.id)}
              >
                delete{" "}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
