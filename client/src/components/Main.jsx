import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
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
        const { user, token } = this.props;
        let routes;

        if(token) {
            routes = (
                <Switch>
                    <Route exact path={siteRoutes.HOME} component={Home}/>
                    <Route exact path={siteRoutes.PLAYER} component={Player}/>
                    <Route exact path={siteRoutes.TEAM} component={Team}/>
                    <Route exact path={siteRoutes.TEAMS} component={Teams}/>
                    <Route exact path={siteRoutes.SCHEDULE} component={Schedule}/>
                    <Route exact path={siteRoutes.LOGIN} render={() => token ? <Redirect to="/"/> : <Login />}/>
                    <Route exact path={siteRoutes.GAME} component={Game}/>
                    <Route exact path={siteRoutes.FAVORITES} component={FavoritePlayers}/>
                    <Route exact path={siteRoutes.USERS} component={Users}/>
                    <Route exact path={siteRoutes.RECORDS} component={Records}/>
                    <Route exact path={siteRoutes.EDIT_USER} component={UserForm}/>
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route exact path={siteRoutes.TEAMS} component={Teams}/>
                    <Route exact path={siteRoutes.SCHEDULE} component={Schedule}/>
                    <Route exact path={siteRoutes.LOGIN} render={() => token ? <Redirect to="/"/> : <Login />}/>
                    <Route exact path={siteRoutes.REGISTER} component={Register}/>
                </Switch>
            )
        }

        return(
            <Fragment>
                <Menu user={user}/>
                { routes }
            </Fragment>
        );
    }
}

const mapStateToProps = ({ user, auth: { token } }) => ({
    user,
    token
});
  
export default withRouter(connect(mapStateToProps)(Main));
