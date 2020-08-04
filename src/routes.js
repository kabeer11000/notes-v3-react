import React from 'react';
import {Route} from 'react-router';
//Import app
import ResponsiveDrawer from './App';
//Import pages
import SettingsComponent from './components/Settings/Settings';
//import SkillsPage from './components/skills/SkillsPage';
//import PortfolioPage from './components/portfolio/PortfolioPage';

//Define routes
function createRoutes() {
    return (
        <Route path="/" component={ResponsiveDrawer}>
            <Route path="/settings" component={SettingsComponent}/>
        </Route>)
}

export default createRoutes;
/*
        <Route path="skills" component={SkillsPage} />
        <Route path="portfolio" component={PortfolioPage} />

 */
