import React, {useState} from 'react';
//import Modal from 'react-modal';
import { 
    FormControl, 
    //FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio,
    Checkbox, 
} from '@mui/material';

import {
    Sidebar,
    Menu, 
    MenuItem,
    SubMenu,
    useProSidebar, 
} from "react-pro-sidebar";

import "./sidebar.css"

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
    const [curCourse, setCurCourse] = useState("antipasto");
    const [curMeats, setCurMeats] = useState(setInitialState(meats));
    const [curFishes, setCurFishes] = useState(setInitialState(fishes));
    const [curVegetables, setCurVegetables] = useState(setInitialState(vegetables));
    const [curFruits, setCurFruits] = useState(setInitialState(fruits));
    const [curOthers, setCurOthers] = useState(setInitialState(others));
    const [activeItem, setActiveItem] = useState("");
    const { collapseSidebar } = useProSidebar();

    

    const onClickMenuIcon = () => {
        collapseSidebar();
    };

    const searchRecipe = () => {
        //console.log(course);
        props.search({
            "course" : curCourse,
            "meats" :  curMeats,
            "fishes" : curFishes,
            "vegetables" : curVegetables,
            "fruits" : curFruits,
            "others" : curOthers,
        });
    }

    const handleChangesOnIngredients = (event : React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked);
        switch(event.target.name){
            case "course":
                setCurCourse(event.target.value);
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
    
    const upperFirstChar = (s : string) => {
        let curString = s.replace('_', ' ');
        return curString.charAt(0).toUpperCase() + curString.slice(1);
    }

    /*const lowerAndReplace = (s : string) => {
        let curString = s.replace(/\D/g, '');
        curString.toLowerCase();
        return curString;
    }*/

    return (
        <>
            <div id="header">
                <Sidebar >
                    <Menu
                        menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            return {
                              fontSize: 20,
                              color: disabled ? '#f5d9ff' : '#d359ff',
                              backgroundColor: active ? '#ehcef9' : undefined,
                            };
                        },
                      }}
                    >
                        <SubMenu label="Courses" active={activeItem === "course"}  onClick={()=>{setActive("course");}}>
                        <FormControl>
                            <RadioGroup
                                className='radiogroup'
                                value={curCourse} 
                                onChange={handleChangesOnIngredients}
                            >
                                {
                                    courses.map((course : string) => {
                                        return <FormControlLabel name = "course" value={course} control={<Radio size="small"/>} label={upperFirstChar(course)} />
                                    } )
                                }
                                
                            </RadioGroup>
                            </FormControl>
                        </SubMenu>
                        <SubMenu label="Ingredients" active={activeItem === "ingredients"}  onClick={()=>{setActive("ingredients");}}>
                            <SubMenu label="Meat">
                                <FormControl>
                                    {  
                                        meats.map((meat : string) => {
                                            return <FormControlLabel name = "meat" value={meat} control={<Checkbox size="small"/>} label={upperFirstChar(meat)} />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                            <SubMenu label="Fish">
                                <FormControl>
                                    {  
                                        fishes.map((fish : string) => {
                                            return <FormControlLabel name = "fish" value={fish} control={<Checkbox size="small"/>} label={upperFirstChar(fish)} />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                            <SubMenu label="Vegetables">
                                <FormControl>
                                    {  
                                        vegetables.map((vegetable : string) => {
                                            return <FormControlLabel name = "vegetable" value={vegetable} control={<Checkbox size="small"/>} label={upperFirstChar(vegetable)} />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                            <SubMenu label="Fruits">
                                <FormControl>
                                    {  
                                        fruits.map((fruit : string) => {
                                            return <FormControlLabel name = "fruit" value={fruit} control={<Checkbox size="small"/>} label={upperFirstChar(fruit)} />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                            <SubMenu label="Others">
                                <FormControl>
                                    {  
                                        others.map((other : string) => {
                                            return <FormControlLabel name = "other" value={other} control={<Checkbox size="small"/>} label={upperFirstChar(other)} />
                                        })
                                    }
                                </FormControl>
                            </SubMenu>
                        </SubMenu>
                        <MenuItem onClick={searchRecipe}>Search</MenuItem>
                    </Menu>
                </Sidebar>  
                <main>
                    <button onClick={onClickMenuIcon}>Collapse</button>
                </main> 
            </div>
        </>
    );
}