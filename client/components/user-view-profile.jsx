
import React, { Component } from 'react';
import UpComingTuursList from './user-upcoming-tuurs-list';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import GuidePackages from './user-view-guide-profile';

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
      email: ''
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
          email
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
            isGuide: response.isGuide
          });
        });
    }

  }

  render() {
    const { classes } = this.props;
    if (!this.state) return null;
    return (
      <>
      <Container className={classes.marginBottom} >
        <Typography className={classes.marginTop} style={{ paddingLeft: '16px' }} variant="h4">
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
            <Typography variant="button">{this.state.bio}</Typography>
          </Grid>
        </Grid>
      </Container>
      <GuidePackages path={this.props.path} guideInfo={this.state} />
      {/* {this.state.isGuide
        ? <UpComingTuursList view={this.props.view} user={ this.props.user } isGuide={this.state.isGuide}/>
        : <Typography variant="h5">No Tuurs available</Typography>
      } */}
      </>
    );
  }
}

export default withStyles(styles)(UserViewProfile);
