import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'

import './recipelist.css';

const DATABASE_RECIPE = 'http://192.168.99.100:5000/recipes_list';
const DATABASE_RECIPE_IMAGE = 'http://192.168.99.100:5000/recipe_image';

export default function RecipeList(props : any){
    const [recipes, setRecipes] = useState(Array);
    const [images, setImages] = useState(Object);
  //  const [data, setData] = useState("");
    const [lastIngredients, setLastIngredients] = useState("");
    
    useEffect(() => { 
        if(JSON.stringify(props.recipes) === lastIngredients) 
            return;
        setLastIngredients(JSON.stringify(props.recipes));
        const d = createData(props.recipes);
        //setData(d);
        const fetchData = async (d : string)=>{
            console.log('data : '+ DATABASE_RECIPE+'?'+d);
            const recipesResponse = await fetch(DATABASE_RECIPE+'?'+d, {headers: {"Content-Type" : "application/json"}});
            const jsonRecipesResponse = await recipesResponse.json();
            const arrayRecipe = Array.from(jsonRecipesResponse["message"]);
            console.log("jsonRecipesResponse: "+arrayRecipe);
            setRecipes(arrayRecipe);
            /*var imagesObject = {};
            imagesObject = arrayRecipe.map(async (item:any)=>{
                const id = item.id;
                console.log("recipe id = "+id);
                const imageResponse = await fetch(DATABASE_RECIPE_IMAGE+'?recipe_id='+id);
                const jsonImageResponse = await imageResponse.json();
                //console.log("Image : "+jsonImageResponse["ImageBytes"]);
                return { [id] : jsonImageResponse["ImageBytes"]};;
            });
            setImages(imagesObject);*/
        };
        fetchData(d);
    }, [props, setRecipes, setImages]);
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        marginRight: 1000,
        minWidth: 350,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return(
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      
            {
            Object.keys(recipes).length === 0 ?
            <h2>A recipe with those ingredients not found.</h2> 
            : 
            recipes.map((item : any)=>(
                <Grid item xs={12} sm={6} md={4} key={item.name}>
                    <Item key={item.name}>
                        <RecipeReviewCard
                            key = {item.name}
                            name = {item.name}
                            recipe_id = {item.id} 
                            description = {item.description}
                            howto_prepare = {item.howto_prepare}
                            course = {item.course}
                        />
                    </Item>
                </Grid>
            ))
            
            }
        </Grid>
    );
}

function RecipeDescription(props : any){
    const name = props.name;
    const description = props.description;

    return(
        <div className = "recipedescription">
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
}

function createData(ingredients : Object){
    var data = "";
    var courses = "";
    for(const [key, value] of Object.entries(ingredients)){
        if(key == 'courses'){
            for(const [key_c, value_c] of Object.entries(value)){
                if(value_c === true){
                    if(courses.length > 0) courses += ",";
                    courses += key_c;
                } 
            }
            if(courses.length > 0)
                data += "course="+courses;
        }
        else if(value === true){
            if(data.length > 0) data += "&";
            data += key+"="+value;
        } 
        else if(typeof(value) == 'object'){
            const ricData = createData(value); 
            if(data.length > 0 && ricData.length > 0) data += "&";
            data += ricData;
        }  
    }
    return data;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  
  function RecipeReviewCard(props : any) {
    const [expanded, setExpanded] = React.useState(false);
    const name = props.name;
    const description = props.description;
    const howto_prepare = props.howto_prepare.split(';');
    const course = props.course;
    const recipe_id = props.recipe_id;

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Card sx={{ maxWidth: 400, minWidth: 350 }} style={{display: 'inline-block'}}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
          subheader={course}
        />
        <CardMedia
          component="img"
          height="194"
          image = {`http://192.168.99.100:5000/recipe_image?recipe_id=${recipe_id}`}
          alt={name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Preparation</Typography>
            {
                howto_prepare.map((item : string, index : number) => (
                    <Typography paragraph key={index}>
                        {item}
                    </Typography>           
                ))
            }
           </CardContent>
        </Collapse>
      </Card>
    );
  }