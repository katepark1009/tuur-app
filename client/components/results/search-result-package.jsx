import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SearchPackageItem from './search-result-package-item';
import TOKEN from './mapbox-token';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
});

class SearchPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      fetchResult: null,
      fetchCoordinates: [],
      filteredTuurs: [],
      dates: {
        start: null,
        end: null
      },
      tags: [],
      isLoading: true
    };

    this.fetchPackages = this.fetchPackages.bind(this);
    this.filterDates = this.filterDates.bind(this);
    this.filterTags = this.filterTags.bind(this);
    this.filterTuurs = this.filterTuurs.bind(this);
    this.checkAvailability = this.checkAvailability.bind(this);
  }

  componentDidMount() {
    this.fetchPackages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tags.toString() !== this.props.tags.toString()) {

      this.setState({
        tags: this.props.tags,
        isLoading: !this.state.isLoading
      }, this.fetchPackages);
    } else if (this.props.dates.start !== prevProps.dates.start) {
      this.fetchPackages();
    }
  }

  fetchPackages() {
    fetch('/api/package.php')
      .then(res => res.json())
      .then(packages => {
        this.fetchLocation(packages)
      });
  }

  renderPackage() {
    const packages = this.state.filteredTuurs.map((item, id) => {
      return <SearchPackageItem key={id} item={ item.tuur } />;
    });
    return packages;
  }

  async getTuurLocationData(tuur) {
    const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${tuur.location}.json?access_token=${TOKEN}`);
    const respJson = await resp.json();
    return {
      tuur,
      coord: respJson.features[0].center
    };
  }

  mapTuurs(fetchCoordinates, packages) {
    let mapArray = packages.map(this.getTuurLocationData);

    Promise.all(mapArray).then(tuurCoordinates => this.filterTuurs(fetchCoordinates, packages, tuurCoordinates));
  }
  fetchLocation(packages) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.name ? this.props.location.name : 'Irvine, California'}.json?access_token=${TOKEN}`)
      .then(res => res.json())
      .then(fetchCoordinates => this.mapTuurs(fetchCoordinates, packages));
  }

  filterTuurs(fetchCoordinates, packages, tuurCoordinates) {
    let filterTuurs = [];
    let tooFar = [];
    for (let i = 0; i < tuurCoordinates.length; i++) {
      if (tuurCoordinates[i].coord[0] < this.props.location.coordinates[0] - 1 || tuurCoordinates[i].coord[0] > this.props.location.coordinates[0] + 1 || tuurCoordinates[i].coord[1] < this.props.location.coordinates[1] - 0.2 || tuurCoordinates[i].coord[1] > this.props.location.coordinates[1] + 0.2) {
        tooFar = [...tooFar, tuurCoordinates[i]];
      } else {
        filterTuurs = [...filterTuurs, tuurCoordinates[i]];
      }
    }

    this.props.tags.length === 0 && this.props.dates.start !== null ? this.filterDates(filterTuurs) : this.filterTags(filterTuurs);
  }

  //   filterTags () {
  //     let tagArray = [];
  //     for (let i = 0; i < this.state.filteredTuurs.length; i++){
  //       for (let j = 0; j < this.props.tags.length; j++){
  //         for (let k = 0; k < JSON.parse(this.state.filteredTuurs[i].tuur.tags).length; k++){
  //           if (JSON.parse(this.state.filteredTuurs[i].tuur.tags)[k] === this.props.tags[j]){
  //             tagArray = [...tagArray, this.state.filteredTuurs[i]]

  filterTags(filterTuurs) {
    if (this.state.tags.length === 0) {
      this.setState({
        filteredTuurs: filterTuurs,
        isLoading: false
      });
      return;
    }
    let tagArray = [];
    for (let i = 0; i < filterTuurs.length; i++) {
      for (let j = 0; j < this.state.tags.length; j++) {
        for (let k = 0; k < JSON.parse(filterTuurs[i].tuur.tags).length; k++) {
          if (JSON.parse(filterTuurs[i].tuur.tags)[k] === (this.state.tags[j])) {
            tagArray = [...tagArray, filterTuurs[i]];
          }
        }
      }
    }

    for (let h = 0; h < tagArray.length; h++) {
      for (let g = h + 1; g < tagArray.length; g++) {
        if (tagArray[h] === tagArray[g]) {
          tagArray.splice(g, 1);
        }
      }

      if (tagArray.length === 0 && this.props.dates.start !== null) {
        this.setState({
          filteredTuurs: filterTuurs,
          isLoading: false
        });
        return;
      } else if (tagArray.length === 0 && this.props.dates.start === null) {
        this.setState({
          filteredTuurs: [],
          isLoading: false
        });
        return;
      }
      this.props.dates.start !== null ? this.filterDates(tagArray) : this.setState({
        filteredTuurs: tagArray,
        isLoading: false
      });
    }
  }

  filterDates(tagArray) {
    const endDate = new Date(this.props.dates.end);
    const begDate = new Date(this.props.dates.start);
    let begDateYear = begDate.getFullYear();
    let begDateMonth = begDate.getMonth();
    let begDateDay = begDate.getDate();
    const endDateYear = endDate.getFullYear();
    const endDateMonth = endDate.getMonth();
    const endDateDay = endDate.getDate();
    let dateArray = [];
    let availablePackage = [];
    let availableTuur = [];
    dateArray.push(new Date(begDateYear, begDateMonth, begDateDay));
    while (begDateMonth !== endDateMonth || begDateDay !== endDateDay) {
      if (begDateDay === 1) {
        begDateMonth = begDateMonth === 11 ? 0 : ++begDateMonth;
      }
      if (begDateMonth === 0 && begDateDay === 1) {
        begDateYear = begDateMonth === 1 ? ++begDateYear : begDateYear;
      }
      availableTuur = this.checkAvailability(tagArray, begDateYear, begDateMonth, begDateDay);
      begDateDay = this.nextDay(begDateMonth, begDateDay);
      if (availableTuur) {
        availablePackage.push(availableTuur);
      }
    }

    if (begDateMonth === endDateMonth && begDateDay === endDateDay) {
      availableTuur = this.checkAvailability(tagArray, begDateYear, begDateMonth, begDateDay);
      if (availableTuur) {
        availablePackage.push(availableTuur);
      }
    }

    this.setState({
      filteredTuurs: availablePackage,
      isLoading: false
    });
  }

  checkAvailability(tagArray, year, month, day) {
    for (let i = 0; i < tagArray.length; i++) {
      let parseDate = JSON.parse(tagArray[i].tuur.dates);

      for (var value of parseDate) {
        const packageDate = new Date(value);
        const packageYear = packageDate.getFullYear();
        const packageMonth = packageDate.getMonth();
        const packageDay = packageDate.getDate();
        if (packageYear === year && packageMonth === month && packageDay === day) {
          return tagArray[i];
        }
      }
    }

  }

  nextDay(month, day) {
    // last day of month = 31
    if (month === 0 && day != 31) return ++day;
    // last day of month = 28
    if (month === 1 && day !== 28) return ++day;
    // last day of month = 31
    if (month === 2 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 3 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 4 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 5 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 6 && day !== 31) return ++day;
    // last day of month = 31
    if (month === 7 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 8 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 9 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 10 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 11 && day !== 31) return ++day;
    return 1;
  }

  render() {
    console.log( this.state );
    console.log( 'props', this.props );
    const { classes } = this.props;
    if (this.state.isLoading === true) {
      return (
        <div style={{ height: '100px', width: '100px', margin: 'auto' }}>
          <img src='https://ui-ex.com/images/transparent-gif-loading-1.gif' style={{ width: '100%' }} />
        </div>
      );
    } else {
      return (
        <>
            <Container className={classes.marginBottom} >
              <Typography className={classes.marginTop} variant="h5">
                Tuurs
              </Typography>
            </Container>
            <Container style={{ paddingBottom: '80px' }}>
              { this.state.filteredTuurs.length === 0 ? <Typography variant="subtitle1">There are no tuurs that match the search criteria</Typography> : this.renderPackage() }
            </Container>
        </>
      );
    }
  }
}

export default withStyles(styles)(SearchPackages);
