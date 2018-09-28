import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navbar from './../../Navbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Logo from './../../Logo';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  toolbar: theme.mixins.toolbar, 
  jumbo: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 7,
    paddingBottom: theme.spacing.unit * 7,
    backgroundColor: theme.palette.primary.light
  },
  margins: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  bigLogo: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit * 2,
    fontSize: '150px',
    
  }, 
  bodytext: {
    fontSize: '12px'
  }
});

const Landing = props => {
  const { classes } = props;
  return(
    <div>
      <Navbar/>
      <Grid container direction="row" alignItems="center" justify="center" className={classes.jumbo}>
        <Grid item>
            <Typography variant="display3">
              Wiki Walking Tours
            </Typography>
            <Typography variant="display1">
              Walk n' Learn
            </Typography>
        </Grid>
        <Grid item>
          <Logo color="primary" class={classes.bigLogo}/>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={8}>
          <Typography variant="display2" align="center" className={classes.margins}>
            About us
          </Typography>
          <Typography variant="body1" align="center" className={classes.bodytext}>
            Have you ever been in a new city wondering what's around? You're traveling to amazing places with a deep history that's right in front of you but you have no way of knowing it? Or maybe you find yourself between flights with a full day layover, finding yourself with an impromtu mini vacation but nowhere to go. We built an app just for that!
             <br /><br />
             With Wiki Walking Tours you can easily find Wikipedia articles of cool places near you. Alternatively you can plan your tour by entering your travel location and saving the places you want to see.
             <br /><br />
             Life happens, and we don't want you to miss a moment of it!
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item>
        <Button color="secondary" variant="contained" className={classes.margins}>Click here to Login or Signup!</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Landing);