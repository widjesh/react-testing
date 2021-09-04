import "./App.css";
import SpacingGrid from "./components/Content/SpacingGrid";
import DenseAppBar from "./components/NavBar/DenseAppBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'5rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <DenseAppBar label="My Crypto Portfolio" />
      <Box className={classes.root} component="div" whiteSpace="nowrap">
        <SpacingGrid />
      </Box>
    </div>
  );
}

export default App;
