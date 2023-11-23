import React from "react";
import { SingleContentProps } from "../../Model/model";
import { img_300, unavailable } from "../Config/Config";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import ContentModal from "../ContentModal/ContentModal";
const SingleContent = (props: SingleContentProps) => {
  const { poster_path, title, media_type, release_date, vote_average, id } =
    props.content;
  const img = `${img_300}/${poster_path}`;
  return (
    <>
      <ContentModal media_type={media_type} id={id}>
        <div className="media">
          <Badge
            badgeContent={vote_average}
            color={vote_average > 6 ? "primary" : "secondary"}
          ></Badge>
          <img
            className="poster"
            src={poster_path ? img : unavailable}
            alt={title}
          />
          <b className="title">{title}</b>
          <span className="subTitle">
            {media_type == "tv" ? "TV Series" : "Movie"}
            <span className="subTitle">{release_date}</span>
          </span>
        </div>
      </ContentModal>
    </>
  );
};

export default SingleContent;
