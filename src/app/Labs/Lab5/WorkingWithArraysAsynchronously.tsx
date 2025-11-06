"use client";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import * as client from "./Client";
export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const createTodo = async () => {
    const todos = await client.createTodo();
    setTodos(todos);
  };
  const postTodo = async () => {
    const newTodo = await client.postTodo({
          title: "New Posted Todo", completed: false, });
    setTodos([...todos, newTodo]);
  };
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>
        Todos
        <FaPlusCircle onClick={createTodo}
                      className="text-success float-end fs-3"
                      id="wd-create-todo" />
        <FaPlusCircle onClick={postTodo}
                      className="text-primary float-end fs-3 me-3"
                      id="wd-post-todo"   />
      </h4>
    </div>
  );

}
