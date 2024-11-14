import React from "react";

const Tabs = (props) => {
  const { todos, selectedTab, setSelectedTab } = props;
  const tabs = ["All", "Open", "Completed"];
  return (
    <>
      <nav className="tab-container">
        {tabs.map((tab, tabIndex) => {
          const numOfTasks =
            tab === "All"
              ? todos.length
              : tab === "Open"
              ? todos.filter((task) => task.completed === false).length
              : todos.filter((task) => task.completed).length;
          return (
            <button
              onClick={() => setSelectedTab(tab)} /*
              Ok. Let me tell you what I have understood about closures and about how the code here is able to ascertain which button I have clicked on, and then you can correct me if there's a flaw in my understanding. Here's what I have understood:

            - the map method is used to return a button element for each tab that exists in the 'tabs' array.
            - each of those tabs have been distingusided by their index in the 'tabs' array
            - each of the arrow functions inside the onClick event handler of the buttons which represent the tabs have a reference to their respective tab, i.e. we have 3 tabs here - All, Open and Completed, and each one of them is being represented by a button element. Inside each of those button elements, an onClick event handler has been used, which has an arrow function inside it to invoke the setSelectedTab method. This arrow function which calls upon the setSelectedTab method had a reference to the current 'tab', i.e. the tab which was clicked, and was thereby able to send the value, i.e. the name of that tab to the setSelectedTab(), which then set the name of the selected tab (the selectedTab variable), and thus we saw the selected tab having the corresponding visual change rendered on the web page.
            the ternary operator logic in the className attribute of the buttons which show each of the tabs futher helps in making the selected tab show the visual changes required (a blue underline in our case) on the web page, which lets the user see which tab they have currently selected.
            Do you think my understanding and reasoning are correct? Please do ask me questions about any part that you may not be able to understand completely, if you need a better understanding of what I am trying to explain, in order to judge how well I have understood these concepts.
              GitHub Copilot
            Yes, your understanding is correct. Here's a brief confirmation and clarification of each point:
            
            Using map to Return Buttons for Each Tab:
            
            Correct. The tabs.map() function iterates over the tabs array (["All", "Open", "Completed"]) and returns a <button> element for each tab.
            Distinguishing Tabs by Their Index:
            
            Partially correct. While the index (tabIndex) is used as the key prop to help React identify each element uniquely, the important distinction comes from the tab value itself (e.g., "All", "Open", "Completed"). Each button corresponds to a specific tab value.
            Arrow Functions in onClick Event Handlers Capturing the Current tab:
            
            Correct. Each button's onClick handler is an arrow function that captures the current tab through closure. This means when the button is clicked, the handler knows exactly which tab it represents and calls setSelectedTab(tab) with the correct value.
            
            This closure ensures that even though the buttons are generated in a loop, each onClick handler retains a reference to its respective tab.
            
            Using Ternary Logic in className for Visual Changes:
            
            Correct. The ternary operator in the className attribute compares the current tab to selectedTab:
            className={
                "tab-button " + (tab === selectedTab ? "tab-selected" : "")
              }
            
            If the tab matches selectedTab, it adds the "tab-selected" class, which applies the visual change (like a blue underline) to indicate the active tab.
            
            Summary:
            
            The combination of closures in the arrow functions and the use of setSelectedTab(tab) allows the component to accurately determine which tab was clicked and update the state accordingly.
            
            The className logic dynamically applies styling based on the current state, providing immediate visual feedback to the user.
            
            Your reasoning demonstrates a solid understanding of how closures work in this context and how state and props interact in a React component. Great job!*/
              key={tabIndex}
              className={
                "tab-button " + (tab === selectedTab ? "tab-selected" : "")
              }
            >
              <h4>
                {tab} <span>{`(${numOfTasks})`}</span>
              </h4>
            </button>
          );
        })}
      </nav>
      <hr />
    </>
  );
};

export default Tabs;
