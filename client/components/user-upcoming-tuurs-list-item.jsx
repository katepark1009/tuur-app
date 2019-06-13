import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
  tile: {
    width: 300,
    height: '100%'
  },
  font: {
    fontFamily: 'Roboto',
    fontSize: '1.3rem',
    marginRight: theme.spacing(1)
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
});

class UpComingTuurItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
          <GridListTile className={classes.font} key={this.props.package.mainImage}
          onClick = {() => {
            this.props.path('/guide-package-details/ '+this.props.package.id);
            this.props.setTuurPackage(this.props.package);
          }}
          >
            <img className={classes.tile} src={this.props.package.mainImage} alt={this.props.package.title} />
            <GridListTileBar
              title={this.props.package.title}
              subtitle={<span>{this.props.package.description}</span>}
              classes={{
                root: classes.titleBar
              }}
            />
          </GridListTile>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(UpComingTuurItem));
