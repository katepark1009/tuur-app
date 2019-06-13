import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginBottom: '20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  datail: {
    paddingLeft: '54%'
  }
});

class ItineraryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  }

  bookedDate() {
    let dateDisplay = '';
    for (let index = 0; index < this.props.item.dates.length; index++) {
      const firstDate = new Date(this.props.item.dates[index]);
      const yyyy = firstDate.getFullYear();
      const mm = firstDate.getMonth() + 1;
      const dd = firstDate.getDate();
      const day = String(firstDate).slice(0, 3);
      if (!index) {
        dateDisplay += `${day}, ${mm}-${dd}-${yyyy}`;
      } else {
        dateDisplay += `, ${day}, ${mm}-${dd}-${yyyy}`;
      }
    }
    return dateDisplay;
  }

  render() {
    const { classes } = this.props;
    const { title, timeRange, tags, profileEmail, mainImage, location, images, description, dates } = this.props.item;
    return (
      <>
        <Card className={classes.card}>
          <CardHeader
            title={title}
          // subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image={mainImage}
            title={title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
          <CardActions className={classes.detail} style={{ paddingLeft: '54%' }}>
            <ThemeProvider theme={theme}>
              <Typography className={classes.detail} variant="button" color="primary" align="right">
                More detail
              </Typography>
            </ThemeProvider>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick }
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" paragraph>Booked Dates: {this.bookedDate()}</Typography>
              <Typography paragraph>
                {description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(ItineraryItem);
