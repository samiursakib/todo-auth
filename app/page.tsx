'use client';

import { TodoType } from '@/types';
import { Theme } from '@radix-ui/themes';
import MutateTodo from './components/MutateTodo';
import { getTodos } from './lib/server-actions';
import { useEffect, useState } from 'react';
import Todo from './components/Todo';

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    getTodos().then(res => {
      setTodos(res);
    }).catch(e => console.error(e));
  }, [refresh]);

  return (
    <Theme>
      <div className='flex w-full h-screen flex-col jusitfy-center items-center pt-16 gap-1'>
        <div>
          <MutateTodo action='create' setRefresh={setRefresh} />
        </div>
        {todos.map((todo: TodoType) => <Todo key={todo.id} todo={todo} setRefresh={setRefresh} />)}
      </div>
    </Theme>
  );
}