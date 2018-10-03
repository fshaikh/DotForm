import React from 'react';

import FormsLoading from './FormsLoading';

export default class MyForms extends React.Component {
    constructor(props) {
        super(props);

        // Component state
        // isLoading is true which indicates the component is in the process of
        // loading the state i.e forms for the user
        this.state = {
            isLoading: true,
            isError: false,
            forms:{}
        }
    }

    async componentDidMount() {
        // fetch forms for the current user
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 2000);
    }

    render() {
        if(this.state.isLoading) {
            return <FormsLoading />
        }
        if(this.state.isError) {
            return 'Something went wrong'
        }
        return (
            <div>
                My Forms View
            </div>
        );
    }
}
