import React, {useState} from 'react';
import Typography from '@mui/material/Typography';

//import Modal from 'react-modal';
import { 
    FormControl, 
    FormControlLabel, 
    Checkbox, 
} from '@mui/material';

import {
    Sidebar,
    Menu, 
    MenuItem,
    SubMenu,
   // useProSidebar, 
} from "react-pro-sidebar";

import "./sidebar.css";
import {upperFirstChar} from "./../../Utils";

export default function RecipeSidebar(props : any){
    
    const setInitialState = (state : Array<string>) => {
        return state.reduce(
            (obj, item) => Object.assign(obj, { [item]: false }), {});
    }

    const courses = props.courses;
    const meats = props.meats;
    const fishes = props.fishes;
    const vegetables = props.vegetables;
    const fruits = props.fruits;
    const others = props.others;
    const [curCourse, setCurCourse] = useState(setInitialState(courses));
    const [curMeats, setCurMeats] = useState(setInitialState(meats));
    const [curFishes, setCurFishes] = useState(setInitialState(fishes));
    const [curVegetables, setCurVegetables] = useState(setInitialState(vegetables));
    const [curFruits, setCurFruits] = useState(setInitialState(fruits));
    const [curOthers, setCurOthers] = useState(setInitialState(others));
    const [activeItem, setActiveItem] = useState("");
    //const { collapseSidebar } = useProSidebar();
    const [lastIngredients, setLastIngredients] = useState(Object);

    

   // const onClickMenuIcon = () => {
   //     collapseSidebar();
   // };

    const searchRecipe = () => {
        //console.log(course);
        const ingredients = {
            "courses": curCourse,
            "meats": curMeats,
            "fishes": curFishes,
            "vegetables": curVegetables,
            "fruits": curFruits,
            "others": curOthers,
        };

        if(lastIngredients === JSON.stringify(ingredients)){
            console.log("Same ingredients.");
            return;
        }
        //console.log("calls search");
        setLastIngredients(ingredients);
        props.search(ingredients);
    }

    const handleChangesOnIngredients = (event : React.ChangeEvent<HTMLInputElement>) => {
        //console.log(event.target.checked);
        switch(event.target.name){
            case "course":
                setCurCourse({
                    ...curCourse,
                    [event.target.value]: event.target.checked,
                });
                break;
            case "meat":
                setCurMeats({
                    ...curMeats,
                    [event.target.value]: event.target.checked,
                });
                break;
            case "fish":
                setCurFishes({
                    ...curFishes,
                    [event.target.value]: event.target.checked,
                });
                break;
            case "vegetable":
                setCurVegetables({
                    ...curVegetables,
                    [event.target.value]: event.target.checked,
                });
                break;
            case "fruit":
                setCurFruits({
                    ...curFruits,
                    [event.target.value]: event.target.checked,
                });
                break;
            case "other":
                    setCurOthers({
                        ...curOthers,
                        [event.target.value]: event.target.checked,
                    });
                    break;
            default:
                console.log(event.target.name);
                break;
        }
        
        
    }

    const setActive = (currentItem : string) => {
        if(currentItem === activeItem)
            setActiveItem("");
        else
            setActiveItem(currentItem);
    }
    
    return (
        <>
            <div id="header">
                <Sidebar className="sidebar">
                    <Menu
                        menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            return {
                              fontSize: '2.4em',
                              fontFamily: 'Tangerine',
                              //color: disabled ? '#f5d9ff' : '#d359ff',
                              //backgroundColor: active ? '#ehcef9' : undefined,
                            };
                        },
                      }}
                    >
                        <SubMenu label="Courses">
                                <FormControl>
                                    {  
                                        courses.map((course : string) => {
                                            return <FormControlLabel name = "course" key={course} value={course} 
                                            control={<Checkbox
                                                size="small"
                                                onChange={handleChangesOnIngredients}
                                            />} 
                                            label={<Typography fontFamily={"Edu SA Beginner"} fontSize={"1.3em"}>{upperFirstChar(course)}</Typography>}  
                                            />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                        <SubMenu label="Ingredients" active={activeItem === "ingredients"}  onClick={()=>{setActive("ingredients");}}>
                            <SubMenu label="Meat">
                                <FormControl>
                                    {  
                                        meats.map((meat : string) => {
                                            return <FormControlLabel name = "meat" key={meat} value={meat} 
                                            control={<Checkbox
                                                size="small"
                                                onChange={handleChangesOnIngredients}
                                            />} 
                                            label={<Typography fontFamily={"Edu SA Beginner"} fontSize={"1.3em"}>{upperFirstChar(meat)}</Typography>} 
                                            />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                            <SubMenu label="Fish">
                                <FormControl>
                                    {  
                                        fishes.map((fish : string) => {
                                            return <FormControlLabel name = "fish" key={fish} value={fish} 
                                            control={<Checkbox 
                                                size="small"
                                                onChange={handleChangesOnIngredients}
                                            />}
                                            label={<Typography fontFamily={"Edu SA Beginner"} fontSize={"1.3em"}>{upperFirstChar(fish)}</Typography>}
                                             />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                            <SubMenu label="Vegetables">
                                <FormControl>
                                    {  
                                        vegetables.map((vegetable : string) => {
                                            return <FormControlLabel name = "vegetable" key={vegetable} value={vegetable}
                                            control={<Checkbox
                                                size="small"
                                                onChange={handleChangesOnIngredients}
                                            />}
                                            label={<Typography fontFamily={"Edu SA Beginner"} fontSize={"1.3em"}>{upperFirstChar(vegetable)}</Typography>} 
                                            />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                            <SubMenu label="Fruits">
                                <FormControl>
                                    {  
                                        fruits.map((fruit : string) => {
                                            return <FormControlLabel name = "fruit" key={fruit} value={fruit} 
                                            control={<Checkbox 
                                                size="small"
                                                onChange={handleChangesOnIngredients}
                                            />}
                                            label={<Typography fontFamily={"Edu SA Beginner"} fontSize={"1.3em"}>{upperFirstChar(fruit)}</Typography>} 
                                            />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                            <SubMenu label="Others">
                                <FormControl>
                                    {  
                                        others.map((other : string) => {
                                            return <FormControlLabel name = "other" key={other} value={other} 
                                            control={<Checkbox
                                                size="small"
                                                onChange={handleChangesOnIngredients}
                                            />}
                                            label={<Typography fontFamily={"Edu SA Beginner"} fontSize={"1.3em"}>{upperFirstChar(other)}</Typography>}
                                            />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                        </SubMenu>
                        <MenuItem onClick={searchRecipe}>Search</MenuItem>
                    </Menu>
                </Sidebar>  
            </div>
        </>
    );
}