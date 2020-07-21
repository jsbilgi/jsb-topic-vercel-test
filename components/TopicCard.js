import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { User, Calendar, Link } from "react-feather";
import moment from "moment";
import LazyLoad from 'react-lazyload';

import { cardStyles } from "../styles/Styles";

function TopicCard(props) {
    const { classes, data } = props;
    return (
        <Card className={classes.card}>
            <LazyLoad height={200}>
            <CardMedia
                className={classes.media}
                // image={data.preview_picture}
                image={
                    data.preview_picture === null
                        ? `https://screenshot-v2.now.sh/${data.url}`
                        : data.preview_picture
                }
                title={data.title}
            />
            </LazyLoad>
            <CardContent style={{ height: 95 }}>
                <Typography
                    className="card-title"
                    style={{ maxHeight: 40, overflow: "hidden", cursor: "pointer" }}
                    onClick={props.cardHandler}
                >
                    {data.title}
                </Typography>
                <div>
                    <ul className="card-meta">
                        <li>
                            <User size={16} />
                            <span>{data.user_name}</span>
                        </li>
                        <li>
                            <Calendar size={16} />
                            <span>{moment(data.created_at).fromNow()}</span>
                        </li>
                    </ul>
                </div>
            </CardContent>
            <style jsx>
                {`
                    .card-title {
                        height: 40px !important;
                        cursor: pointer;
                    }
                `}
            </style>
            <style jsx  global>
                {`
                    .card-meta {
                        margin: 0;
                        padding: 0;
                        opacity: 0.7;
                    }
                    .card-meta li {
                        display: inline-flex;
                        padding-right: 5px;
                        padding-top: 5px;
                        font-size: 12px;
                    }
                `}
            </style>
        </Card>
    );
}

TopicCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(cardStyles)(TopicCard);
