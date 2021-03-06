import React, { Component } from 'react';
import UpComingTuursList from './user-upcoming-tuurs-list';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import { ThemeProvider } from '@material-ui/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: { main: '#3A8288' },
//     secondary: { main: '#5bd1d7' },
//     lightBeige: { main: '#f1f1f1' },
//     beige: { main: '#f5e1da' }
//   }
// });

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  },
});

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      image: '',
      isGuide: undefined
    };
  }

  componentDidMount() {

    fetch(`api/profile.php?email=${ this.props.user.email }`)
    .then(res => res.json())
    .then(response => {
      return this.setState({
      name: response.name,
      location: response.location,
      image: response.image,
      isGuide: response.isGuide
      })
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      <Container className={classes.marginBottom} >
        <Typography className={classes.marginTop} variant="h4">
          {this.state.name}
        </Typography>
        <Typography className={classes.marginLeft} variant="subtitle1">
          {this.state.location}
        </Typography>
      </Container>
      <Container>
        <Grid className={classes.marginBottom} container
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={4}>
            <Avatar alt="avatar" src={this.state.image} className={classes.avatar} />
          </Grid>
          <Grid item xs={6}>
            <Button type="button" fullWidth variant="contained" color="primary" onClick={() => this.props.view('editProfile', this.props.user)} >
              <Typography variant="button">Edit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
      {this.state.isGuide===true
      ?<UpComingTuursList view={this.props.view} user={ this.props.user }/>
      :<Typography variant="h5">No Tuurs available</Typography>
      }
      </>
    );
  }
}

export default withStyles(styles)(UserProfile);
