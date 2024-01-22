import React, { useRef } from "react";

const Form1 = () => {
  const formRef = useRef();

  async function formAction(formData) {
    const message = formData.get("message");
    console.log(message)
  }
  return (
    <div>
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Type messsage..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Form1;
