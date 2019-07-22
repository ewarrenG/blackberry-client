import React from 'react';

class Dropdown extends React.Component {
  render() {
    return (
      <div className="form-group" key="dropdown">
        <label htmlFor="modalForm">Choose a company</label>
        <div>
          <select
            className="form-control"
            onChange={e => {
              this.props.handleDropdownChange(e); //not changed by state
            }}
            type="select-one"
            value={this.props.dropdownValue}
            data-key="dropdown"
          >
            {this.props.results.map(option => (
              <option key={option.companyName} value={option.companyName}>
                {option.companyName}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Dropdown;
