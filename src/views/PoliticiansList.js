/*
 * Copyright (c) 2016, Marcelo Jorge Vieira <metal@alucinados.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { changePoliticiansList } from "../select/politiciansDuck";
import Loading from "../components/Loading";
import PoliticianDetail from "./PoliticianDetail";

// FIXME: duplicate
const drawerWidth = 400;

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginRight: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

export class PoliticiansList extends Component {
  componentDidMount() {
    this.props.HTTPClient.get("/politicians/").then(politicians => {
      this.props.dispatch(changePoliticiansList(politicians.data));
    });
  }

  render() {
    const { classes, data } = this.props;

    if (!data) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Loading />
        </main>
      );
    }

    const politicianItems = data.map(politician => {
      return (
        <li
          style={{ paddingBottom: 24, listStyleType: "none" }}
          key={politician.id}
        >
          <PoliticianDetail politician={politician} />
        </li>
      );
    });

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ul style={{ padding: 0, margin: 0 }}>{politicianItems}</ul>
      </main>
    );
  }
}

PoliticiansList.propTypes = {
  classes: PropTypes.object.isRequired
};

/* istanbul ignore next */
const mapStateToProps = ({ politicians }) => {
  return {
    data: politicians.objects
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PoliticiansList));
