import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import GuidePackages from './user-view-guide-profile';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(2)
  },
  avatar: {
    width: '120px',
    height: '120px'
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
    color: 'gray'
  },
  bio: {
    paddingLeft: '20px'
  },
  fontSize: {
    fontSize: '54px',
    color: '#222c23'
  }
});

class UserViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      image: '',
      isGuide: undefined,
      email: '',
      bio: ''
    };
  }

  componentDidMount() {
    const email = this.props.match.params.email;
    fetch('/api/profile.php?email=' + email)
      .then(res => res.json())
      .then(response => {
        this.setState({
          name: response.name,
          location: response.location,
          image: response.image,
          isGuide: response.isGuide,
          email,
          bio: response.bio
        });
      });
  }

  componentDidUpdate() {
    if (!this.state.name) {
      const email = this.props.match.params.email;
      fetch('/api/profile.php?email=' + email)
        .then(res => res.json())
        .then(response => {
          this.setState({
            name: response.name,
            location: response.location,
            image: response.image,
            isGuide: response.isGuide,
            bio: response.bio
          });
        });
    }

  }

  render() {
    const { classes } = this.props;
    if (!this.state) return null;
    console.log(this.state, 'moo');
    return (
      <>
        <Grid item xs={2} className={classes.paddingRight} name='back' component={Link} to={'/results/'}>
          <KeyboardArrowLeft className={classes.fontSize} />
        </Grid>
      <Container className={classes.marginBottom} >
        <Typography className={classes.marginTop} style={{ paddingLeft: '16px' }} variant="h4">
          {this.state.name}
        </Typography>
        <Typography className={classes.marginLeft} variant="h6">
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
          <Grid item xs={8} className={classes.bio}>
            <Typography variant="subtitle1">{this.state.bio}</Typography>
          </Grid>
        </Grid>
      </Container>
      <GuidePackages guideInfo={this.state} />
      {/* {this.state.isGuide
        ? <UpComingTuursList view={this.props.view} user={ this.props.user } isGuide={this.state.isGuide}/>
        : <Typography variant="h5">No Tuurs available</Typography>
      } */}
      </>
    );
  }
}

export default withStyles(styles)(UserViewProfile);
