import React, {useState, useEffect} from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Box } from "@mui/material";
//import logo from './logo.svg';
import './App.css';
import RecipeSidebar from './components/sidebar/Sidebar'
import RecipeList from './components/recipelist/RecipeList';


function RecipeApp() {
  

  const arrCourses = ["antipasto", "first_course", "main_course", "side_dish", "dessert", "fruits"];
  const arrMeats = ["red", "white"];
  const arrFishes = ["tuna", "salmon", "shrimp"];
  const arrVegetables = ["tomato", "carrot", "potato", "pepper", "spinach"];
  const arrFruits = ["banana", "apple", "orange", "blueberry", "strawberry"];
  const arrOthers = ["chocolate", "milk", "green_pea", "mushroom", "onion", "honey"];
  const [curIngredients, setCurIngredients] = useState(Object);


  const useCallback = function ( ingredients : Object){
    console.log("App " + JSON.stringify(ingredients));
    setCurIngredients(ingredients);
  }

  return (
    <div className="RecipeApp">
        <header>
        <svg viewBox="0 0 960 300">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="80%">Cooking at home!</text>
          </symbol>
          <text textAnchor="middle" x="50%" y="80%">Cooking at home!</text>
          <g className = "g-ants">
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
          </g>
        </svg>
        </header>
        <main>
          <Box  sx={{ display: "flex" }}>
            <Box>
              <RecipeSidebar 
                search = {useCallback}
                courses = {arrCourses}
                meats = {arrMeats}
                fishes = {arrFishes}
                vegetables = {arrVegetables}
                fruits = {arrFruits}
                others = {arrOthers}
              />
            </Box>
            <Box className='main-site'>
              <section>
              {
                Object.keys(curIngredients).length !== 0 ? 
                  <RecipeList recipes = {curIngredients}></RecipeList>
                :  <h2>Choose your ingredients.</h2> 
              }
              </section>
            </Box>
          </Box>    
        </main>
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
