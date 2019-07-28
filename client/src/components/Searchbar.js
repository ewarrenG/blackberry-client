import React from 'react';

class Searchbar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.inputValue
        };
        this.performSearch = this.performSearch.bind(this);
    }

    updateInput(e) {
        this.setState({
            inputValue: e.target.value
        },
            () => {
                console.log('updateInput callback')
                this.performSearch(this.state.inputValue)
                // console.log('callback after setting state');
                // console.log('this.state.chartData', this.state.chartData);
            });
    }

    performSearch(searchTerm) {
        console.log('performSearch');
        console.log('searchTerm', searchTerm);
        // return this.state.inputValue
        //     ? searchItem.toLowerCase().indexOf(this.state.inputValue.toLowerCase())
        //     : null;
        this.props.results.map(item => {
            // if (item.companyName.toLowerCase().indexOf(searchItem.toLowerCase()) > -1) {
            //     console.log('item', item)
            // }

            if (item.companyName.toLowerCase() === searchTerm.toLowerCase()) {
                this.props.handleMatchingSearch(searchTerm, item);
            }
        })
    }

    componentDidMount() {
        this.searchInput.focus();
    }

    render() {
        return (
            <div className="row pt-5">
                <div className="col-sm-4" />
                <div className="col-sm-4">
                    <div className="form-group" key="dropdown">
                        <label>Search by company name or industry</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.inputValue}
                            onChange={e => this.updateInput(e)}
                            ref={input => {
                                this.searchInput = input;
                            }}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default Searchbar;
