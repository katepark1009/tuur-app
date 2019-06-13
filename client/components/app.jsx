import React, { Component } from 'react';
import UserProfile from './user-profile';
import { Route, Switch, withRouter } from 'react-router-dom';
import BottomNav from './bottom-nav';
import LogIn from './log-in';
import Itinerary from './itinerary';
import Results from './results';
import Search from './search';
import PackageDetails from './results/package-details';
import GuidePackageDetails from './guide-profile-package-details';
import UserViewProfile from './user-view-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
import CreatePackage from './createPackage';
import AboutUs from './about-us';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      user: null,
      tuurPackage: null,
      location: [],
      tags: [],
      toggleStatus: false,
      dates: {
        start: null,
        end: null
      }
    };
    this.setRoutePath = this.setRoutePath.bind(this);
    this.setTuurPackage = this.setTuurPackage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.logIn = this.logIn.bind(this);
    this.edit = this.edit.bind(this);

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.path !== prevState.path || this.state.tags !== prevState.tags) {
      this.props.history.push(this.state.path);
    }
  }

  setTuurPackage(tuurPackage) {
    this.setState({
      tuurPackage: tuurPackage
    });
  }

  setRoutePath(path) {
    console.log('setting path', this.state);
    this.setState({
      path: path
    });
  }

  logIn(user) {
    this.setState({ user }, () => {
      this.props.history.push(

        { pathname: '/user-profile/' + user.email,
          state: { user }
        });
    }
    );
  }

  edit(user) {
    this.setState({ user }, () => this.props.history.push({
      pathname: '/user-profile/' + user.email,
      state: { user }
    }));
  }

  handleSearch(location, tags, dates) {
    if (!location.name && tags) {
      this.setState({
        tags: tags

      })
      
    }
    else if (!location.name && !tags){
      
    }
    else if (!tags && !dates){
      this.setState({
        location: location
      });
    } else {

      this.setState({
        location: location,
        tags: tags,
        dates: {
          start: dates.start,
          end: dates.end
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login"
            render={props =>
              <div>
                <LogIn {...props} logIn={this.logIn} isAuthed={true}/>
              </div>
            }/>

          <Route exact path="/" render={props =>
            <div>
              <Search search={this.handleSearch} path={this.setRoutePath} />
            </div>
          }/>
          <Route exact path="/itinerary" render={props =>
            <div>
              <Itinerary />
            </div>
          }/>
          <Route exact path="/sign-up" render={props =>
            <div>
              <SignUp logIn={this.logIn}/>
            </div>
          }/>
          <Route exact path="/user-view-profile/:email"
            render={props => <div><UserViewProfile path={this.setRoutePath} {...props} isAuthed={true}/> <BottomNav path={this.setRoutePath} user={this.state.user}/></div>}/>

          <Route exact path="/user-profile/:email"
            render={props => <div><UserProfile path={this.setRoutePath} setTuurPackage={this.setTuurPackage} user={this.state.user} {...props} isAuthed={true}/>
            </div>}
          />

          <Route exact path="/edit-profile/:email"
            render={props => <div><EditProfile user={this.state.user} edit={this.edit} {...props} isAuthed={true}/>
            </div>}
          />

          <Route path="/results" render={props =>
            <div>
              <Results path={this.setRoutePath} dates={this.state.dates} handleDates={this.handleDates} toggleStatus={this.state.toggleStatus} key={this.state.location.name} tags={this.state.tags} location={this.state.location} search={this.handleSearch}/>
            </div>
          }/>
          <Route path="/package-details/:id"
            render={props => <PackageDetails packages={this.state.user}{...props} isAuthed={true}/>}
          />

          <Route path="/guide-package-details/:id"
            render={props => <GuidePackageDetails path={this.setRoutePath} packages={this.state.user}{...props} tuur={this.state.tuurPackage} isAuthed={true}/>}
          />

          <Route path="/create-package"
            render={props => <CreatePackage packages={this.state.user}{...props} isAuthed={true}/>}
          />

          <Route path="/about-us"
            render={props => <AboutUs {...props} />}
          />

        </Switch>
        <BottomNav path={this.setRoutePath} user={this.state.user}/>
      </div>

    );
  }
}

export default withRouter(App);
