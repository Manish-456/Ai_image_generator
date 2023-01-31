import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";
const Posts = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const res = await fetch(`https://ai-image-generator-iqih.onrender.com/api/v1/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await res.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please enter a prompt and generate a image");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSupriseMe = (e) => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImg = async (e) => {
    e.preventDefault();
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const res = await fetch(`https://ai-image-generator-iqih.onrender.com/api/v1/aiApi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await res.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-bold text-[30px] font-inter ">Generate Image</h1>
        <p className="mt-2 text-[15px] max-w-[600px] text-[#999]">
          Generate imaginative and visually stunning images and arts with Open
          Ai image generator and share them with community.
        </p>
      </div>
      <form className="mt-16" onSubmit={handleSubmit}>
        <div className="flex gap-5 flex-col">
          <FormField
            label="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            label="Prompt"
            type="text"
            name="prompt"
            placeholder="Two futuristic towers with a skybridge covered in lush foliage, digital art"
            value={form.prompt}
            handleChange={handleChange}
            handleSuprisedMe={handleSupriseMe}
            isSuprisedMe
          />
          <div
            className="relative bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500
           w-64 p-3 h-64 justify-center items-center flex shadow-xl
          "
          >
            {form.photo ? (
              <img src={form.photo} className="w-full h-full object-contain" />
            ) : (
              <img
                src={preview}
                className="w-9/12 h-9/12 h-full object-contain shadow-sm"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          <div className="mt-5 px-2 flex gap-1">
            <button
              onClick={generateImg}
              className="bg-green-900 text-white font-medium py-2.5 px-5 text-center rounded-lg text-sm 
            w-full 
            sm:w-auto"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="mt-2">
            <p className="font-medium text-[13px] text-gray-500">
              Once you have created the image you want, you can share it with
              others in the community.
            </p>
            <button
              type="submit"
              className="mt-4 bg-blue-600 w-full sm:w-auto px-4 py-2.5 rounded-lg text-white text-sm"
            >
              {loading ? "Sharing..." : "Share with the community"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Posts;
