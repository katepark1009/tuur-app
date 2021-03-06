import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
// import { Link, withRouter } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CardTravel from '@material-ui/icons/CardTravel';
import Message from '@material-ui/icons/Message';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserProfile from './user-profile';
import UpComingTuursList from './user-upcoming-tuurs-list';

const styles = theme => ({
  root: {
    width: '90%',
    position: 'fixed',
    bottom: 0,
    padding: 10
  }
});

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      pathMap: [
        '/user-upcoming-tuurs-list',
        '/user-profile'
      ]
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.path !== this.state.path) {
  //     this.setState({this.state.path});
  //   }
  // }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.path!==prevState.path){
  //     return {path : nextProps.path};
  //   }
  //   else return null;
  // }

  // componentWillReceiveProps(newProps) {
  //   const {pathname} = newProps.location;
  //   const {pathMap} = this.state;

  //   const value = pathMap.indexOf(pathname);

  //   if (value > -1) {
  //     this.setState({
  //       value
  //     });
  //   }
  // }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value, pathMap } = this.state;
    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        {/* <BottomNavigationAction label="Home" icon={<Home />} component={Link} to={pathMap[0]} /> */}
        {/* <BottomNavigationAction label="Favorites" icon={<FavoriteBorder />} component={Link} to={pathMap[1]} /> */}
        <BottomNavigationAction label="Itinerary" icon={<CardTravel />} component={Link} to={pathMap[0]} />
        {/* <BottomNavigationAction label="Message" icon={<Message />} component={Link} to={pathMap[3]} /> */}
        <BottomNavigationAction label="Account" icon={<AccountCircle />} component={Link} to={pathMap[1]} />
      </BottomNavigation>
    );
  }

}

export default withStyles(styles)(BottomNav);
