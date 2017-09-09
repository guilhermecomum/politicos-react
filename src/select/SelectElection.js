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

import React, { Component } from 'react'
import { connect } from 'react-redux'

import HTTPClient from '../HTTPClient'
import Multiselect, { getOptionsCallback } from '../components//Multiselect'
import { changeElectionList, changeElectionSelected } from './electionDuck'

class SelectElection extends Component {
  componentDidMount() {
    HTTPClient.get('/elections/').then(result => {
      this.props.dispatch(changeElectionList(result.data))
    })
  }

  getOptions(input, callback) {
    const election = this.props.list.objects.map(item => {
      return { label: item.year, value: item.year }
    })
    return getOptionsCallback(input, callback, election)
  }

  render() {
    if (!this.props.list) {
      return null
    }

    return (
      <Multiselect
        label="Eleições"
        placeholder="Escolha uma ou várias eleições..."
        loadOptions={this.getOptions.bind(this)}
        onChange={selected =>
          this.props.dispatch(changeElectionSelected(selected))}
        value={this.props.selected}
      />
    )
  }
}

/* istanbul ignore next */
const mapStateToProps = ({ election }) => {
  return {
    list: election.list,
    selected: election.selected,
  }
}

export default connect(mapStateToProps)(SelectElection)