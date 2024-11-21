import React from 'react'

const Header = (props) => {
  const { todos } = props;  
  const noOfOpenTasks = todos.filter((task) => !task.completed).length;
  const taskMessage = noOfOpenTasks === 1 ? `You have ${noOfOpenTasks} open task` : `You have ${noOfOpenTasks} open tasks`;
  return (
    <div>
      <header className='text-gradient'>{taskMessage}</header>
    </div>
  )
}

export default Header;