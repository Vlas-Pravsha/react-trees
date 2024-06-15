"use client";

import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  interface arrayType {
    title: string;
    id: number | string;
    children: arrayType[];
  }

  const [array, setArray] = useState<arrayType[]>([
    {
      title: "Cat-1",
      id: crypto.randomUUID(),
      children: [],
    },
    {
      title: "Cat-2",
      id: crypto.randomUUID(),
      children: [],
    },
  ]);

  function addItem(id: number | string) {
    function addChild(arr: arrayType[]): arrayType[] {
      return arr.map((item) => {
        if (item.id === id) {
          const newItem = {
            title: `${item.title}-${item.children.length + 1}`,
            id: crypto.randomUUID(),
            children: [],
          };
          return {
            ...item,
            children: [...item.children, newItem],
          };
        } else {
          return {
            ...item,
            children: addChild(item.children),
          };
        }
      });
    }

    setArray((prevArray) => addChild(prevArray));
  }

  function handleRemakeText(id: number | string) {
    return <input type="text" className="px-6 py-2" />;
  }

  function handleRemoveItem(id: number | string) {
    const newArray = array.filter((item) => item.id !== id);
    setArray(newArray);
  }

  function renderTrees(array: arrayType[]) {
    return array.map((item) => {
      const { id, title, children } = item;
      return (
        <div key={id} className="ml-4">
          <div className="dropdown rounded-md p-2 hover:bg-slate-500">
            <div className=" hover:cursor-pointer" tabIndex={0}>
              {title}
            </div>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact z-[1] bg-base-300 text-primary-content shadow"
            >
              <div className="card-body">
                <div className="flex flex-row items-center gap-4 ">
                  <Plus
                    className="text-[rgba(255,255,255,0.7)] hover:cursor-pointer hover:text-white"
                    onClick={() => addItem(id)}
                  />
                  <Edit
                    className="text-[rgba(255,255,255,0.7)] hover:cursor-pointer hover:text-white"
                    onClick={() => handleRemakeText(id)}
                  />
                  <Trash
                    className="text-[rgba(255,255,255,0.7)] hover:cursor-pointer hover:text-white"
                    onClick={() => handleRemoveItem(id)}
                  />
                </div>
              </div>
            </div>
          </div>
          {children.length > 0 && renderTrees(children)}
        </div>
      );
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        <h1 className="pb-12 text-5xl font-bold">Trees Test Task</h1>
        <div>{renderTrees(array)}</div>
      </div>
    </main>
  );
}
