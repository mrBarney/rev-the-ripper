import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Sound from 'react-sound';

let sound;

class Finish extends React.Component {
    constructor(props) {
        super(props);

        this.data = this.props.data;
        this.url = this.props.url;
        this.to_html = this.to_html.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        timeStamp: 0,
    };

    componentDidUpdate(prevState){
        if(prevState.timeStamp !== this.state.timeStamp){
            console.log("timestamp is: " + this.state.timeStamp);
            sound = <Sound
                url={this.props.url}
                playStatus={Sound.status.PLAYING}
                playFromPosition={this.state.timeStamp /* in milliseconds */}
            />;
        }
    }

    handleClick() {
        let urlParams = new URLSearchParams(window.location.search);
        let time = urlParams.get('t');
        console.log('time: ' + time);
        this.setState({
            timeStamp: time
        });
    };

    to_html(elems, starter_word_idxs, utube_url) {
        // Replace starter word index-1 value with youtube link to word ts
        for(let i = 0; i < starter_word_idxs.length; i++){
            elems[starter_word_idxs[i]-1].value = '<a href=#?t=' + Math.floor(elems[starter_word_idxs[i]].ts)*1000 + ' onClick="handleClick()">.['+starter_word_idxs[i].ts+']</a><br/><br/>';
        }
        return elems;
        // Replace each word after a newline with a youtube link
        //text.replace(/\.\n/g, "<a href=utube_url+'&t=x'>.</a>\n")
    }

    render() {
        const {timeStamp} = this.state;
        const data = this.props.data;
        const url = this.props.url;

        const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]));
        const contains = (l, x) => !!l.filter(e => e === x).length;

        function starter_words_index(elems) {
            let starter_words = [];
            for (let i = 0; i < elems.length - 1; i++)
                if (elems[i].value === '. ')
                    starter_words.push(i + 1);

            return starter_words
        }

        function word_diffs_by_index(idxs, elems) {
            return idxs.map(i => elems[i + 2].ts - elems[i].end_ts)
        }

        function enumerate(l) {
            let x = [];
            for (let i = 0; i < l.length; i++)
                x.push([l[i], i]);
            return x;
        }


        let elems = data.reduce((acc, x) => acc.concat(x.elements), []);
        const s = starter_words_index(elems);
        const diffs = word_diffs_by_index(s, elems);
        elems = this.to_html(elems, s, url);

        const topd = zip([diffs, s]).sort((a, b) => b[0] - a[0]).slice(0, 6);
        const top_idxs = topd.map(x => x[1]);

        const text = enumerate(elems).reduce(
            (acc, e) => {
                if (contains(top_idxs, e[1])) acc += '\n\n';
                return acc + e[0].value
            }, '');

        sound = <Sound
            url={url}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
        />;

        return (
            <React.Fragment>
                <Grid container spacing={24} alignItems="center">
                    {sound}
                </Grid>
                <Typography
                    variant="h6"
                    gutterBottom
                    dangerouslySetInnerHTML={{__html: text}}
                >
                </Typography>
            </React.Fragment>
        );
    }
}

export default Finish;