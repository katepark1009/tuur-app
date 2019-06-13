
import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UpComingTuurItem from './user-upcoming-tuurs-list-item';
import GridList from '@material-ui/core/GridList';
import GuidePackageList from './user-view-guide-profile-item';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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
    marginTop: theme.spacing(3),
    paddingLeft: '20px'
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
  paddingRight: {
    paddingRight: 20
  }
});

class GuidePackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      packages: []
    };
  }

  componentDidMount() {
    console.log('compoent did mount', this.props);
  }

  componentDidUpdate() {
    if (!this.state.packages.length && !this.state.userEmail) {
      fetch('/api/guidePackages.php?email=' + this.props.guideInfo.email)
        .then(res => res.json())
        .then(packages => this.setState({ userEmail: this.props.guideInfo.email, packages }));
    }
  }

  render() {
    const { classes } = this.props;
    const packageMap = this.state.packages.map((packageItem, id) => {
      return <GuidePackageList key={id} package={packageItem} />;
    });
    return (
      <>
        <Container className={classes.marginBottom} >
          <Typography className={classes.marginTop} variant="h4">
            Packages
          </Typography>
        </Container>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={1.5} cellHeight={300}>
            {packageMap}
          </GridList>
        </div>
      </>

    );
  }

}

export default withStyles(styles)(GuidePackages);
