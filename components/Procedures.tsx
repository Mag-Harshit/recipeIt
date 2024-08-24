"use client";
import { useState, useEffect } from "react";
import axios from "axios";
type Ingredient = {
  id: number;
  value: string;
};

interface ProceduresProps {
  ingredientList: Ingredient[];
}

const Procedures = ({ ingredientList }: ProceduresProps) => {
  const [procedures, setProcedures] = useState([{ id: 1, value: "" }]);
  function handleProceduresChange(id: number, value: string) {
    setProcedures((prev) =>
      prev.map((proc) => (proc.id === id ? { ...proc, value } : proc))
    );
  }
  function handleAnotherInput() {
    setProcedures((prevProced) => {
      return [
        ...prevProced,
        { id: prevProced[prevProced.length - 1].id + 1, value: "" },
      ];
    });
  }
  function handleDeleteProcedure(id: number) {
    setProcedures(procedures.filter((prev) => prev.id != id));
  }

  function handleSubmit() {
    console.log(ingredientList);
  }
  return (
    <div>
      <div className="mt-10 gap-10 flex flex-col justify-center items-center ">
        <div className="flex flex-col  gap-4">
          <h2 className="text-2xl">Procedures:</h2>
        </div>
        {procedures.map((proced, index) => (
          <div key={proced.id} className="flex gap-4">
            <div className="flex flex-row gap-3">
              <input
                value={proced.value}
                className=" w-72 sm:w-96 rounded-md h-11 p-2 text-lg border-black border-[1px]"
                onChange={(e) => {
                  handleProceduresChange(proced.id, e.target.value);
                }}
              ></input>
              <button onClick={() => handleDeleteProcedure(proced.id)}>
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
        <button
          onClick={handleAnotherInput}
          className="text-xl border-black border-[1px]  p-3 rounded-xl transition-all hover:text-white hover:bg-black "
        >
          Add Another
        </button>
        <button
          onClick={handleSubmit}
          className="text-xl border-black border-[1px] bg-blue-600 text-white  p-3 rounded-xl transition-all hover:text-black hover:bg-white"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Procedures;
