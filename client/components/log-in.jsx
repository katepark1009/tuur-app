import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { Redirect, Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    inherit: { main: '#f1f1f1' },
    default: { main: '#f5e1da' }
  }
});

const imgStyle = {
  width: '100%',
  height: '70px',
  backgroundRepeat: 'norepeat',
  backgroundSize: '100% 100%',
  '&:hover': {
    opacity: 1
  }
};
const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(2)
  },
  marginLeft: {
    marginLeft: -5
  },
  margin: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  newtitle: {
    height: 60,
    backgroundColor: '#61b5bc',
    color: 'white',
    fontSize: '2rem',
    paddingTop: '3%',
    textAlign: 'center',
    fontFamily: 'Montserrat , sans-serif'
  }
});

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      auth: false,
      user: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/profile.php?login=${this.state.email}`)
      .then(res => res.json())
      .then(data => {
        if (data.auth) {
          this.props.logIn(data);
        }
      }
      );
  }
  render() {
    const { classes } = this.props;
    if (this.state.auth) {
      return <Redirect to={{
        pathname: '/user-profile/' + this.state.email,
        state: { user: this.state }
      }}
      />;
    }
    return (
    <>
    <div style = {{ fontSize: 0 }}>
    <div className={classes.newtitle}>tuur</div>
      <img style={{ width: '100%', height: '220px' }} src="https://cdn.pixabay.com/photo/2016/11/18/19/40/adventure-1836601_1280.jpg" alt="mainImage"/>
    </div>
      <Grid justify="center" alignItems="center" container>
        <Typography className={classes.marginTop} variant="h5" gutterBottom style={{fontFamily: 'Montserrat , sans-serif', fontWeight: '700'}}>
        Welcome back
        </Typography>
      </Grid>
      <Grid className={classes.marginTop} container justify="center" alignItems="flex-end">
        <Grid item xs={10}>
          <TextField onChange={this.handleInputChange} required fullWidth id="input-email" label="email" name="email" />
        </Grid>
      </Grid>

      <Grid className={classes.marginTop} container justify="center" alignItems="flex-end">
        <Grid item xs={8}>
          <ThemeProvider theme={theme}>
            <Button type="submit" className={classes.marginTop} onClick={ this.handleSubmit } fullWidth variant="contained" color="primary">
              <Typography variant="body1" gutterBottom>log in</Typography>
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid className={classes.marginTop} container justify="center" alignItems="flex-end">
        <Grid item xs={7}>
          <Typography className={classes.margin} variant="button" gutterBottom align="center">
            Don't have an account? </Typography>
        </Grid>
        <Grid item xs={3}>
          <ThemeProvider theme={theme}>
            <Typography className={classes.marginLeft} color="primary" variant="button" align="center" component={Link} style={{ textDecoration: 'none' }} to={'/sign-up'}>sign up</Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
    );
  }
}

export default withStyles(styles)(LogIn);
