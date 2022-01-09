import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  console.log("env url", process.env.REACT_APP_SLACK_WEBHOOK_URL);
  const submitForm = async (e) => {
    e.preventDefault();
    const webHookURL = process.env.SLACK_WEBHOOK_URL;
    console.log(webHookURL);
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
    <div className="flex">
      <div className="w-full">
        <div className="container mx-auto mt-5">
          <form
            onSubmit={submitForm}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 self-center"
          >
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="email"
              placeholder="john.doe@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="message"
              placeholder="John Doe"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="mt-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
