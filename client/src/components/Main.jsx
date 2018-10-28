import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import siteRoutes from '../config/siteRoutes';
import {
    Home,
    Teams,
    Team,
    Player,
    Records,
    Users,
    FavoritePlayers,
    Schedule,
    Game,
    Menu,
    Login,
    Register,
    UserForm
} from '.';

class Main extends Component {
    render() {
        return(
            <div>
                <Menu user={this.props.user}/>
                <Route exact path={siteRoutes.HOME} component={Home}/>
                <Route exact path={siteRoutes.PLAYER} component={Player}/>
                <Route exact path={siteRoutes.TEAM} component={Team}/>
                <Route exact path={siteRoutes.TEAMS} component={Teams}/>
                <Route exact path={siteRoutes.SCHEDULE} component={Schedule}/>
                <Route exact path={siteRoutes.GAME} component={Game}/>
                <Route exact path={siteRoutes.FAVORITES} component={FavoritePlayers}/>
                <Route exact path={siteRoutes.LOGIN} component={Login}/>
                <Route exact path={siteRoutes.REGISTER} component={Register}/>
                <Route exact path={siteRoutes.USERS} component={Users}/>
                <Route exact path={siteRoutes.RECORDS} component={Records}/>
                <Route exact path={siteRoutes.EDIT_USER} component={UserForm}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
  
export default withRouter(connect(mapStateToProps)(Main));
