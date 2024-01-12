import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Checkbox,
  Button,
} from "@mui/material";
import { RepoItems } from "../../models/GitHubModels";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import { DragonModelLoader } from "../Ui/DragonModelLoader";

interface GitHubReposProps {
  GitHubRepos: RepoItems;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const getLikedReposFromStorage = () => {
  const storedLikedRepos = localStorage.getItem("likedRepos");
  return storedLikedRepos ? JSON.parse(storedLikedRepos) : [];
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const GitHubRepos = ({ GitHubRepos }: GitHubReposProps) => {
  const [open, setOpen] = useState(false);
  const [likedRepos, setLikedRepos] = useState<number[]>(
    getLikedReposFromStorage
  );
  const {
    id,
    full_name,
    name,
    owner,
    description,
    html_url,
    language,
    watchers_count,
    created_at,
  } = GitHubRepos;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleCheckboxChange = (repoId: number) => {
    const storedLikedRepos = localStorage.getItem("likedRepos");
    const parseData = storedLikedRepos ? JSON.parse(storedLikedRepos) : []
    const updatedLikedRepos = parseData.includes(repoId)
      ? parseData.filter((id: any) => id !== repoId)
      : [...parseData, repoId];
    setLikedRepos(updatedLikedRepos);
    localStorage.setItem("likedRepos", JSON.stringify(updatedLikedRepos));
  };

  return (
    <div>
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          {full_name}
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            checked={likedRepos.includes(id)}
            onChange={() => handleCheckboxChange(id)}
          />
        </div>
        <div className="card-body">
          <div className="d-flex">
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt={name}
              src={owner.avatar_url}
            />
            <div className="p-1">
              <h5 className="card-title">{name}</h5>
              <a href={html_url} className="card-link">
                Repository Link
              </a>
              <p className="card-text line-clamp-3">{description}</p>
              <div className="btn btn-sm btn-primary" onClick={handleOpen}>
                Read More...
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography id="modal-modal-title" variant="body1" component="h2">
              Full Name: {full_name}
            </Typography>
            <hr />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description: {description}
            </Typography>
            <hr />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Language: {language}
            </Typography>
            <hr />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Watchers Count: {watchers_count}
            </Typography>
            <hr />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Created At: {created_at}
            </Typography>
            <hr />
          </Box>
          <Button variant="outlined" color="warning" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default GitHubRepos;
