import React, { useRef, useState } from "react";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { client } from "../../client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAuthor } from "../../apiQuery";

const Form2 = () => {
  const formRef = useRef();

  const [name, setName] = useState("");
  const [asset, setAsset] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);

  // Access the client
  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation({
    mutationFn: addAuthor,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });

  // Handle Image upload
  const handleImage = async (e) => {
    setImageUploaded(false);
    setAsset();
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    await client.assets
      .upload("image", selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((res) => {
        setAsset({
          _type: "image",
          _key: generateUniqueId(),
          asset: {
            _type: "reference",
            _ref: res._id,
          },
        });
        setImageUploaded(true);
      });
  };

  //Handle Form Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      name: name,
      asset: asset,
    });
    formRef.current.reset();
    setImageUploaded(false)
  };

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <h2>Add Author</h2>

      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="w-full flex flex-col gap-[20px]"
      >
        <div className="flex flex-col gap-[10px]">
          <label>Name:</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setName(e.target.value)}
            className="p-[8px] rounded-[4px] outline-none border"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label>Upload Image:</label>
          <input type="file" onChange={handleImage} />
          {imageUploaded && (
            <div>
              <p className="w-max p-[5px] rounded-[25px] text-blue-500 border border-blue-500">
                Image Uploaded
              </p>
            </div>
          )}
        </div>

        <button
          disabled={!imageUploaded}
          type="submit"
          className="w-max px-[15px] py-[7px] text-pink-500 border border-pink-500 rounded-[4px]"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Form2;
