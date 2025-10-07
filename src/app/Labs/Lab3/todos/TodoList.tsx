import TodoItem from "./TodoItem";
import todos from "./todos.json";
const TodoList = () => {
 return(
   <>
     <h3>Todo List</h3>
     <ul className="list-group">
       { todos.map((todo, idx) => {
           return(<TodoItem key={todo.title + '-' + idx} todo={todo}/>);
         })}
     </ul><hr/>
   </>
 );
}
export default TodoList;
