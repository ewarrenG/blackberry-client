import React from 'react';

class Dropdown extends React.Component {
  render() {
    // console.log('this.props.options', this.props.options)
    // console.log('this.props', this.props);
    let propToAccess = this.props.for;
    // console.log('propToAccess', propToAccess);
    return (
      <div className="col-sm-4">
        <div className="form-group" key="dropdown">
          <label htmlFor="modalForm">{this.props.title}</label>
          <div>
            <select
              className="form-control"
              onChange={e => {
                this.props.handleDropdownChange(e); //not changed by state
              }}
              type="select-one"
              value={this.props.value}
              data-key={propToAccess}
            >
              {this.props.options.map((option, index) =>
                option[propToAccess].length ? (
                  <option
                    key={option[propToAccess].replace(' ', '_') + index}
                    value={option[propToAccess]}
                  >
                    {option[propToAccess]}
                  </option>
                ) : (
                  ''
                )
              )}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
