import React from 'react';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getNewsArticles } from '../../services/fashion-united.graphql.services';
import './style.css';

const DEFAULT_IMAGE =
    'https://fashionunited.info/global-assets/img/default/fu-default_1200x630_black-favicon.jpg';

const styles = theme => ({
    media: {
        height: 180,
    },
    root: {
        padding: 16
    },
    card: {
        height: '100%',
        minHeight: 360,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column'
    },
    buttons: {
        marginTop: 32,
        marginBottom: 32
    }
});

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newsArticles: []
        };
    }

    async componentWillMount() {
        const variables = {
            keywords: ['hunkemoller']
        };

        const result = await getNewsArticles(variables);

        this.setState({
            newsArticles: result.fashionunitedNlNewsArticles,
        });
    }

    openLink(url) {
        window.open(url,'_blank')
    }

    handleClickOpen = item => {
        this.props.history.push({
            pathname: `/detail/${this.slugify(item.title)}-${item.id}`,
            state: {
                open: true,
                selectedItem: item
            }
        });
    };

    slugify(text){
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    newsArticles() {
        const { classes } = this.props;
        return this.state.newsArticles.map((newsArticle, index) =>
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardActionArea onClick={this.handleClickOpen.bind(this, newsArticle)}>
                        <CardMedia
                            className={classes.media}
                            image={newsArticle.imageUrl || DEFAULT_IMAGE}
                            title={newsArticle.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {newsArticle.title}
                            </Typography>
                            <Typography component="p">
                                {newsArticle.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => this.openLink(newsArticle.url)}>
                            Read More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <Typography variant="display3" gutterBottom>
                    Fashion News
                </Typography>
                <Grid container justify="center" spacing={16} wrap="wrap">
                    {this.newsArticles()}
                </Grid>
                <Grid container justify="center" className={classes.buttons}>
                    <Button variant="contained" color="primary">
                        Load More
                    </Button>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Home);