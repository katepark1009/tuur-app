
import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UpComingTuurItem from './user-upcoming-tuurs-list-item';
import GridList from '@material-ui/core/GridList';
import BookedTuurs from './user-booked-tuurs-list-item';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#A6C7C8' },
    inherit: { main: '#A0C3C5' },
    default: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
  },
  cardContainer: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    padding: 10,
    width: '40rem'
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: theme.spacing(1)
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    margin: theme.spacing(2),
    height: 260
  },
  margin: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  marginTop2: {
    marginTop: theme.spacing(4)
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
});

class UpComingTuursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      packages: [],
      booked: []
    };
  }

  getBooked() {
    if (this.state.isGuide) {
      fetch('/api/guideBooked.php')
        .then(res => res.json())
        .then(booked => this.setState({ booked }));
    } else {
      fetch('/api/tuuristBooked.php')
        .then(res => res.json())
        .then(booked => this.setState({ booked }));
    }
  }

  getCreatedPackages() {
    fetch('/api/package.php?email')

      .then(res => res.json())
      .then(packages => this.setState({ packages }));
  }

  componentDidMount() {
    this.getBooked();
    this.getCreatedPackages();

  }

  componentDidUpdate() {
    console.log( '-----', this.state.packages, this.state.booked )
    if (!this.state.packages.length && !this.state.booked.length) {
      console.log( 'reload to get packages' );
      this.getBooked();
      this.getCreatedPackages();
    }

  }

  render() {
    const { classes } = this.props;
    const bookedMap = this.state.booked.map((bookedItem, id) => {
      return <BookedTuurs key={id} booked={bookedItem} />;
    });
    const packageMap = this.state.packages.map((packageItem, id) => {
      return <UpComingTuurItem key={id} package={packageItem} />;
    });
    return (
      <>
        {/* BOOKED PACKAGES */}
        <Container className={classes.marginBottom} >
          <Typography className={classes.marginTop} variant="h5">
            Booked Packages
          </Typography>
        </Container>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={1.5} cellHeight={300}>
            {bookedMap}
          </GridList>
        </div>

        {/* CREATED PACKAGES / GUIDES ONLY */}
        {
          this.props.user.isGuide
            ? <>
            <Container className={classes.marginBottom} >
              <Typography className={classes.marginTop} variant="h5">
                Packages
              </Typography>
            </Container>
            <div className={classes.root} style={{ paddingBottom: '80px' }}>
              <GridList className={classes.gridList} cols={1.5} cellHeight={300}>
                {packageMap}
              </GridList>
            </div>
            </>
            : null
        }

      </>

    );
  }

}

export default withStyles(styles)(UpComingTuursList);
