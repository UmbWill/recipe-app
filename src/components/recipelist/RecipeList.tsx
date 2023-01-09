import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import WaviyText from '../waviytext/WaviyText';

import './recipelist.css';
import { upperFirstChar} from '../../Utils';

const DATABASE_RECIPE = 'http://192.168.99.100:5000/recipes_list';
const DATABASE_RECIPE_IMAGE = 'http://192.168.99.100:5000/recipe_image';

export default function RecipeList(props : any){
    const [recipes, setRecipes] = useState(Array);
    const [images, setImages] = useState(Object);
    const [lastIngredients, setLastIngredients] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    
    useEffect(() => { 
        if(props.recipes === lastIngredients) 
            return;
        const dataQuery = props.recipes;
        setHasLoaded(false);
        setLastIngredients(dataQuery);
        const fetchData = async (dataQuery : string)=>{
            //console.log('data : '+ DATABASE_RECIPE+'?'+dataQuery);
            const recipesResponse = await fetch(DATABASE_RECIPE+'?'+dataQuery, {headers: {"Content-Type" : "application/json"}});
            const jsonRecipesResponse = await recipesResponse.json();
            const arrayRecipe = Array.from(jsonRecipesResponse["message"]);
            //console.log("jsonRecipesResponse: "+arrayRecipe);
            setRecipes(arrayRecipe);
        };
        if(dataQuery != "")
            fetchData(dataQuery);
        setHasLoaded(true);
    }, [props, setRecipes, setImages, setHasLoaded]);
    
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
            Object.keys(recipes).length != 0 ?
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
                                time_cook = {item.time_cook}
                                time_preparation = {item.time_preparation}
                            />
                        </Item>
                    </Grid>
                ))
                : hasLoaded?
                    <h2>A recipe with those ingredients not found.</h2>
                    : <WaviyText marginRight={"1000px"} text="Loading" />
            }
        </Grid>
    );
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
    const time_cook = props.time_cook;
    const time_preparation = props.time_preparation;

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
          subheader={
          <>
            <Stack direction="row" alignItems="center" gap={1}>
                <AvTimerIcon/>
                <Typography variant="subtitle1">{time_cook}</Typography>
                <AvTimerIcon/>
                <Typography variant="subtitle1">{time_preparation}</Typography>
            </Stack>
            <span>{upperFirstChar(course)}</span>
          </>}
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
            <Typography>Cook time: {time_cook}</Typography>
            <Typography>Preparation time: {time_preparation}</Typography>
            <hr/>
            <Typography paragraph  variant="body1" fontFamily={'Edu SA Beginner'} fontSize={"2em"}>Preparation</Typography>
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