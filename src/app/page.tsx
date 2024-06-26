"use client";

import { AlignJustify, Plus, Trash } from "lucide-react";
import { useState } from "react";

interface ArrayType {
  title: string;
  id: string;
  children: ArrayType[];
  isChildrenVisible: boolean;
}

export default function HomePage() {
  const [array, setArray] = useState<ArrayType[]>([
    {
      title: "Cat-1",
      id: crypto.randomUUID(),
      children: [],
      isChildrenVisible: true,
    },
    {
      title: "Cat-2",
      id: crypto.randomUUID(),
      children: [],
      isChildrenVisible: true,
    },
  ]);

  function addItem(id: string) {
    function addChild(arr: ArrayType[]): ArrayType[] {
      return arr.map((item) => {
        if (item.id === id) {
          const newItem = {
            title: `${item.title}-${item.children.length + 1}`,
            id: crypto.randomUUID(),
            children: [],
            isChildrenVisible: true,
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

  function showChildren(id: string) {
    function toggleVisibility(arr: ArrayType[]): ArrayType[] {
      return arr.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isChildrenVisible: !item.isChildrenVisible,
          };
        } else {
          return {
            ...item,
            children: toggleVisibility(item.children),
          };
        }
      });
    }

    setArray((prevArray) => toggleVisibility(prevArray));
  }

  function handleRemoveItem(id: string) {
    function removeItem(arr: ArrayType[]): ArrayType[] {
      return arr.reduce((accum, item) => {
        if (item.id !== id) {
          if (item.children.length > 0) {
            item.children = removeItem(item.children);
          }
          accum.push(item);
        }
        return accum;
      }, [] as ArrayType[]);
    }

    setArray((prevArray) => removeItem(prevArray));
  }

  function renderTrees(array: ArrayType[]) {
    return array.map((item) => {
      const { id, title, children, isChildrenVisible } = item;
      return (
        <div key={id} className="ml-4">
          <div className="dropdown rounded-md p-2 hover:bg-slate-500">
            <div className="flex flex-row items-center gap-2">
              {children.length > 0 && (
                <AlignJustify
                  size={18}
                  className="hover:cursor-pointer"
                  onClick={() => showChildren(id)}
                />
              )}
              <div tabIndex={0} className="hover:cursor-pointer">
                {title}
              </div>
              <div
                tabIndex={0}
                className="card dropdown-content card-compact z-[1] bg-base-300 text-primary-content shadow"
              >
                <div className="card-body">
                  <div className="flex flex-row items-center gap-4">
                    <Plus
                      className="text-[rgba(255,255,255,0.7)] hover:cursor-pointer hover:text-white"
                      onClick={() => addItem(id)}
                    />
                    <Trash
                      className="text-[rgba(255,255,255,0.7)] hover:cursor-pointer hover:text-white"
                      onClick={() => handleRemoveItem(id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isChildrenVisible && children.length > 0 && renderTrees(children)}
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
