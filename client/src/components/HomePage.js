import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class HomePage extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  render() {
    return (
      <Card className="container">
        <CardTitle title="React Application" subtitle="This is the home page." />
      </Card>
    );
  }
}

HomePage.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default HomePage;
