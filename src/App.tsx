import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import logo from './logo.svg';
import './App.css';
import RecipeSidebar from './components/sidebar/Sidebar'



function RecipeApp() {
  const callback = (input : Object) => {
    console.log("App " + JSON.stringify(input));
  }

  const arrCourses = ["antipasto", "first_course", "main_course", "side_dish", "dessert", "fruits"];
  const arrMeats = ["red", "white"];
  const arrFishes = ["tuna", "salmon", "shrimp"];
  const arrVegetables = ["tomato", "carrot", "potato", "pepper", "spinach"];
  const arrFruits = ["banana", "apple", "orange", "blueberry", "strawberry"];
  const arrOthers = ["chocolate", "milk", "green_pea", "mushroom", "onion"];

  return (
    <div className="RecipeApp">
        <h1>Coocking at home</h1>
        <RecipeSidebar 
          search = {callback}
          courses = {arrCourses}
          meats = {arrMeats}
          fishes = {arrFishes}
          vegetables = {arrVegetables}
          fruits = {arrFruits}
          others = {arrOthers}
        />
    </div>
  );
}

function App(){
  return(
    <ProSidebarProvider>
      <RecipeApp/>
    </ProSidebarProvider>
  );
}

export default App;
