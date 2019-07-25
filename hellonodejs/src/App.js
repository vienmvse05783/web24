import React from 'react';
import './App.css'
//jsx

/*componet with function */
/*
const SmallComponent =(props)=>{
  console.log(props)
  return (
    <div>
      Hello : {props.myName}

    </div>
  );
};

//componet with class
class App extends React.Component{
  state={
    name: 'Vien',
    age: 20
  }
  //this.setStage
  render(){
    console.log('this.state',this.state)
    return(
      <div>
        <SmallComponent myName={this.state.name}></SmallComponent>
        <SmallComponent></SmallComponent>
      </div>
      
    )
  }
}
*/
//content, finish: t/f
class App extends React.Component {
  state = {
    todo: [],
    inputValue: "",
  };
handleFormSubmit= (event)=> { 
  event.preventDefault();
  const todoContent=this.state.inputValue;
  const newTodo={
    content:todoContent,
    finish:false
  };
  this.setState({
    todo: [...this.state.todo,newTodo],
    inputValue: "",
  })
}
  //this.setStage
  render() {
console.log(this.state.todo)
    return (
      <div className="todo-app">
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(event) => {
              console.log(event.target.value);
              this.setState({
                inputValue:event.target.value
              })

            }}
          ></input>
          <input type="submit" value="submit"></input>
        </form>
        {this.state.todo.map((item,index)=>{
          return(
            <div key={index}>
              <input  type="checkbox" checked={item.finish } onChange={(event)=>{
                const newTodos=this.state.todo.map((item1,index1)=>{
                  if(index===index1){
                    return{
                      content: item1.content,
                      finish:event.target.checked,
                    }
                  }else{
                    return item1
                  }
                })
                this.setState({
                  todo: newTodos,
                })

              }} />{item.finish?<strike>{item.content}</strike>:<span>{item.content}</span>}
              <button onClick={()=>{
                const newTodos=this.state.todo.filter((todo,i)=>{
                  if(index===i){
                    return false
                  }else{
                    return true
                  }

                })
                this.setState({
                  todo: newTodos
                })

              }} >Delete</button>
            </div>
          )

        })}
        
      </div>

    )
  }
}
export default App;