import { client } from "./client";

export const getAllPost = async () => {
  const data = await fetch("https://dummyjson.com/posts").then((res) =>
    res.json()
  );
  console.log("a");
  return data;
};

export const fetchAuthors = async () => {
  const data = await client
    .fetch(
      `*[_type == "author"]{
        id,
        name,
        slug,
        image,
       } | order(_createdAt asc)`
    )
    .then((data) => data)
    .catch(console.error);

  return data;
};

// Add Author
export const addAuthor = async (doc) => {
  console.log(doc);
  try {
    const res = await client.create({
      _type: "author",
      name: doc.name,
      image: doc.asset,
    });
    console.log(res);
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

//Delete Author
export const deleteAuthor = async (data) => {
  console.log(data);
  try {
    const res = await client.delete({
      query: `*[_type == "author" && slug.current == '${data.slug}']`
    });
    console.log(res);
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};