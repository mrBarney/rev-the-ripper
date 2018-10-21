import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class ChooseVideo extends React.Component {
    constructor(props){
        super(props);

        if (props.onVideoChange){
            props.onVideoChange(this.handleVidChange.bind(this));
        }
    }

    state = {
        url: ''
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.url !== prevState.url) {
            this.props.onVideoChange(this.state.url);
        }
    }

    handleVidChange = () => {

    };

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Choose video
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <TextField
                            ref={(input) => this.input = input}
                            required
                            id="videoUrl"
                            name="videoUrl"
                            label="Video URL"
                            value={this.state.url}
                            onChange={e => this.setState({ url: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default ChooseVideo;