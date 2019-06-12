import React, { Component } from 'react';
import UpComingTuursList from './user-upcoming-tuurs-list';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

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

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    if (!this.props.user || this.props.match.params.email !== this.props.user.email) {
      fetch('/api/profile.php?email=' + this.props.match.params.email)
        .then(res => res.json())
        .then(response => {
          this.setState({ user: response });
        });
    } else {
      this.setState({ user: this.props.user });
    }
  }
  render() {
    const { classes } = this.props;
    if (!this.state.user) {
      return null;
    }
    return (
    <>
    <Container className={classes.marginBottom} >
      <Typography className={classes.marginTop} variant="h4">
        {this.state.user.name }
      </Typography>
      <Typography className={classes.marginLeft} variant="subtitle1">
        {this.state.user.location}
      </Typography>
    </Container>
    <Container>
      <Grid className={classes.marginBottom} container
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={4}>
          <Avatar alt="avatar" src={this.state.user.image} className={classes.avatar} />
        </Grid>
        <Grid item xs={6}>
          <Button type="button" fullWidth variant="contained" color="primary" component={Link} to={'/edit-profile/' + this.state.user.email} >
            <Typography variant="button">Edit</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>

      {this.state.user.isGuide
        ? <UpComingTuursList view={this.props.view} user={ this.state.user }/>
        : <Typography variant="h5">No Tuurs available</Typography>
      }
      </>

    );
  }
}

export default withStyles(styles)(UserProfile);
