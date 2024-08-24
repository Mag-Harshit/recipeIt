"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import Procedures from "@/components/Procedures";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { eduVIC, Loras } from "@/fonts/font";
import Link from "next/link";

const CreateRecipe = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([{ id: 1, value: "" }]);
  const [procedure, setProcedure] = useState(false);

  function handleRecipeNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRecipeName(e.target.value);
  }
  function handleAnotherInput() {
    console.log(recipeName);
    setIngredients((prevIngred) => {
      return [
        ...prevIngred,
        { id: prevIngred[prevIngred.length - 1].id + 1, value: "" },
      ];
    });
  }

  function handleIngredintsChange(id: number, value: string) {
    setIngredients((prev) =>
      prev.map((ingred) => (ingred.id === id ? { ...ingred, value } : ingred))
    );
  }

  function handleDeleteIngredient(id: number) {
    setIngredients(ingredients.filter((prev) => prev.id != id));
  }

  function handleProcedure() {
    setProcedure(!procedure);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className={`navBar ${eduVIC}`}>RecipeIt</div>
        <Link href="/">
          <button className="mr-5 text-lg h-14 bg-gray-400 text-white transition-all hover:bg-white hover:text-black border-black border-[1px] rounded-full px-2">
            Home
          </button>
        </Link>
      </div>
      <div>
        <div className="mt-10 text-center">
          <h1 className={`text-5xl ${Loras.className}`}>Create a Recipe</h1>
        </div>
        {procedure ? (
          <Procedures ingredientList={ingredients} />
        ) : (
          <div className="mt-10 gap-10 flex flex-col justify-center items-center ">
            <div className="flex flex-col  gap-2">
              <h2 className="text-2xl">Recipe Name:</h2>
              <input
                type="text"
                value={recipeName}
                onChange={handleRecipeNameChange}
                className="w-72 sm:w-96 rounded-md h-11 p-2 text-lg border-black border-[1px]"
              />
            </div>
            <div className="flex flex-col  gap-4">
              <h2 className="text-2xl">Ingredients:</h2>
              {ingredients.map((ingred, index) => (
                <div key={ingred.id} className="flex  gap-4">
                  <div className="flex flex-row gap-3">
                    <input
                      value={ingred.value}
                      className=" w-72 sm:w-96 rounded-md h-11 p-2 text-lg border-black border-[1px]"
                      onChange={(e) => {
                        handleIngredintsChange(ingred.id, e.target.value);
                      }}
                    ></input>
                    <button onClick={() => handleDeleteIngredient(ingred.id)}>
                      {index != 0 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleAnotherInput}
              className="text-xl border-black border-[1px]  p-3 rounded-3xl transition-all hover:text-white hover:bg-black "
            >
              Add Another
            </button>
          </div>
        )}
      </div>
      <div className="text-right mr-5">
        <button
          className="text-xl mt-10 transition-all bg-black text-white p-3 rounded-3xl border-black border-[1px] hover:bg-white hover:text-black"
          onClick={handleProcedure}
        >
          {procedure ? "Go Back " : "Add Procedures"}
        </button>
      </div>
    </div>
  );
};

export default CreateRecipe;
