import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ThemeProvider } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import DateRangePicker from '../date-range-picker';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MatGeocoder from 'react-mui-mapbox-geocoder';
import { Link } from 'react-router-dom';
import Mapbox from './mapbox';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#A6C7C8' },
    inherit: { main: '#A0C3C5' },
    default: { main: 'white' }
  }
});

const styles = theme => ({
  grow: {
    flexGrow: 1,
    display: 'inline-block'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    },
    display: 'inline-block'
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  appBar: {
    display: 'inline-block',
    paddingBottom: 8,
    paddingTop: 5,
    margin: 0,
    paddingLeft: 5
  },
  display: {
    display: 'inline-block',
    paddingBottom: 5,
    margin: 0,
    paddingLeft: 30,
    whiteSpace: 'nowrap'
  },
  buttonDiv: {
    display: 'inline-block',
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: '#A6C7C8',
    '&.active, &:hover, &.active:hover': {
      backgroundColor: '#A6C7C8'
    }
  },
  buttonContainer: {
    paddingLeft: 15
  },
  paper: {
    position: 'absolute',
    width: 380,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 7,
    outline: 'none'
  },
  subtitle: {
    fontSize: 20
  },
  width: {
    width: 0,
    opacity: 0,
    position: 'absolute'
  },
  searchStyle: {
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 2
  },
  textField: {
    backgroundColor: 'white',
    padding: 5,
    marginLeft: 5,
    borderRadius: '7px'
  },
  marginLeft: {
    marginLeft: 20,
    paddingTop: 3
  },
  inputContainer: {
    paddingLeft: 15
  }
});

const categories = [
  'Food',
  'Shopping',
  'Coffee',
  'Outdoors',
  'Nightlife',
  'Activities'
];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // toggle: this.props.toggleStatus,
      openModal: false,
      tags: [],
      dates: {
        start: null,
        end: null
      },
      location: {
        name: this.props.location.name,
        coordinates: this.props.location.coordinates,
        toggleStatus: this.props.toggleStatus
      },
      searchParameters: {
        name: '',
        coordinates: []
      }
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDates = this.handleDates.bind(this);

  }
  handleSelect(result) {
    this.setState({
      searchParameters: {
        name: result.place_name,
        coordinates: result.geometry.coordinates
      }
    });
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({
      tags: value
    });
  }

  handleToggle(event) {
    let newState = {
      ...this.state,
      location: {
        ...this.state.location,
        toggleStatus: !this.state.location.toggleStatus
      }
    };

    this.setState(newState);
    if (this.state.location.toggleStatus) {
      <Link to={{
        pathname: '/mapbox/' + this.state.location.name,
        state: {
          location: this.state.location
        }
      }}>Mapbox</Link>;
    } else {
      <Link to={{
        pathname: '/results/' + this.state.location.name,
        state: {
          location: this.state.location
        }
      }}>Results</Link>;
    }
  }

  handleModalClose(dates) {
    let startDate = dates.start;
    let endDate = dates.end;
    this.setState({
      openModal: false,
      dates: { start: startDate, end: endDate }
    });
  }
  modalClose() {
    this.setState({ openModal: false });
  }
  handleDates() {
    this.props.handleDates(this.state.dates);
  }
  handleSearch() {
    this.setState({
      location: { ...this.state.location, tags: this.state.tags }
    }, () => {
      let locationParam = this.state.searchParameters.name ? this.state.searchParameters : this.state.location;
      this.props.handleSearch(locationParam, this.state.tags, this.state.dates);
    });

  }
  render() {
    const geocoderApiOptions = {
      country: 'us',
      proximity: { longitude: -118.243683, latitude: 34.052235 }
    };
    const { classes } = this.props;
    return (
      <>
        <ThemeProvider theme={theme}>
          <AppBar position="static" justify="center" color="primary" className={classes.appBar}>
            <Grid container className={classes.inputContainer} >
              <Grid item xs={8} className={classes.appBar} >
                <MatGeocoder
                  inputPlaceholder="Where do you want to go?"
                  accessToken={'pk.eyJ1IjoiamVub25nMTkiLCJhIjoiY2p2MzJoZHFoMDIxejQ0czNvYXF2azNnNSJ9.El0sFq0rePnWEbFC4RwVTQ'}
                  showLoader={true}
                  autocomplete={true}
                  fuzzyMatch={true}
                  {...geocoderApiOptions}
                  onSelect={this.handleSelect}
                  inputTextFieldProps={{
                    fullWidth: true,
                    classes: {
                      root: classes.textField
                    }
                  }}
                  showInputContainer={false}
                  inputClasses={{
                    root: classes.input
                  }}
                  inputContainerProps={{
                    classes: {
                      root: classes.textField
                    }
                  }}
                />
              </Grid>
              <Grid item xs={2} className={classes.appBar}>
                <Button className={classes.marginLeft} type="submit" variant="contained" onClick={this.handleSearch} color="default" style={{ fontSize: '1.1rem', padding: 3 }}>Go</Button>
              </Grid>
            </Grid>

            <Grid container className={classes.buttonContainer}>
              <Grid item xs={3} className={classes.buttonDiv}>
                <Button type="submit" className={classes.button} fullWidth variant="contained" color="secondary" onClick={() => this.setState({ openModal: true })}>Dates</Button>
              </Grid>

              <Grid item xs={3}>
                <Button type="submit" className={classes.button} fullWidth variant="contained" color="secondary">Filter
                  <Select
                    className={classes.width}
                    multiple
                    value={this.state.tags}
                    onChange={this.handleChange}
                  >
                    {categories.map(name => (
                      <MenuItem key={name} value={name}>
                        <Typography className={classes.subtitle} variant="subtitle2" align="left" gutterBottom>
                          {name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Button>
              </Grid>

              <Grid item xs={3} className={classes.display}>
                <FormControlLabel control={
                  <Switch checked={this.state.location.toggleStatus} onChange={event => this.handleToggle(event)} />} label={this.state.location.toggleStatus ? 'TO LIST' : 'TO MAP'} />
              </Grid>
            </Grid>
          </AppBar>
        </ThemeProvider>

        <Grid item xs={10}>
          <Modal
            aria-labelledby="date-range-picker"
            aria-describedby="date-range"
            open={this.state.openModal}
            onClose={() => this.handleModalClose(this.state.dates)}
          >
            <Grid className={classes.paper}>
              <DateRangePicker key={this.state.title} close={this.handleModalClose} modalClose={this.modalClose} />
            </Grid>
          </Modal>
        </Grid>
        {this.state.location.toggleStatus ? <Mapbox path={this.props.path} dates={this.props.dates} tags={this.props.tags} location={this.props.location} /> : ''}
      </>
    );
  }
}

export default withStyles(styles)(SearchBar);
