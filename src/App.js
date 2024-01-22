import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { deleteAuthor, fetchAuthors, getAllPost } from "./apiQuery";
import Form1 from "./components/Form/Form1";
import Form2 from "./components/Form/Form2";
import { urlFor } from "./client";

function App() {

     // Access the client
     const queryClient = useQueryClient()
     // Mutations
     const mutation = useMutation({
      mutationFn: deleteAuthor,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['authors'] })
      },
    })

  const query = useQuery({ queryKey: ["authors"], queryFn: fetchAuthors });

  const { data, isPending, error } = query;

  if (isPending) return <p>Fetching data...</p>;

  console.log(data);
  return (
    <div className="w-full flex flex-col items-center p-[20px]">
      <h1 className="text-3xl font-bold text-pink-500 text-4xl font-[700]">
        React Query!
      </h1>

      <div className="mt-[30px] w-[98%] md:w-[75%] max-h-[70vh] overflow-y-scroll flex flex-col gap-[10px] bg-blue-500 text-white p-[20px] rounded-[10px]  ">
        {data?.length > 0 &&
          data.map((item, index) => (
            <div key={index} className="w-full flex items-center justify-between gap-[10px]">
              <div className="flex items-center gap-[10px]">
                <img
                  src={urlFor(item.image).url()}
                  alt={`author ${index + 1}`}
                  className="w-[50px] h-[50px] rounded-full border border-slate-400 "
                />
                <p>{item.name}</p>
              </div>
              <div>
                <span onClick={()=>{
                   mutation.mutate({
                    slug: item.slug.current
                  })
                }} className="p-[5px] bg-white text-red-600">
                  Delete
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-[30px] w-[98%] md:w-[75%]">
        <Form2 />
      </div>
    </div>
  );
}

export default App;
