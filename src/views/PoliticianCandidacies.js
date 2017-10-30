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

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import CandidacyYear from './CandidacyYear'

const PoliticianCandidacies = props => {
  const candidacies = _.groupBy(props.data, x => {
    return new Date(x.election_round.date).getFullYear()
  })
  const candidacyYears = Object.keys(candidacies).map(year => {
    return <CandidacyYear key={year} year={year} candidacies={candidacies} />
  })

  return (
    <div className="panel panel-info candidacies">
      <div className="panel-heading">
        <h3 className="panel-title">Candidaturas</h3>
      </div>
      <div className="panel-body">{candidacyYears}</div>
    </div>
  )
}

PoliticianCandidacies.propTypes = {
  candidacy: PropTypes.object,
  candidacies: PropTypes.object,
  year: PropTypes.number,
  data: PropTypes.array,
}

export default PoliticianCandidacies
