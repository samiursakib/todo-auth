'use client';

import { Badge, Checkbox, IconButton, Text } from "@radix-ui/themes";
import MutateTodo from "./MutateTodo";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { ColorType, TodoProps, TodoType } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { moveToTrashTodoAction } from "../lib/server-actions";

const category = [
  { name: 'Groceries', color: 'indigo' },
  { name: 'Work', color: 'cyan' },
  { name: 'Personal', color: 'orange' },
  { name: 'Finance', color: 'crimson' }
];

const Todo = ({ todo, setRefresh }: { todo: TodoType, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const { id, name, completed, category_id } = todo;
  const { name: categoryName, color } = category[todo.category_id - 1];

  const handleDelete = async () => {
    const result = await moveToTrashTodoAction(todo.id);
    setRefresh(prev => !prev);
    console.log(result);
  };

  return <div className='p-2 w-[500px] border rounded-md flex items-center gap-2'>
      <Checkbox defaultChecked={completed} />
      { !isInEditMode
        ? <>
            <Text>{name}</Text>
            <Badge color={color as ColorType} className='mr-auto' size='1'>{categoryName}</Badge>
            <IconButton size='1' onClick={() => setIsInEditMode(true)}><BiEditAlt /></IconButton>
            <IconButton size='1' onClick={handleDelete}><AiOutlineDelete /></IconButton>
          </>
        : <>
            <MutateTodo id={id} name={name} completed={completed} categoryId={category_id} action='update' setRefresh={setRefresh} setIsInEditMode={setIsInEditMode} />
          </> }
    </div>
};

export default Todo;