import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import ItineraryItem from './itinerary-package-item';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ItineraryToggleButton from './itinerary-toggle';

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // expanded: false,
      packages: [],
      hostedPackages: [],
      switch: false,
      auth: [],
      loggedIn: false,
      isLoading: true
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  packageCondition() {
    const packageArray = this.state.packages.map((item, id) => {
      if (typeof item.dates === 'string') {
        const date = item.dates.replace(/[^a-zA-Z0-9-_.,:]/g, '');
        let dateArray = date.split(',');
        dateArray.sort();
        dateArray = this.dateCompleted(dateArray);
        item.dates = dateArray;
      }

      item.dates = this.dateCompleted(item.dates);
      return <ItineraryItem key={id} item={item} />;
    });
    return packageArray;
  }

  hostedPackageCondition() {
    const hostedPackageArray = this.state.hostedPackages.map((item, id) => {
      if (typeof item.dates === 'string') {
        const date = item.dates.replace(/[^a-zA-Z0-9-_.,:]/g, '');
        let dateArray = date.split(',');
        dateArray.sort();
        dateArray = this.dateCompleted(dateArray);
        item.dates = dateArray;
      }

      item.dates = this.dateCompleted(item.dates);
      return <ItineraryItem key={id} item={item} />;
    });
    return hostedPackageArray;
  }

  dateCompleted(date) {
    const currentDate = new Date();
    const firstBookDate = new Date(date[0]);
    // If booked date passed, remove date and return new array
    if (currentDate > firstBookDate) {
      date.splice(0, 1);
    }
    return date;
  }

  componentDidMount() {
    
    fetch( '/api/loginStatus.php')
      .then( res => res.json())
      .then( data => this.setState({ auth: data, loggedIn: data.loggedIn }, () => console.log( data )))

    fetch('/api/booking.php?email')
      .then(res => res.json())
      .then(packages => this.setState({ packages: packages }));

    fetch('/api/itinerary-guide.php')
      .then(res => res.json())
      .then(hostedPackages => this.setState({ hostedPackages }))
  }

  componentDidUpdate() {
    if ( !this.state.auth.length && !this.state.loggedIn && !this.state.isLoading ){
      fetch( '/api/loginStatus.php')
      .then( res => res.json())
      .then( data => this.setState({ auth: data, loggedIn: data.loggedIn, isLoading: false}))
    }
    
    if (!this.state.package && !this.state.hostedPackages) {
      fetch('/api/booking.php?email')
        .then(res => res.json())
        .then(packages => this.setState({ packages }))

      fetch('/api/itinerary-guide.php')
        .then(res => res.json())
        .then(hostedPackages => this.setState({ hostedPackages }))
    }
  }

  handleSwitch(state) {
    this.setState({ switch: state })
  }

  render() {
    let currentState;
    if ( this.state.auth.loggedIn ){
      currentState = this.state.auth.isGuide
    } 
    const { classes } = this.props;
    return (
      <>
        <Container className={classes.marginBottom}>
          <Typography className={classes.marginTop} variant="h4">
            Booked Tuurs
          </Typography>
          {/* TOGGLE **** INCLUDE ONLY IF GUIDE ****  */}
          { currentState
            ? <ItineraryToggleButton switch={this.handleSwitch} />
            : null
          }

        </Container>


        {this.state.switch
          ? <> {/* HOSTED ON TRUE */}
            <Container style={{ paddingBottom: '80px' }}>
              {this.state.packages ? this.hostedPackageCondition() : null}
            </Container>
          </>
          : <> {/* BOOKED ON FALSE */}
            <Container style={{ paddingBottom: '80px' }}>
              {this.state.packages ? this.packageCondition() : null}
            </Container>
          </>

        }


      </>
    );
  }
}

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
});

export default withStyles(styles)(Itinerary);
