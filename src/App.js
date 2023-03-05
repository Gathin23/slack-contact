import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //ADD HOOK ADDRESS
  const WEB_HOOK_URL='';

  const submitForm = async (e) => {
    e.preventDefault();
    const webHookURL = WEB_HOOK_URL;
    const data = {
      text: `NAME: ${name}\n EMAIL: ${email}\n MESSAGE: ${message}`,
    };

    let res = await axios.post(webHookURL, JSON.stringify(data), {
      withCredentials: false,
      transformRequest: [
        (data, headers) => {
          delete headers.post["Content-Type"];
          return data;
        },
      ],
    });

    if (res.status === 200) {
      alert("Message Sent!");

      // clear state after submission
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("Error sending message. Please try again later !");
    }
  };
  return (
    <div>
      <div>
        <div>
          <form
            onSubmit={submitForm}
          >
            <label
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="abc"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="email"
              
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="abc@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="hello"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
            >
              Click
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
