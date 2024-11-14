import React from 'react'

const Header = (props) => {
  const { todos } = props;
  const todosLength = todos.length;
  const taskMessage = todosLength === 1 ? `You have ${todosLength} open task` : `You have ${todosLength} open tasks`;
  return (
    <div>
      <header className='text-gradient'>{taskMessage}</header>
    </div>
  )
}

export default Header;