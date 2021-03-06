import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Paper from '@material-ui/core/Paper';
import DB from './../../../../utils/DB';
import Collapse from '@material-ui/core/Collapse';
import './styles.css';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 4,
    zIndex: '0'
  },
  body: {
    padding: '1rem'
  },
  text: {
    fontSize: '1.5rem',
  },
  breadcrumb: {
    fontSize: '1.25rem',
    padding: '1rem 0'
  },
  link: {
    textDecoration: 'none'
  },
  heartIcon: {
    transition: theme.transitions.create(
      ['color'],
      {duration: theme.transitions.duration.standard}
    ),
    '&:hover': {
      color: theme.palette.secondary.main,
    }
  },
  showbtn: {
    marginTop: '1rem'
  }

});



class Header extends React.Component {
  state = {
    favorited: this.props.favorited
  }

  
  handleClick = event => {
    const article = this.props.data
    DB.getUserData(this.props.data.user_id)
      .then(res => {
        return res.data.filter(fav => fav.page_id == article.page_id)[0];
      }).then(match => {
        if(match){
          const newfav = !match.favorited;
          DB.putFavorite(match.user_id, match.id, newfav)
            .then(res => {
            });
        }else{
          DB.postFavorite(this.props.data)
            .then(res => {
            });
        }
      }).then(() => {
        if(this.state.favorited){
          this.setState({favorited: false});
        } else {
          this.setState({favorited: true});
        }
      });
  }

  setFavorites = article => {
    DB.getFavorites(article.user_id)
      .then(res => {
        res.data.forEach(fav => {
          if (article.page_id == fav.page_id) {
            this.setState({favorited: true});
          }
        });
      });
  }

  render(){
    this.setFavorites(this.props.data);
   
    return(
      <React.Fragment>
        <Grid item>
          <Typography variant="display1">
             {this.props.title}
          </Typography>
        </Grid>
        <Grid item onClick={this.handleClick}>
          {this.state.favorited ? 
            <FavoriteIcon className={this.props.class} color="secondary" /> : 
            <FavoriteBorderIcon className={this.props.class} color="primary" />}
        </Grid>
      </React.Fragment>
    );
  }
}

const Body = props => {
  //const shortBlurb = props.body.match(/^(.*?)[.?!]\s/)[0];
  const shortBlurb2 = (function () {
    const bodyLength = props.body.length;
    if(bodyLength > 124){
      return props.body.slice(0, 124) + ' . . .';
    }
  }());

  return(
    <React.Fragment>
      <Grid item className={props.class.body}>
        <div>
          <Collapse 
            in={props.in} 
            collapsedHeight="40px"
            onClick={props.click}
          >
              <Typography className={props.class.text}>
                {props.in ? props.body : shortBlurb2}
              </Typography>
          </Collapse>
        </div>
        <Button color="primary" className={props.class.showbtn} onClick={props.click}>
            {props.in ? '...Show less': 'Show more...'}
          </Button>
      </Grid>
    </React.Fragment>
  );
}

const Foot = props => {

  return (
    <React.Fragment>
      <Grid item>
        <Typography className={props.class.breadcrumb}>
          {props.breadcrumb}
        </Typography>
      </Grid>
      <Grid item>
        <a href={props.url} target="_blank" className={props.class.link}>
          <Button variant="contained" color="secondary">
            Click Here to Read the Full Article
          </Button>
        </a>
      </Grid>
    </React.Fragment>
  );
}

class Result extends React.Component {
  state = {
    collapsed: false,
  }


  handleCollapse = () => {
    this.setState(state => ({collapsed: !state.collapsed}));
  }

  render(){
    const { classes } = this.props;
    const data = {
      id: this.props.articleId,
      user_id: this.props.userId,
      page_id: this.props.pageId,
      title: this.props.title,
      body: this.props.body,
      image: this.props.image,
      breadcrumb: this.props.breadcrumb,
      link: this.props.url,
      favorited: true
    }
    const collapsed = this.state.collapsed
    return (
      <div>
        <Paper className={classes.root}>
          <Grid container direction="row" alignItems="center" justify="center">
              {/* <Grid item xs={3}>
                Image Goes Here
              </Grid> */}
              <Grid item xs={10} container justify="space-between">
                <Header title={this.props.title} data={data} click={this.handleClick} favorited={this.props.favorited} class={classes.heartIcon}/>
              </Grid>
              <Grid item xs={10} container>
                <Body class={classes} in={collapsed} click={this.handleCollapse} body={this.props.body} />
              </Grid>
              <Grid item xs={10} container justify="space-between">
                <Foot class={classes} breadcrumb={this.props.breadcrumb} url={this.props.url}/>
              </Grid>
          </Grid>
        </Paper>
        
      </div>
    );
  } 
  
}

export default withStyles(styles)(Result);