import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Content, ContentDetails, ContentModalProps } from "../../Model/model";
import axios from "axios";
import { useEffect, useState } from "react";
import { img_500, unavailable, unavailableLandscape } from "../Config/Config";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "../Carousel/Carousel";

import "./ContentModal.css";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  bgcolor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: "10px",
  color: "white",
  boxShadow: 24,
  p: 4,
};

const ContentModal = (props: ContentModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState<ContentDetails>();
  const [video, setVideo] = useState({});

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${props.media_type}/${props.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  const contentTitle = content?.title || content?.name;
  return (
    <div>
      <Button className="media" onClick={handleOpen}>
        {props.children}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content ? (
            <Box sx={style}>
              <div className="ContentModal">
                <img
                  className="ContentModal_portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={contentTitle}
                />
                <img
                  className="ContentModal_landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={contentTitle}
                />
                <div className="ContentModal_about">
                  <span className="ContentModal_title">
                    {contentTitle} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal_description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousel id={props.id} media_type={props.media_type} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
              {/*  <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            </Box>
          ) : (
            <></>
          )}
        </Fade>
      </Modal>
    </div>
  );
};

export default ContentModal;
