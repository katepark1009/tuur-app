import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LocationOn from '@material-ui/icons/LocationOn';
import Alarm from '@material-ui/icons/Alarm';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import CarouselImage from './results/package-detail-carousel-item';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }

});

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  card: {
    maxWidth: 400,
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundSize: '100% 100%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  fontSize: {
    fontSize: '2.5rem'
  },
  paddingRight: {
    paddingRight: 20
  },
  modalStyle: {
    top: 5,
    left: 5
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 7,
    outline: 'none'
  },
  previewContainer: {
    width: '160px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    margin: ' auto auto 10px auto'
  },
  productPreview: {
    width: '50px',
    height: '50px',
    margin: '5px',
    opacity: 0.5,
    '&:hover': {
      opacity: 1
    }
  },
  cover: {
    width: '100%',
    height: '100%'
  }
});

class PackageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      status: null,
      images: [],
      cardImg: this.props.tuur.mainImage,
      package: [],
      isLoading: true
    };
    this.changeImage = this.changeImage.bind(this);
  }

  changeImage(e) {
    let id = e.target.id;
    id = parseInt(id);
    let imgArray = this.state.images;
    let newMainImg = imgArray[id];
    this.setState({ cardImg: newMainImg });
  }

  componentDidMount() {
    fetch(`/api/profile.php?email=${this.props.tuur.profileEmail}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ package: response });
      });

    const id = this.props.match.params.id;
    fetch('/api/package.php?id=' + id)
      .then(res => res.json())
      .then(item => this.setState({ item: item[0] }, () => this.getImages()));
  }

  getImages() {
    let images = JSON.parse(this.state.item.images);
    this.setState({ images, isLoading: false });
  }

  render() {
    let carousel = [];
    const { classes } = this.props;
    if (this.state.images) {
      carousel = this.state.images.map((image, id) => {
        return <CarouselImage key={ id } id={ id } click={ this.changeImage } images={image} />;
      });
    }
    if (!this.state.item) return null;
    return (
      <>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={ this.state.cardImg }
          />
        </Card>
          <Grid container justify="center" direction="row">
            { this.state.images ? carousel : null}
          </Grid>
        <Card>
          <CardHeader
            title={ this.props.tuur.title }
          />
          <CardContent>
            <Typography >
              <LocationOn /> { this.props.tuur.location }
            </Typography>
          </CardContent>
          <CardContent>
            <Typography >
              <Alarm/> Trip duration: { this.props.tuur.timeRange }
            </Typography>
          </CardContent>
          <CardContent>
            <Typography paragraph>Trip Summary:</Typography>
            <Typography paragraph>
              { this.props.tuur.description }
            </Typography>
          </CardContent>
          <CardContent>

            <Grid component={Link} style={{ textDecoration: 'none' }} to={'/user-view-profile/' + this.props.tuur.profileEmail}>
              <Card className={classes.card}>
                <Grid container>
                  <Grid item xs={5}>
                    <CardMedia
                      className={classes.cover}
                      image={ this.state.package ? this.state.package.image : null}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <CardContent>
                      <Typography variant="body1">
                    Meet your Guide
                      </Typography>
                      <Typography variant="h5">
                        {this.state.package ? this.state.package.name : null }
                      </Typography>
                    </CardContent>

                    <CardContent>
                      <Typography variant="subtitle1" color="textSecondary">
                        {this.state.package ? this.state.package.bio : null}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  }

}

export default withStyles(styles)(PackageDetails);
