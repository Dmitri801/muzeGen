import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ButtonBase from "@material-ui/core/ButtonBase";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import { UNSPLASH_ACCESS_KEY, UNSPLASH_APP_NAME } from "../keys/keys";
import InfiniteScroll from "react-infinite-scroller";
class UnsplashDialog extends Component {
  render() {
    const {
      open,
      handleClose,
      query,
      images,
      api,
      queryChange,
      setUnsplashResults,
      selectUnsplashImage,
      addImagePathUnsplash,
      canvasState
    } = this.props;

    const { selectedImg, backgroundMode } = canvasState.image.unsplash;

    const onImageSelect = id => {
      selectUnsplashImage(id);
    };

    const onFormSubmit = e => {
      e.preventDefault();

      api.search
        .photos(query, 1)
        .then(res => res.json())
        .then(data => {
          console.log(data.results);
          setUnsplashResults(data.results, false);
        });
    };

    const loadMoreImages = page => {
      api.search
        .photos(query, page)
        .then(res => res.json())
        .then(data => {
          setUnsplashResults(data.results, true);
        });
    };

    const addImageToCanvas = () => {
      api.photos
        .getPhoto(selectedImg, 900, 900)
        .then(res => res.json())
        .then(img => {
          addImagePathUnsplash(
            `${img.urls.regular}?client_id=${UNSPLASH_ACCESS_KEY}`,
            backgroundMode
          );
          api.photos.downloadPhoto(img);
          handleClose();
        });
    };
    return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar classes={{ root: "unsplashNav" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
              classes={{ root: "closeIconUnsplash" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography classes={{ root: "navTitle" }} variant="h4">
              Photos By{" "}
              <a
                href={`https://www.unsplash.com?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </Typography>
          </Toolbar>
        </AppBar>
        <header className="unsplashSearchHeader">
          <Card elevation={10} classes={{ root: "unsplashSearchCard" }}>
            <form onSubmit={onFormSubmit}>
              <TextField
                fullWidth
                name="unsplashSearch"
                label="Search 1000's of images"
                margin="normal"
                classes={{ root: "unsplashSearch" }}
                variant="outlined"
                value={query}
                onChange={e => queryChange(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Search
              </Button>
            </form>
          </Card>
        </header>
        <Divider variant="middle" />

        <GridList classes={{ root: "unsplashGrid" }} cellHeight={150}>
          <InfiniteScroll
            pageStart={1}
            loadMore={loadMoreImages}
            hasMore={true}
            loader={<div className="loader">Loading ...</div>}
            useWindow={false}
            className="infiniteScroll"
          >
            {images.length > 0 &&
              images.map(image => (
                <ButtonBase
                  key={image.id}
                  classes={{ root: "unsplashGridButton" }}
                  onClick={() => onImageSelect(image.id)}
                  disableRipple
                >
                  <GridListTile
                    style={
                      image.id === selectedImg ? { borderColor: "purple" } : {}
                    }
                    classes={{ root: "unsplashGridTile" }}
                  >
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={image.urls.regular}
                      alt="unsplashimage"
                    />
                    <GridListTileBar
                      title={image.user.name}
                      subtitle={
                        <span>
                          @
                          {image.user.twitter_username
                            ? image.user.twitter_username
                            : "unsplash"}{" "}
                        </span>
                      }
                      actionIcon={
                        <a
                          href={`${
                            image.user.links.html
                          }?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <InfoIcon classes={{ root: "unsplashUserIcon" }} />
                        </a>
                      }
                    />
                  </GridListTile>
                </ButtonBase>
              ))}
          </InfiniteScroll>
        </GridList>

        <Fab
          classes={{ root: "unsplashAddBtn" }}
          color="primary"
          aria-label="Add"
          disabled={!selectedImg}
          onClick={addImageToCanvas}
        >
          <AddIcon />
        </Fab>
      </Dialog>
    );
  }
}

export default UnsplashDialog;
