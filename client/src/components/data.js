import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Translate from 'react-translate-component';
import Tags from './tags';
import CityData from './city-data';

class Data extends Component {
  datasets() {
    return {
      cities: 'wmeilvvkgqrderovlbhfbktsnxlm',
      systems: 'ppqitfneiwktbsolkrhiozygqzdy',
      lines: 'pzyttqskrypbmrycmyzgfiyiazzj',
      features: 'jpimoyzuunvntdmjgheiscrzahls',
      section_lines: 'egetzfbhwqhqjbpedplrgppjlerc',
      stations: 'akipfiszptbqbwwwgtsqxufmjeur',
      station_lines: 'cgeglqprycantszontmkipqpfhml',
      transport_modes: 'laduqgisvogcjargoqgcvgdjibxl'
    }
  }

  datasetUrl(dataset, format) {
    return `https://data.heroku.com/dataclips/${dataset}.${format}`;
  }

  formats() {
    return ['json', 'csv']
  }

  sendGAEvent(e) {
    const name = e.target.attributes.name.value;

    ga('send', 'event', 'data', 'download', name);
  }

  render() {
    return (
        <div className="o-container o-container--medium u-pillar-box--medium">
          <Tags title="data.title" />
          <div className="u-letter-box--large letter-with-footer">
            <Translate component="h1" className="c-heading" content="data.title" />

            <p><Translate content="data.license" unsafe />. <Translate content="data.see_terms_1" /> <Translate component={Link} className="c-link" to="/terms" content="data.see_terms_2" />.</p>

            <Translate component="h2" className="c-heading" content="data.all_data" />
            { Object.entries(this.datasets()).map(([label, dsName]) =>
              <p key={label}>
                <Translate content={`data.${label}`} />:
                  { this.formats().map(format =>
                      <a key={`${label}-${format}`}
                         name={`${label}-${format}`}
                         className="data-link c-link"
                         href={this.datasetUrl(dsName, format)}
                         onClick={this.sendGAEvent}>
                        {format}</a>
                  )}
              </p>
            )}
            <Translate component="h2" className="c-heading" content="data.data_by_city" />
            <CityData />
          </div>
        </div>
        )
  }
}

export default Data
